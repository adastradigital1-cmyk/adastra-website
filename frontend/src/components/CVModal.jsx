import React, { useState } from 'react';
import { X, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { submitCV } from '../services/supabaseService';

export const CVModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    linkedin_url: '',
    job_role: '',
    experience_years: '',
    preferred_industry: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitCV(form);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setForm({ full_name: '', email: '', phone: '', linkedin_url: '', current_role: '', experience_years: '', preferred_industry: '', message: '' });
      }, 2000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h3
              className="text-[22px] font-bold"
              style={{ color: '#111', fontFamily: 'Poppins, sans-serif' }}
            >
              Submit Your CV
            </h3>
            <p className="text-[13px] text-[#888] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Let us match you with your next opportunity.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-[#999]" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-12 text-center">
            <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: '#F26522' }} />
            <h4 className="text-lg font-bold" style={{ color: '#111', fontFamily: 'Poppins, sans-serif' }}>Application Received!</h4>
            <p className="text-[14px] text-[#888] mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>Our talent team will review your profile and reach out soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Full Name *</label>
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] placeholder-[#CCC] focus:outline-none focus:border-[#F26522]/50 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] placeholder-[#CCC] focus:outline-none focus:border-[#F26522]/50 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="jane@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] placeholder-[#CCC] focus:outline-none focus:border-[#F26522]/50 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>LinkedIn URL</label>
                <input
                  name="linkedin_url"
                  value={form.linkedin_url}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] placeholder-[#CCC] focus:outline-none focus:border-[#F26522]/50 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="linkedin.com/in/janedoe"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Current Role</label>
                <input
                  name="current_role"
                  value={form.current_role}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] placeholder-[#CCC] focus:outline-none focus:border-[#F26522]/50 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="Senior Engineer"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Experience</label>
                <select
                  name="experience_years"
                  value={form.experience_years}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] focus:outline-none focus:border-[#F26522]/50 transition-colors bg-white"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <option value="">Select...</option>
                  <option value="0-2">0–2 years</option>
                  <option value="3-5">3–5 years</option>
                  <option value="6-10">6–10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Preferred Industry</label>
              <select
                name="preferred_industry"
                value={form.preferred_industry}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] focus:outline-none focus:border-[#F26522]/50 transition-colors bg-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option value="">Select...</option>
                <option value="technology">Technology</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="banking">Banking & Financial Services</option>
                <option value="healthcare">Healthcare</option>
                <option value="logistics">Logistics & Supply Chain</option>
                <option value="energy">Energy & EV</option>
                <option value="retail">Consumer & Retail</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Additional Notes</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] placeholder-[#CCC] focus:outline-none focus:border-[#F26522]/50 transition-colors resize-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
                placeholder="Tell us about your career goals..."
              />
            </div>

            {status === 'error' && (
              <p className="text-[13px] text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-white rounded-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#F26522', fontFamily: 'Inter, sans-serif' }}
            >
              {status === 'loading' ? (
                <><Loader2 size={16} className="animate-spin" /> Submitting...</>
              ) : (
                <><Upload size={16} /> Submit Application</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
