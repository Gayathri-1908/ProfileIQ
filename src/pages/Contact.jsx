import { useState } from 'react';
import axios from 'axios';
import { Mail, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { API_URL } from '../config';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(
        `${API_URL}/api/contact`,
        form
      );

      setSubmitted(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

      <div className="text-center mb-10">

        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
          Get in <span className="text-gradient">touch</span>
        </h1>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Questions, feedback, or partnership ideas — we'd love to hear from you.
        </p>

      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-10 shadow-2xl">

        {submitted ? (

          <div className="text-center py-10">

            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Message sent
            </h2>

            <p className="text-slate-600 dark:text-slate-400">
              Thanks for reaching out — we'll get back to you soon.
            </p>

          </div>

        ) : (

          <form onSubmit={handleSubmit} className="space-y-5">

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                We'll reply to you at this address
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Message
              </label>

              <textarea
                name="message"
                required
                rows={5}
                placeholder="Type your question, feedback, or message here..."
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#182C61] text-white font-semibold shadow-lg shadow-[#182C61]/30 hover:bg-[#182C61] hover:shadow-[#182C61]/50 disabled:opacity-50 transition-all duration-200"
            >
              {loading
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Send className="w-4 h-4" />
              }

              {loading ? 'Sending...' : 'Send Message'}
            </button>

          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">

          <Mail className="w-4 h-4" />

          Or email us directly at gayathrirayar5@gmail.com

        </div>

      </div>
    </div>
  );
}