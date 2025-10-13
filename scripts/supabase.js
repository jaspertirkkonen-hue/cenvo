// Cenvo v6.0 – Performance Edition (Supabase core)
const SUPABASE_URL = 'https://mtaktjphgnamasbwlqqe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10YWt0anBoZ25hbWFzYndscXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDEwMTcsImV4cCI6MjA3NTU3NzAxN30.l_5-JIOBbXgvrD9qwrbtjz_KW3nT9347SOSz1jeyIZk';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Performance flags
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const deviceMemory = navigator.deviceMemory || 4; // default assume 4GB if unknown
const lowMemoryDevice = deviceMemory <= 2;

// Simple sessionStorage caching with TTL
const cacheGet = (key) => {
    try {
        const raw = sessionStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed.ts) return null;
        const ttl = parsed.ttl || 120000; // 2 minutes
        if (Date.now() - parsed.ts > ttl) return null;
        return parsed.data;
    } catch (_) { return null; }
};

const cacheSet = (key, data, ttl = 120000) => {
    try {
        sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), ttl, data }));
    } catch (_) {}
};

// Enhanced authentication functions
async function signInWithEmail(email, password) {
    const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) throw error;
    return user;
}

async function signUpWithEmail(email, password) {
    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) throw error;
    return user;
}

async function signInWithOAuth(provider) {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: window.location.origin + '/overview.html',
        },
    });
    if (error) throw error;
}

async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

// User management functions
async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

async function updateUserProfile(updates) {
    const { data, error } = await supabase.auth.updateUser({
        data: updates
    });
    if (error) throw error;
    return data;
}

// Prompt management functions
async function getUserPrompts(limit = 50) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const cacheKey = `px:user_prompts:${user.id}:lim:${limit}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);
    
    if (error) throw error;
    cacheSet(cacheKey, data);
    return data;
}

async function createPrompt(promptData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
        .from('prompts')
        .insert([{
            ...promptData,
            user_id: user.id,
            created_at: new Date().toISOString()
        }])
        .select()
        .single();
    
    if (error) throw error;
    // bust caches for user prompts (common limits)
    try {
        const { data: { user: u } } = await supabase.auth.getUser();
        if (u) {
            [10,20,50,100].forEach(l=>sessionStorage.removeItem(`px:user_prompts:${u.id}:lim:${l}`));
        }
    } catch(_){}
    return data;
}

async function updatePrompt(id, updates) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
        .from('prompts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
    
    if (error) throw error;
    return data;
}

async function deletePrompt(id) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
    
    if (error) throw error;
}

async function getMarketplacePrompts(limit = 20) {
    const cacheKey = `px:market_prompts:lim:${limit}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('status', 'published')
        .order('downloads', { ascending: false })
        .limit(limit);
    
    if (error) throw error;
    cacheSet(cacheKey, data);
    return data;
}

async function getRecommendedPrompts(limit = 10) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    // categories cache
    const catsKey = `px:rec_cats:${user.id}`;
    let categories = cacheGet(catsKey);
    if (!categories) {
        const { data: userPrompts } = await supabase
            .from('prompts')
            .select('category')
            .eq('user_id', user.id);
        categories = [...new Set((userPrompts || []).map(p => p.category).filter(Boolean))];
        cacheSet(catsKey, categories, 600000); // 10 min
    }
    
    const cacheKey = `px:recs:${user.id}:lim:${limit}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;
    
    const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('status', 'published')
        .in('category', categories)
        .order('downloads', { ascending: false })
        .limit(limit);
    
    if (error) throw error;
    cacheSet(cacheKey, data || []);
    return data || [];
}

// Feedback functions
async function submitFeedback(feedbackData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
        .from('feedback')
        .insert([{
            ...feedbackData,
            user_id: user.id,
            created_at: new Date().toISOString()
        }])
        .select()
        .single();
    
    if (error) throw error;
    return data;
}

async function getFeedback(limit = 10) {
    const cacheKey = `px:feedback:lim:${limit}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('status', 'approved')
        .order('rating', { ascending: false })
        .limit(limit);
    
    if (error) throw error;
    cacheSet(cacheKey, data || []);
    return data || [];
}

// Chat functions
async function sendChatMessage(message) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    
    // Call Supabase Edge Function for AI chat
    const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message, user_id: user.id }
    });
    
    if (error) throw error;
    return data;
}

// Analytics functions
async function getUserStats() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const cacheKey = `px:user_stats:${user.id}`;
    const cached = cacheGet(cacheKey);
    if (cached) return cached;

    const { data: prompts } = await supabase
        .from('prompts')
        .select('downloads, price, title, created_at, status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(200);
    
    const totalPrompts = prompts?.length || 0;
    const totalDownloads = prompts?.reduce((sum, p) => sum + (p.downloads || 0), 0) || 0;
    const totalRevenue = prompts?.reduce((sum, p) => sum + ((p.downloads || 0) * (p.price || 0)), 0) || 0;
    
    const stats = {
        totalPrompts,
        totalDownloads,
        totalRevenue,
        latestPrompt: prompts?.[0] || null
    };
    cacheSet(cacheKey, stats, 60000); // 1 min
    return stats;
}

// Session management
async function checkSessionAndRedirect() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session && !['/login.html', '/register.html'].includes(window.location.pathname)) {
        window.location.href = '/login.html';
    } else if (session && ['/login.html', '/register.html'].includes(window.location.pathname)) {
        window.location.href = '/overview.html';
    }
    return !!session;
}

// Enhanced auth helpers for v5.1
window.authHelpers = {
    requireAuth: checkSessionAndRedirect,
    getCurrentUser,
    signOut,
    updateUserProfile
};

// Expose key flags and APIs globally for deferred classic scripts
window.prefersReducedMotion = prefersReducedMotion;
window.lowMemoryDevice = lowMemoryDevice;
window.cacheGet = cacheGet;
window.cacheSet = cacheSet;

// Export functions for use in other scripts
export { 
    supabase, 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithOAuth, 
    signOut, 
    checkSessionAndRedirect,
    getCurrentUser,
    updateUserProfile,
    getUserPrompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
    getMarketplacePrompts,
    getRecommendedPrompts,
    submitFeedback,
    getFeedback,
    sendChatMessage,
    getUserStats,
    prefersReducedMotion
};