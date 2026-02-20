import React, { useState } from 'react';
import { X, CalendarDays, Loader2, CheckCircle2 } from 'lucide-react';
import { submitConsultation } from '../services/supabaseService';

export const ConsultationModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    company: '',
    phone: '',
    service_interest: '',
    preferred_date: '',
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
      await submitConsultation(form);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setForm({ full_name: '', email: '', company: '', phone: '', service_interest: '', preferred_date: '', message: '' });
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
              Schedule Consultation
            </h3>
            <p className="text-[13px] text-[#888] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Book a strategy session with our talent experts.
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
            <h4 className="text-lg font-bold" style={{ color: '#111', fontFamily: 'Poppins, sans-serif' }}>Consultation Booked!</h4>
            <p className="text-[14px] text-[#888] mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>A member of our team will confirm your appointment shortly.</p>
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
                  placeholder="John Smith"
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
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Company</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] placeholder-[#CCC] focus:outline-none focus:border-[#F26522]/50 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  placeholder="Acme Corp"
                />
              </div>
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
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Service Interest</label>
              <select
                name="service_interest"
                value={form.service_interest}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] focus:outline-none focus:border-[#F26522]/50 transition-colors bg-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option value="">Select a service...</option>
                <option value="executive_search">Executive Search</option>
                <option value="contingency_hiring">Contingency Hiring</option>
                <option value="rpo">Recruitment Process Outsourcing</option>
                <option value="temporary_staffing">Temporary Staffing</option>
                <option value="workforce_advisory">Workforce Advisory</option>
                <option value="market_intelligence">Market Intelligence</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Preferred Date</label>
              <input
                name="preferred_date"
                type="date"
                value={form.preferred_date}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] focus:outline-none focus:border-[#F26522]/50 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#555] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-md border border-gray-200 text-[14px] text-[#2B2B2B] placeholder-[#CCC] focus:outline-none focus:border-[#F26522]/50 transition-colors resize-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
                placeholder="Tell us about your hiring challenges..."
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
                <><Loader2 size={16} className="animate-spin" /> Booking...</>
              ) : (
                <><CalendarDays size={16} /> Book Consultation</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
