<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBlogStore } from "../stores/blogStore";
import PostCard from "../components/PostCard.vue";
import Loader from "../components/Loader.vue";

const postsStore = useBlogStore();

const { posts, loading } = storeToRefs(postsStore);
const { getPosts } = postsStore;

onMounted(() => {
  getPosts();
});
</script>

<template>
  <main class="flex flex-col justify-center">
    <Loader v-if="loading" />
    <PostCard v-if="!loading" :posts="posts" />
    
  </main>
</template>
