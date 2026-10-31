import { API_URL } from "../config/gameConfig";

class ApiService {
  getToken() {
    return localStorage.getItem("appleWorm_token") || "";
  }

  setToken(token) {
    if (token) {
      localStorage.setItem("appleWorm_token", token);
    } else {
      localStorage.removeItem("appleWorm_token");
    }
  }

  getGuestId() {
    let guestId = localStorage.getItem("appleWorm_guestId");
    if (!guestId) {
      guestId = "guest_" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("appleWorm_guestId", guestId);
    }
    return guestId;
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const guestId = this.getGuestId();

    const headers = {
      "Content-Type": "application/json",
      "x-guest-id": guestId,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `API Error ${response.status}`);
      }

      return data;
    } catch (err) {
      // If server is not responding, return graceful fallback or throw
      console.warn(`API call ${endpoint} failed:`, err.message);
      throw err;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }
}

export const api = new ApiService();
