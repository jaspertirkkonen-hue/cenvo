'use client'
import { useState } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! How can I assist you with Cenvo today?',
      timestamp: new Date()
    },
    {
      id: 2,
      sender: 'user',
      text: 'Hi there! I need help finding prompts for content creation.',
      timestamp: new Date()
    },
    {
      id: 3,
      sender: 'bot',
      text: 'Certainly! I can help with that. Are you looking for specific types of content, like blog posts, social media, or something else?',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!inputText.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: 'I understand you\'re looking for content creation prompts. Let me help you find the best options available in our marketplace.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-6 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">AI Chat Assistant</h1>
        <p className="text-slate-400">Chat with our AI assistant to get help with prompts, ask questions, and explore the Cenvo platform</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              
              <div className={`max-w-[70%] p-4 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-[#2563eb] text-white' 
                  : 'bg-slate-700 text-slate-100'
              }`}>
                <p className="text-sm">{message.text}</p>
                <div className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-slate-700 text-slate-100 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:border-[#2563eb] pr-12"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#2563eb] hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">
              Find prompts
            </button>
            <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">
              Help with pricing
            </button>
            <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">
              Account support
            </button>
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-5 w-5 text-[#2563eb]" />
            <h3 className="font-semibold text-white">Smart Suggestions</h3>
          </div>
          <p className="text-sm text-slate-400">Get personalized prompt recommendations based on your interests and usage patterns.</p>
        </div>
        
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Bot className="h-5 w-5 text-[#2563eb]" />
            <h3 className="font-semibold text-white">24/7 Support</h3>
          </div>
          <p className="text-sm text-slate-400">Our AI assistant is always available to help you with any questions or issues.</p>
        </div>
        
        <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Send className="h-5 w-5 text-[#2563eb]" />
            <h3 className="font-semibold text-white">Quick Actions</h3>
          </div>
          <p className="text-sm text-slate-400">Perform common tasks like searching prompts or managing your account directly from chat.</p>
        </div>
      </div>
    </div>
  )
}