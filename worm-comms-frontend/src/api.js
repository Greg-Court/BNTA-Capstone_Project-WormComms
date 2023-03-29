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

export const getAllConversations = async () => {
  return await apiClient.get('/conversations');
};

export const createConversation = async (conversation) => {
  return await apiClient.post('/conversations', conversation);
};

export const getAllMessages = async () => {
  return await apiClient.get('/messages');
};

export const createMessage = async (message) => {
  return await apiClient.post('/messages', message);
};