import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const submitNewsletter = async (email) => {
  try {
    const response = await axios.post(`${API}/newsletter`, { email });
    return response.data;
  } catch (err) {
    if (err.response?.status === 409) {
      throw new Error('This email is already subscribed.');
    }
    throw new Error(err.response?.data?.detail || 'Failed to subscribe. Please try again.');
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API}/contact`, formData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.detail || 'Failed to submit. Please try again.');
  }
};

export const submitCV = async (formData) => {
  try {
    const response = await axios.post(`${API}/cv`, formData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.detail || 'Failed to submit. Please try again.');
  }
};

export const submitConsultation = async (formData) => {
  try {
    const response = await axios.post(`${API}/consultation`, formData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.detail || 'Failed to submit. Please try again.');
  }
};
