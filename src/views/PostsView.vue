<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBlogStore } from "../stores/blogStore";
import PostCard from "../components/PostCard.vue";

const postsStore = useBlogStore();

const { posts } = storeToRefs(postsStore);
const { getPosts } = postsStore;

onMounted(() => {
  getPosts();
});
</script>

<template>
  <main class="flex flex-col justify-center">
    <PostCard v-if="posts" :posts="posts" />
    <div v-else>
      <p>Loading...</p>
    </div>
  </main>
</template>
