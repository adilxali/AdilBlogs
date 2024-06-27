import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';

const axiosInstance = axios.create({
  baseURL: 'https://travelexicng.doon.org.in/api',
});

const authStore = useAuthStore();

watch(
  () => authStore.token,
  (newToken) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  },
  { immediate: true }
);

axiosInstance.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${authStore.token}`;
  return config;
});

export default axiosInstance;
