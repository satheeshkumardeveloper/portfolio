import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2 } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const fetchSuggestions = async () => {
    try {
      setSuggestionsLoading(true);
      const response = await fetch('http://localhost:8888/.netlify/functions/api/chatbot/question');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // Assuming the API returns an array of questions or a questions array in the response
      const questions = data.questions || data || [];
      
      // Shuffle and take 3 random suggestions
      const shuffled = questions.sort(() => 0.5 - Math.random());
      setSuggestions(shuffled.slice(0, 3));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      // Fallback suggestions based on conversation context
      const fallbackSuggestions = [
        "What are your main skills?",
        "Tell me about your experience",
        "What projects have you worked on?",
        "What's your background?",
        "What technologies do you work with?",
        "How can I contact you?"
      ];
      
      // Randomly select 3 from fallback suggestions
      const shuffled = fallbackSuggestions.sort(() => 0.5 - Math.random());
      setSuggestions(shuffled.slice(0, 3));
    } finally {
      setSuggestionsLoading(false);
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      fetchSuggestions();
    }
  }, [messages.length]);

  // Fetch new suggestions after bot responses
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'bot' && !isLoading) {
        fetchSuggestions();
      }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputValue('');
      setIsLoading(true);
      setError(null);

      try {
        // Make API call to Netlify function
        const response = await fetch(`http://localhost:8888/.netlify/functions/api/chatbot?question=${encodeURIComponent(inputValue)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const botResponse: Message = {
          id: messages.length + 2,
          text: data.answer || 'Sorry, I could not get a response.',
          sender: 'bot',
        };
        
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Error fetching chatbot response:', error);
        setError('Failed to get response. Please try again.');
        
        const errorMessage: Message = {
          id: messages.length + 2,
          text: 'Sorry, I encountered an error. Please try again later.',
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: suggestion,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setSuggestions([]); // Hide suggestions after selection
    setIsLoading(true);
    setError(null);

    try {
      // Make API call to Netlify function
      const response = await fetch(`http://localhost:8888/.netlify/functions/api/chatbot?question=${encodeURIComponent(suggestion)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: data.answer || 'Sorry, I could not get a response.',
        sender: 'bot',
      };
      
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setError('Failed to get response. Please try again.');
      
      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
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
        {messages.map((message) => (
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
        ))}

        {/* Show suggestions after conversations or when no messages */}
        {(messages.length === 0 || (messages.length > 0 && messages[messages.length - 1].sender === 'bot')) && (
          <div className="mt-4">
            {suggestionsLoading ? (
              <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading suggestions...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">You might also ask:</p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left p-2 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400">
                No messages yet. Say hello!
              </div>
            ) : null}
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-white p-2 rounded-lg max-w-[70%] flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="text-center text-red-500 dark:text-red-400 text-sm mt-2">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-slate-700 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          className="flex-1 p-2 border border-gray-300 dark:border-slate-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-white disabled:opacity-50"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
