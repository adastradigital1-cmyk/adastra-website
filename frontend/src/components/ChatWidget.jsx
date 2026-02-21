import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';

const knowledgeBase = [
  {
    keywords: ['who', 'about', 'what is', 'company', 'ad astra', 'tell me'],
    answer: 'Ad Astra Consultants is a global talent solutions and advisory firm with 18+ years of experience. We help organisations secure high-impact talent and professionals unlock meaningful career opportunities across 30+ countries.'
  },
  {
    keywords: ['service', 'what do you', 'offer', 'solutions', 'do you do'],
    answer: 'We offer: Executive Search, Contingency Hiring, Recruitment Process Outsourcing (RPO), Temporary & Contract Staffing, Workforce Advisory, and Market Intelligence & Research. Visit our Solutions page for details.'
  },
  {
    keywords: ['executive search', 'leadership', 'cxo', 'c-suite'],
    answer: 'Our Executive Search practice specialises in CXO and senior leadership hiring. We complete leadership mandates within 60-90 days with 3X faster closures compared to traditional market cycles.'
  },
  {
    keywords: ['rpo', 'outsourcing', 'recruitment process'],
    answer: 'Our RPO solutions reduce average time-to-hire by up to 40%. We build embedded recruitment teams for large enterprises and support multi-location hiring expansions.'
  },
  {
    keywords: ['industry', 'sector', 'industries', 'which industries'],
    answer: 'We serve 8 major sectors: Technology & Digital Services, Manufacturing & Engineering, BFSI, Healthcare & Life Sciences, Logistics & Supply Chain, Energy & Electric Mobility, Consumer & Retail, and High-Growth Startups.'
  },
  {
    keywords: ['contact', 'reach', 'phone', 'email', 'touch', 'connect'],
    answer: 'You can reach us through our Contact page or WhatsApp at +91 98441 10041. You can also book a consultation directly through our website.'
  },
  {
    keywords: ['career', 'job', 'work', 'hiring', 'apply', 'find job', 'opportunity'],
    answer: 'Looking for career opportunities? Visit our Find Jobs page to explore current openings. You can also submit your CV directly through our website for future opportunities.'
  },
  {
    keywords: ['talent', 'hire', 'recruit', 'find talent', 'staffing'],
    answer: 'Need to hire? Visit our Find Talent page. We provide Executive Search, Contingency Hiring, RPO, and Contract Staffing solutions tailored to your needs.'
  },
  {
    keywords: ['country', 'global', 'location', 'where', 'office', 'geography'],
    answer: 'We operate across 30+ countries globally, including offices in Bangalore, Mumbai, Delhi, Kolkata, Coimbatore, Singapore, London, and Amsterdam.'
  },
  {
    keywords: ['founder', 'leadership', 'team', 'who runs', 'management'],
    answer: 'Ad Astra was founded by Jayanthi Yeshwant Kumar (Chairperson) and Nirupama VG (Managing Director & Co-Founder), along with Sourav Bose (Co-Founder & VP) and Bikram (VP). Together they bring 100+ years of combined experience.'
  },
  {
    keywords: ['women', 'diversity', 'inclusion', 'women-owned'],
    answer: 'Ad Astra is India\'s largest women-owned recruitment solutions firm with an 80% women workforce, championing diversity and inclusion in the industry.'
  },
  {
    keywords: ['placement', 'track record', 'success', 'result', 'impact', 'stats'],
    answer: 'Our track record: 10,000+ successful placements, 95% client retention rate, 250+ hiring specialists, 18+ years of experience, and operations across 30+ countries.'
  },
  {
    keywords: ['temporary', 'contract', 'staffing', 'flexible'],
    answer: 'Our Temporary & Contract Staffing solutions offer rapid deployment of skilled professionals, seamless payroll & compliance management, and flexible workforce scaling during seasonal or project cycles.'
  },
  {
    keywords: ['technology', 'tech', 'it', 'digital', 'ai', 'cyber'],
    answer: 'In Technology & Digital Services, we support Product & Engineering leadership, AI/ML/Data Science, Cybersecurity, Cloud & DevOps roles, and IT services scaling.'
  },
  {
    keywords: ['cost', 'price', 'pricing', 'fee', 'how much'],
    answer: 'Our pricing is customised based on the engagement model and scope. Please reach out to us for a detailed consultation — we\'ll be happy to provide a tailored proposal.'
  },
  {
    keywords: ['thank', 'thanks', 'bye', 'goodbye'],
    answer: 'Thank you for your interest in Ad Astra Consultants! Feel free to reach out anytime. You can also contact us on WhatsApp at +91 98441 10041.'
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    answer: 'Hello! Welcome to Ad Astra Consultants. How can I help you today? I can answer questions about our services, industries, career opportunities, or anything else about our company.'
  },
];

