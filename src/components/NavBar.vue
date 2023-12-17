<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);

const isAuthenticated = computed(() => !!currentUser.value);

const open = ref(false);
const logout = () => {
  authStore.logout();
};

const navList = ref([
  {
    name: "Home",
    path: "/",
  },

  {
    name: "Posts",
    path: "/posts",
  },
  {
    name: "Add Post",
    path: "/add-post",
  },
]);
</script>
<template>
  <nav
    class="sticky top-0 z-50 w-full bg-white border-gray-200 dark:bg-gray-900 p-2"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center p-4 mt-4 justify-between mx-auto"
    >
      <router-link to="/" class="flex items-center text-white">
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Adil Blogs</span
        >
      </router-link>
      <button
        class="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
      >
        <svg
          v-if="open"
          class="block h-6 w-6 close-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <svg
          v-else
          class="block h-6 w-6 menu-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div class="hidden w-full sm:flex sm:flex-wrap sm:w-auto">
        <ul
          v-if="isAuthenticated"
          class="font-medium flex w-full justify-between"
        >
          <li v-for="item in navList" :key="item.name" class="text-white">
            <router-link
              :to="item.path"
              class="dark:text-white py-2 px-4 mx-2 text-lg font-semibold hover:bg-gray-700 hover:rounded-lg hover:border-gray-900"
              aria-current="page"
              >{{ item.name }}</router-link
            >
          </li>
          <li @click="() => logout()">
            <!-- //logout button -->
            <span
              v-if="isAuthenticated"
              class="dark:text-white duration-200 py-2 px-4 mr-2 text-lg font-semibold cursor-pointer hover:bg-gray-700 hover:rounded-lg hover:border-gray-900"
            >
              Logout
            </span>
          </li>
        </ul>
      </div>
      <div v-if="!open" class="w-full sm:hidden" id="navbar-default">
        <ul
          v-if="isAuthenticated"
          class="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        >
          <li v-for="link in navList" :key="link.name">
            <router-link
              :to="link.path"
              class="block py-2 pl-3 pr-4 text-white rounded dark:text-white"
            >
              {{ link.name }}</router-link
            >
          </li>
          <li @click="() => isAuthenticated && logout()">
            <!-- //logout button -->
            <span
              v-if="isAuthenticated"
              class="block py-2 pl-3 pr-4 text-white rounded dark:text-white"
            >
              Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
