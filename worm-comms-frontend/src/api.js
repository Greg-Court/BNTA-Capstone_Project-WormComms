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

export const getUserChats = async (userId) => {
  return apiClient.get(`/chats/user/${userId}`);
};

export const createChat = async ({ name, participantIds }) => {
  const response = await apiClient.post("/chats", { name, participantIds });
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

export const getUserById = async (id) => {
  return await apiClient.get(`/users/${id}`, id);
}

export const getChatById = async (id) => {
  return await apiClient.get(`/chats/${id}`);
}

export const updateChat = async (id, chat) => {
  return await apiClient.put(`/chats/${id}`, chat);
};

export const createFriend = async (friend) => {
  return await apiClient.post('/relationships', friend);
};

export const getUserRelationships = async (userId) => {
  return await apiClient.get(`/relationships/${userId}`);
};

export const acceptFriendRequest = async (id) => {
  return await apiClient.put(`/relationships/${id}/accept`);
};

export const rejectFriendRequest = async (id) => {
  return await apiClient.put(`/relationships/${id}/reject`);
};

export const blockFriend = async (id) => {
  return await apiClient.put(`/relationships/${id}/block`);
};

export const unfriend = async (id) => {
  return await apiClient.put(`/relationships/${id}/unfriend`);
};
export const updateUser = async (id, user) => {
  return await apiClient.put(`/users/${id}`, user);
}
