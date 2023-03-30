import axios from 'axios';

// Create an instance of axios with a base URL and default headers.
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createUser = async (user) => {
  return await apiClient.post('/users', user);
};

export const getAllChats = async () => {
  return await apiClient.get('/chats');
};

export const getUserChats = async () => {
  return axios.get(`/api/users/${userId}/chats`);
};

export const createChat = async ({ name, participantIds }) => {
  const response = await axios.post("/api/chats", { name, participantIds });
  return response.data;
};

export const createConversation = async (conversation) => {
  return await apiClient.post('/chats', conversation);
};

export const getAllMessages = async () => {
  return await apiClient.get('/messages');
};

export const createMessage = async (message) => {
  return await apiClient.post('/messages', message);
};

export const getAllUsers = async () => {
  return await apiClient.get('/users');
}