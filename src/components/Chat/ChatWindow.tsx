import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newUserMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputValue('');

      // Simulate a bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: `Thanks for your message: "${inputValue}". I'll get back to you soon!`,
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="absolute bottom-16 right-0 w-80 h-96 bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col border border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-slate-700 bg-blue-600 rounded-t-lg">
        <h3 className="text-lg font-semibold text-white">Live Chat</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-100 focus:outline-none"
          aria-label="Close chat window"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto space-y-2 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No messages yet. Say hello!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-slate-800 dark:bg-slate-700 dark:text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-slate-700 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border border-gray-300 dark:border-slate-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-white"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
