'use client'
import { useState, useEffect } from 'react'
import { User, Mail, Save, LogOut, Camera, Shield, Bell, Globe } from 'lucide-react'
import Image from 'next/image'
import { supabaseBrowser } from '@/lib/supabase/browserClient'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const supabase = supabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        setEmail(user.email || '')
        setUsername(user.user_metadata?.username || user.email?.split('@')[0] || '')
        setAvatarUrl(user.user_metadata?.avatar_url || '')
      }
    }
    getUser()
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const supabase = supabaseBrowser()
      const { error } = await supabase.auth.updateUser({
        data: {
          username,
          avatar_url: avatarUrl
        }
      })
      if (error) throw error
      alert('Profile updated successfully!')
    } catch (error: any) {
      alert('Error updating profile: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signOut()
    window.location.href = '/' // Redirect to home after logout
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-slate-400">Manage your profile details and account preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                <div className="flex items-center gap-3 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3">
                  <User className="h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <div className="flex items-center gap-3 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="flex-1 bg-transparent text-slate-400 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Avatar URL</label>
                <div className="flex items-center gap-3 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3">
                  <Camera className="h-5 w-5 text-slate-400" />
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none"
                    placeholder="https://example.com/avatar.png"
                  />
                </div>
                {avatarUrl && (
                  <div className="mt-3 relative h-16 w-16">
                    <Image 
                      src={avatarUrl} 
                      alt="Avatar preview" 
                      fill
                      className="rounded-full object-cover border border-slate-600"
                      sizes="64px"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <Save size={16} />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Security</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-[#2563eb]" />
                  <div>
                    <div className="font-medium text-white">Two-Factor Authentication</div>
                    <div className="text-sm text-slate-400">Add an extra layer of security to your account</div>
                  </div>
                </div>
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm">
                  Enable
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-[#2563eb]" />
                  <div>
                    <div className="font-medium text-white">Connected Devices</div>
                    <div className="text-sm text-slate-400">Manage devices that have access to your account</div>
                  </div>
                </div>
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm">
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Summary */}
          <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Account Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Member since</span>
                <span className="text-white">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Plan</span>
                <span className="text-white">Pro</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Prompts created</span>
                <span className="text-white">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total sales</span>
                <span className="text-white">$1,250</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-slate-300">Email notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-slate-300">Sales alerts</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span className="text-slate-300">Marketing emails</span>
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
            <p className="text-sm text-slate-400 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
              Delete Account
            </button>
          </div>

          {/* Logout */}
          <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}