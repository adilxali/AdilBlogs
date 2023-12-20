<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useBlogStore } from "../stores/blogStore";
import PostCard from "../components/PostCard.vue";
import Loader from "../components/Loader.vue";

const postsStore = useBlogStore();

const { posts, loading } = storeToRefs(postsStore);
const { init } = postsStore;

onMounted(() => {

  init();
});
</script>

<template>
  <main class="flex flex-col justify-center">
    <Loader v-if="loading" />
    
    <PostCard v-if="posts && !loading" :posts="posts" />
   
  </main>
</template>
