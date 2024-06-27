import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';

const authStore = useAuthStore();

const axiosInstance = axios.create();


watch(
  () => authStore.user,
  (newUser) => {
    axiosInstance.defaults.baseURL = `https://travelexicng.doon.org.in/api/${newUser?.tenant_id}/tenant`;
  },
  { immediate: true }
);

watch(
  () => authStore.token,
  (newToken) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  },
  { immediate: true }
);


axiosInstance.interceptors.request.use(config => {
  const { user, token } = authStore;
  config.baseURL = `https://travelexicng.doon.org.in/api/${user?.tenant_id}/tenant`;
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
