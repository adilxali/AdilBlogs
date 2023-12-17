// import { ref, computed } from "vue";
// import { defineStore } from "pinia";

// import { Client, Account, ID } from "appwrite";
// export const useAuthStore = defineStore("auth", () => {
//   const client = new Client();
//   const account = new Account(client);
//   const currentUser = ref(null);
//   const authStatus = computed(() => currentUser.value !== null);

//   const loginUser = async (email, password) => {
//     try {
//       const user = await account.createEmailSession(email, password);
//       currentUser.value = user;
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const registerUser = async (email, password, name) => {
//     try {
//       const user = await createAccount(email, password, name);
//       currentUser.value = user;
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logoutUser = async () => {
//     try {
//       await logout();
//       currentUser.value = null;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const getCurrentUserDetails = async () => {
//     try {
//       const user = await getCurrentUser();
//       currentUser.value = user;
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return {
//     currentUser,
//     authStatus,
//     loginUser,
//     logoutUser,
//     registerUser,
//     getCurrentUserDetails,
//   };
// });

import { ref, computed } from "vue";
import { ID } from "appwrite";
import { defineStore, acceptHMRUpdate } from "pinia";
import { account } from "../appwrite/appwrite";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref(null || JSON.parse(localStorage.getItem("user")));
  const loading = ref(false);

  const isAuthenticated = computed(() => currentUser.value !== null);

  const router = useRouter();

  async function init() {
    try {
      loading.value = true;
      const user = await account.get();
      currentUser.value = user;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function register(name, email, password) {
    try {
      loading.value = true;
      await account.create(ID.unique(), email, password, name);
      console.log("Account created");
      await login(email, password);
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function login(email, password) {
    try {
      await account.createEmailSession(email, password);
      await init();

      router.push("/");
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      loading.value = true;
      await account.deleteSessions();
      currentUser.value = null;
      localStorage.removeItem("user");

      router.push("/login");
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    init,
    register,
    login,
    logout,
    currentUser,
    isAuthenticated,
  };
});
