import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Linkedin
} from 'lucide-react';
import { API_URL } from '../config';

export default function LinkedInChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm your LinkedIn assistant. Ask me anything — writing your About section, headline tips, what to post, growing your network, and more.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();

    const trimmed = input.trim();

    if (!trimmed || loading) return;

    const newMessages = [
      ...messages,
      {
        role: 'user',
        content: trimmed,
      },
    ];

    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const history = newMessages
        .filter(
          (m) =>
            m.role === 'user' ||
            m.role === 'assistant'
        )
        .slice(0, -1)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await axios.post(
        `${API_URL}/api/linkedin-chat`,
        {
          message: trimmed,
          history,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.data.reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Sorry, I couldn't get a response just now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#182C61] text-white shadow-xl shadow-[#182C61]/40 flex items-center justify-center hover:scale-105 transition-transform duration-200"
        aria-label="Open LinkedIn assistant"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm h-[28rem] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#182C61] text-white">
            <Linkedin className="w-5 h-5" />

            <span className="font-semibold text-sm">
              LinkedIn Assistant
            </span>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#182C61] text-white rounded-br-sm'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 rounded-bl-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-2xl bg-slate-100 dark:bg-white/10">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 px-3 py-3 border-t border-slate-200 dark:border-white/10"
          >
            <input
              type="text"
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              placeholder="Ask about your LinkedIn profile..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#182C61]"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 shrink-0 rounded-xl bg-[#182C61] text-white flex items-center justify-center disabled:opacity-50 hover:bg-[#182C61] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}