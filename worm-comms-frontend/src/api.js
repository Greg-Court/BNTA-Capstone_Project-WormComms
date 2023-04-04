import axios from 'axios';

// Create an instance of axios with a base URL and default headers.
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json', 
  },
});

const updateUserClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});
export const updateUser = async (id, formData) => {
  return await updateUserClient.put(`/users/${id}`, formData);
};



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

export const createRelationship = async (relationship) => {
  return await apiClient.post('/relationships', relationship);
};

export const getUserRelationships = async (userId) => {
  return await apiClient.get(`/relationships/${userId}`);
};

export const acceptFriendRequest = async (userId, targetUserId) => {
  return await apiClient.put(`/relationships/accept/${userId}/${targetUserId}`);
};

export const cancelFriendRequest = async (userId, targetUserId) => {
  return await apiClient.put(`/relationships/cancelRequest/${userId}/${targetUserId}`);
};

export const rejectFriendRequest = async (userId, targetUserId) => {
  return await apiClient.put(`/relationships/reject/${userId}/${targetUserId}`);
};

export const unfriend = async (userId, targetUserId) => {
  return await apiClient.put(`/relationships/unfriend/${userId}/${targetUserId}`);
};

export const blockPerson = async (userId, targetUserId) => {
  return await apiClient.put(`/relationships/block/${userId}/${targetUserId}`);
};

export const unblockPerson = async (userId, targetUserId) => {
  return await apiClient.put(`/relationships/unblock/${userId}/${targetUserId}`);
};

// export const updateUser = async (id, user) => {
//   return await updateUserClient.put(`/users/${id}`, user);
// };

// export const updateUser = async (id, formData) => {
//   return await updateUserClient.put(`/users/${id}`, formData);
// };
