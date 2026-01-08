
export const API_BASE = 'http://localhost:3000/api';

export const api = {
  get: async (endpoint: string) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`);
      return await res.json();
    } catch (e) {
      console.error('API Fetch Error:', e);
      return { success: false, error: 'Network error' };
    }
  },
  post: async (endpoint: string, body: any) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (e) {
      console.error('API Post Error:', e);
      return { success: false, error: 'Network error' };
    }
  },
  put: async (endpoint: string, body: any) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (e) {
      console.error('API Put Error:', e);
      return { success: false, error: 'Network error' };
    }
  },
  delete: async (endpoint: string) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (e) {
      console.error('API Delete Error:', e);
      return { success: false, error: 'Network error' };
    }
  },
};