const defaultResponse = 'I appreciate your question. For specific inquiries, I\'d recommend reaching out to our team directly through the Contact page or WhatsApp at +91 98441 10041. I can help you with information about our services, industries we serve, career opportunities, and our company background.';

function findBestMatch(input) {
  const lower = input.toLowerCase().trim();
  if (lower.length < 2) return defaultResponse;

  let bestScore = 0;
  let bestAnswer = defaultResponse;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        score += kw.split(' ').length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
    }
  }
  return bestAnswer;
}

const quickActions = [
  'What services do you offer?',
  'Which industries do you serve?',
  'How can I contact you?',
  'Tell me about Ad Astra',
];

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I\'m the Ad Astra assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply = findBestMatch(msg);
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      setTyping(false);
    }, 600 + Math.random() * 600);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        data-testid="chat-toggle-btn"
        className="fixed bottom-6 left-6 z-[9990] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: 'var(--orange-core)' }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X size={24} color="white" /> : <MessageCircle size={24} color="white" />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          data-testid="chat-panel"
          className="fixed bottom-24 left-6 z-[9990] w-[360px] max-h-[520px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{
            background: 'rgba(12, 12, 12, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <p className="font-display text-[1rem] font-600" style={{ color: 'var(--white-pure)' }}>Ad Astra Assistant</p>
              <p className="font-mono text-[0.5625rem] mt-0.5" style={{ color: 'var(--orange-core)' }}>POWERED BY AI</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-white/10 transition-colors" aria-label="Close">
              <ChevronDown size={18} style={{ color: 'var(--text-on-dark-muted)' }} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: '340px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl font-body text-[0.8125rem] leading-[1.6] ${
                    msg.role === 'user'
                      ? 'rounded-br-md'
                      : 'rounded-bl-md'
                  }`}
                  style={
                    msg.role === 'user'
                      ? { backgroundColor: 'var(--orange-core)', color: 'white' }
                      : { backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--text-on-dark-muted)', border: '1px solid rgba(255,255,255,0.06)' }
                  }
                  data-testid={`chat-message-${i}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-md" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--orange-core)', animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--orange-core)', animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--orange-core)', animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickActions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 rounded-full font-body text-[0.6875rem] transition-colors duration-200"
                  style={{
                    backgroundColor: 'rgba(232, 96, 28, 0.1)',
                    color: 'var(--orange-core)',
                    border: '1px solid rgba(232, 96, 28, 0.2)',
                  }}
                  data-testid={`quick-action-${i}`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about Ad Astra..."
                data-testid="chat-input"
                className="flex-1 bg-transparent font-body text-[0.8125rem] outline-none px-3 py-2.5 rounded-xl"
                style={{
                  color: 'var(--text-on-dark)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                data-testid="chat-send-btn"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-opacity duration-200"
                style={{
                  backgroundColor: 'var(--orange-core)',
                  opacity: input.trim() ? 1 : 0.4,
                }}
              >
                <Send size={16} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
