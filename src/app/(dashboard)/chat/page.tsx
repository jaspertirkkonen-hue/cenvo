'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Zap, MessageSquare, Trash2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionButton } from '@/components/MotionButton'
import { MotionCard } from '@/components/MotionCard'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I\'m your AI assistant for Cenvo. How can I help you discover amazing prompts or navigate our platform today?',
      timestamp: new Date(),
      suggestions: ['Find content creation prompts', 'Browse trending prompts', 'Help with pricing']
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || inputText.trim()
    if (!messageText) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
      suggestions: []
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    // Simulate AI response with more dynamic content
    setTimeout(() => {
      const responses = [
        'I found some excellent content creation prompts for you! Here are the top 3 trending options in our marketplace...',
        'Based on your request, I recommend checking out our "Creative Writing" category. It has over 200 high-quality prompts!',
        'Great question! Let me show you some premium prompts that might be perfect for your needs...',
        'I can help you find the best prompts for your specific use case. What type of content are you looking to create?'
      ]
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        suggestions: ['Show me more', 'Filter by category', 'View pricing']
      }
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      sender: 'bot',
      text: 'Chat cleared! How can I assist you with Cenvo today?',
      timestamp: new Date(),
      suggestions: ['Find content creation prompts', 'Browse trending prompts', 'Help with pricing']
    }])
  }

  return (
    <div className="p-6 h-screen flex flex-col bg-cosmic-950 bg-celestial-pattern">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-celestial-500/5 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-celestial-600/5 rounded-full blur-3xl float-animation-delayed" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <motion.div 
          className="mb-6 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-celestial rounded-xl flex items-center justify-center shadow-celestial">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-celestial heading-tight">AI Chat Assistant</h1>
            </div>
            <p className="text-cosmic-300">Get instant help with prompts, pricing, and platform navigation</p>
          </div>
          
          <MotionButton
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-cosmic-400 hover:text-cosmic-200"
          >
            <Trash2 size={16} className="mr-2" />
            Clear Chat
          </MotionButton>
        </motion.div>

        {/* Chat Container */}
        <MotionCard 
          variant="glass" 
          className="flex-1 flex flex-col overflow-hidden"
          delay={0.2}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-10 h-10 bg-gradient-celestial rounded-full flex items-center justify-center flex-shrink-0 shadow-celestial">
                      <Bot size={20} className="text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                    <div className={`p-4 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-gradient-celestial text-white shadow-celestial' 
                        : 'glass-card text-cosmic-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className={`text-xs mt-2 flex items-center gap-2 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-cosmic-400'
                      }`}>
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.sender === 'bot' && (
                          <div className="flex gap-1">
                            <button className="hover:text-cosmic-200 transition-colors">
                              <ThumbsUp size={12} />
                            </button>
                            <button className="hover:text-cosmic-200 transition-colors">
                              <ThumbsDown size={12} />
                            </button>
                            <button className="hover:text-cosmic-200 transition-colors">
                              <Copy size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => handleSend(suggestion)}
                            className="text-xs glass-card text-cosmic-300 hover:text-celestial-400 px-3 py-2 rounded-full transition-all duration-300 hover:border-celestial-500/50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-10 h-10 bg-cosmic-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-cosmic-200" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading State */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 justify-start"
              >
                <div className="w-10 h-10 bg-gradient-celestial rounded-full flex items-center justify-center flex-shrink-0 shadow-celestial">
                  <Bot size={20} className="text-white" />
                </div>
                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-celestial-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-celestial-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-celestial-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-cosmic-700/30 p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about prompts, pricing, or the platform..."
                  className="w-full bg-cosmic-800/50 border border-cosmic-600/50 rounded-xl py-4 px-6 text-cosmic-100 placeholder-cosmic-400 focus:outline-none focus:border-celestial-500 focus-celestial backdrop-blur-sm pr-16"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!inputText.trim() || isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-celestial hover:shadow-celestial-strong disabled:bg-cosmic-600 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </div>
        </MotionCard>
      </div>

    </div>
  )
}