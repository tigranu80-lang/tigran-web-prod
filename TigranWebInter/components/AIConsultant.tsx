import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, BotStatus } from '../types';
import { MessageSquare, Send, Minus } from 'lucide-react';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "System initialized. Choose the red pill?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<BotStatus>(BotStatus.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || status === BotStatus.THINKING) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(BotStatus.THINKING);

    try {
      const responseText = await sendMessageToGemini(input);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setStatus(BotStatus.IDLE);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Error in matrix connection.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
      setStatus(BotStatus.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[400px] bg-alabaster border border-ink-950 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 border-b border-ink-950 flex justify-between items-center bg-alabaster">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-950">Construct V1</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-ink-400 hover:text-ink-950 transition-colors"
            >
              <Minus size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 text-sm font-mono ${
                    msg.role === 'user' 
                      ? 'bg-ink-950 text-alabaster' 
                      : 'text-ink-950 border border-ink-950/10 bg-alabaster'
                  }`}
                >
                  <span className="block text-[10px] opacity-50 mb-1 uppercase">
                    {msg.role === 'user' ? 'YOU' : 'SYS'}
                  </span>
                  {msg.text}
                </div>
              </div>
            ))}
            {status === BotStatus.THINKING && (
              <div className="flex justify-start">
                 <div className="text-ink-400 text-xs font-mono animate-pulse">DECODING...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-ink-950 bg-alabaster flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Query the system..."
              className="flex-1 bg-transparent text-ink-950 placeholder-ink-400 text-sm font-mono focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={status === BotStatus.THINKING || !input.trim()}
              className="text-ink-950 hover:text-ink-800 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-ink-950 text-alabaster flex items-center justify-center hover:bg-ink-800 transition-colors shadow-lg border border-alabaster"
        >
          <MessageSquare size={20} />
        </button>
      )}
    </div>
  );
};

export default AIConsultant;