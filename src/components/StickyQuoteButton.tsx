import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const StickyQuoteButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send message.');
        setStatus('error');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Sticky Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <MessageCircle className="h-6 w-6 relative z-10" />
          <span className="hidden md:block font-semibold group-hover:scale-105 transition-transform relative z-10">
            Quick Quote
          </span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
        </button>
      </div>

      {/* Quote Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            {/* Decorative gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 rounded-2xl p-0.5">
              <div className="bg-white rounded-2xl h-full w-full"></div>
            </div>
            
            <div className="relative p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    Quick Quote Request
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">Get your personalized quote in 24 hours</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="info@ipmedicalcare.co.tz"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Hospital/Clinic name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Equipment Needed *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                    placeholder="Describe the medical equipment you need, quantities, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-xl hover:scale-105 group"
                >
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Quote Request
                </button>
              </form>

              {status === 'success' && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-xl text-center font-semibold">Thank you for your message! We will be in touch shortly.</div>
              )}
              {status === 'error' && (
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-xl text-center font-semibold">{error}</div>
              )}

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 via-teal-50 to-emerald-50 rounded-xl border border-blue-100">
                <p className="text-xs text-gray-600 text-center">
                  <span className="font-semibold text-blue-700">Fast Response Guarantee:</span> We'll get back to you within 24 hours with a detailed quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyQuoteButton;