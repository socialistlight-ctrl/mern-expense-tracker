// Use VITE_API_URL in production/deployed environments, fallback to '/api' for local Vite proxy
//const API_URL = import.meta.env.VITE_API_URL || '/api';

const API_URL = 'https://expense-tracker-backend-040n.onrender.com/api';
// Helper function for API requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};
// Auth services
export const authService = {
  register: (userData) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  login: (userData) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  getMe: () => request('/auth/me'),
};

// Transaction services
export const transactionService = {
  getTransactions: () => request('/transactions'),
  addTransaction: (txData) => request('/transactions', {
    method: 'POST',
    body: JSON.stringify(txData),
  }),
  deleteTransaction: (id) => request(`/transactions/${id}`, {
    method: 'DELETE',
  }),
};