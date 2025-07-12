const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const config: RequestInit = {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string, role?: string) {
    return this.request('/user/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  }

  async logout() {
    return this.request('/user/logout', { method: 'GET' });
  }

  // Items
  async getItems() {
    return this.request('/items');
  }

  async getItem(id: string) {
    return this.request(`/items/${id}`);
  }

  async createItem(formData: FormData) {
    return this.request('/items/add', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  async getPendingItems() {
    return this.request('/items/admin/pending');
  }

  async getCustomerItems() {
    return this.request('/items/customer/all');
  }

  async approveItem(id: string) {
    return this.request(`/items/${id}/approve`, { method: 'PUT' });
  }

  async rejectItem(id: string) {
    return this.request(`/items/${id}/reject`, { method: 'DELETE' });
  }

  async updateItem(id: string, formData: FormData) {
    return this.request(`/items/${id}`, {
      method: 'PUT',
      headers: {},
      body: formData,
    });
  }

  async deleteItem(id: string) {
    return this.request(`/items/${id}`, { method: 'DELETE' });
  }
}

export default new ApiService();