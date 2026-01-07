import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ email: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors duration-200"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors duration-200 resize-none"
          placeholder="Your message..."
        ></textarea>
      </div>

      {status === 'success' && (
        <div className="flex items-center space-x-3 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-300">Message sent successfully! I'll get back to you soon.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center space-x-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-300">Error sending message. Please try again.</span>
        </div>
      )}

      <Button 
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-gray-400 px-8 py-4 text-lg rounded-xl transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
      >
        <Send className="w-5 h-5" />
        <span>{loading ? 'Sending...' : 'Send Message'}</span>
      </Button>
    </form>
  );
};

export default ContactForm;
