<script setup>
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/authStore";
const authStore = useAuthStore();

import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
import Loader from "./components/Loader.vue";
const { init } = authStore;
onMounted(() => {
  init();
});
</script>

<template>
  <NavBar />
  <div
    class="flex flex-col items-center bg-white mt-2 mb-20 gap-4 z-30 relative"
  >
    <RouterView />
  </div>
  <Footer />
</template>
