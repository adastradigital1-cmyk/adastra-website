import { supabase } from '../lib/supabase';

export const submitNewsletter = async (email) => {
  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .insert([{ email, source: 'website_footer' }])
    .select();

  if (error) {
    if (error.code === '23505') {
      throw new Error('This email is already subscribed.');
    }
    throw new Error(error.message || 'Failed to subscribe. Please try again.');
  }
  return data;
};

export const submitContactForm = async (formData) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([formData])
    .select();

  if (error) {
    throw new Error(error.message || 'Failed to submit. Please try again.');
  }
  return data;
};

export const submitCV = async (formData) => {
  const { data, error } = await supabase
    .from('cv_submissions')
    .insert([formData])
    .select();

  if (error) {
    throw new Error(error.message || 'Failed to submit. Please try again.');
  }
  return data;
};

export const submitConsultation = async (formData) => {
  const { data, error } = await supabase
    .from('consultation_requests')
    .insert([formData])
    .select();

  if (error) {
    throw new Error(error.message || 'Failed to submit. Please try again.');
  }
  return data;
};
