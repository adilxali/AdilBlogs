<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBlogStore } from "../stores/blogStore";
import PostCard from "../components/PostCard.vue";

const postsStore = useBlogStore();

const { posts } = storeToRefs(postsStore);
const { init } = postsStore;

onMounted(() => {
  init();
});
</script>

<template>
  <main class="flex flex-col justify-center">
    <PostCard :posts="posts" />
  </main>
</template>
