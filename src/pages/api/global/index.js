import axios from 'axios';
import { getSession, signOut, useSession } from 'next-auth/react';

const host = process.env.NEXT_PUBLIC_BACKEND_BACKEND_URL;

export const Header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const axiosInstance = axios.create({
  baseURL: host,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.user.name.token.access_token;
    //console.log('token...................', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return;
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      signOut();
    }
    return;
  }
);

export const getElement = (endpoint) => {
  return axiosInstance({
    url: host + '/' + endpoint,
    method: 'GET',
    headers: Header,
  });
};

export const createElement = (endpoint, data) => {
  return axiosInstance({
    url: host + '/' + endpoint,
    method: 'POST',
    headers: Header,
    data: JSON.stringify(data),
  });
};

export const searchElement = (endpoint, data) => {
  return axiosInstance({
    url: host + '/' + endpoint,
    method: 'POST',
    headers: Header,
    data: JSON.stringify(data),
  });
};

export const getElementById = (endpoint, id) => {
  return axiosInstance({
    url: host + '/' + endpoint + '/' + id,
    method: 'GET',
    headers: Header,
  });
};

export const updateElementById = (endpoint, id, data) => {
  return axiosInstance({
    url: host + '/' + endpoint + '/' + id,
    method: 'PUT',
    headers: Header,
    data: JSON.stringify(data),
  });
};

export const changeElementById = (endpoint, id, data) => {
  return axiosInstance({
    url: host + '/' + endpoint + '/' + id + '/',
    method: 'PATCH',
    headers: Header,
    data: JSON.stringify(data),
  });
};

export const deleteElement = (endpoint, id) => {
  return axiosInstance({
    url: host + '/' + endpoint + '/' + id,
    method: 'DELETE',
    headers: Header,
  });
};
