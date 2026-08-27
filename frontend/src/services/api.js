import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
};

export const contentAPI = {
  list: (params) => api.get("/contents", { params }),
  getById: (id) => api.get(`/contents/${id}`),
  create: (data) => api.post("/contents", data),
  update: (id, data) => api.put(`/contents/${id}`, data),
  remove: (id) => api.delete(`/contents/${id}`),
};

export default api;
