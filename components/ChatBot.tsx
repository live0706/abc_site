
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'Bienvenue à l\'ABC Academy ! Comment puis-je vous aider aujourd\'hui ?',
      images: ['https://picsum.photos/id/180/300/200']
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const basketballImages = [
    'https://picsum.photos/id/180/400/300',
    'https://picsum.photos/id/163/400/300',
    'https://picsum.photos/id/73/400/300',
    'https://picsum.photos/id/225/400/300'
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput('');
    setIsLoading(true);

    try {
      // L'appel à Gemini passe par la fonction serverless /api/chat pour ne pas exposer la clé API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(({ role, text }) => ({ role, text })) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const response: { text: string } = await res.json();

      const randomImg = basketballImages[Math.floor(Math.random() * basketballImages.length)];
      
      const modelMessage: ChatMessage = { 
        role: 'model', 
        text: response.text || "Je n'ai pas pu générer de réponse.",
        images: [randomImg]
      };
      
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Désolé, j'ai rencontré une erreur technique." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 bg-orange-600 text-white w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center border-4 border-white"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        ) : (
          <span className="text-3xl">🏀</span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-slide-up">
          <div className="bg-orange-600 p-6 text-white">
            <h3 className="font-black text-xl uppercase tracking-tighter">ABC Assistant</h3>
            <p className="text-xs opacity-80">En ligne pour vous aider</p>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-white text-gray-800 shadow-sm rounded-tl-none border border-gray-100'}`}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                  {m.images && m.images.map((img, idx) => (
                    <img key={idx} src={img} alt="Basket" className="mt-3 rounded-lg w-full h-32 object-cover border border-gray-100" />
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Tapez votre message..."
              className="flex-grow bg-gray-100 px-4 py-3 rounded-xl outline-none text-sm focus:ring-2 focus:ring-orange-600/20"
            />
            <button 
              onClick={handleSend}
              className="bg-orange-600 text-white p-3 rounded-xl hover:bg-orange-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </>
  );
};

export default ChatBot;
