import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Auth API
export const authAPI = {
    signup: (userData) => axios.post(`${API_URL}/auth/signup`, userData),
    signin: (credentials) => axios.post(`${API_URL}/auth/signin`, credentials),
};

// Policy API
export const policyAPI = {
    getPolicies: () => axios.get(`${API_URL}/db`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    }),
    createPolicy: (policyData) => axios.post(`${API_URL}/db`, policyData, {
        headers: { Authorization: `Bearer ${getToken()}` }
    }),
    updatePolicy: (policyId, policyData) => axios.patch(`${API_URL}/db/${policyId}`, policyData, {
        headers: { Authorization: `Bearer ${getToken()}` }
    }),
    deletePolicy: (policyId) => axios.delete(`${API_URL}/db/${policyId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    }),
};
