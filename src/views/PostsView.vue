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
    <PostCard v-if="posts.value" :posts="posts" />
    <div v-else>
      <h1 class=" font-bold text-3xl italic ">No Post Available</h1>
      <router-link to="/add-post"><p class="text-center underline italic">Please Add Post to View</p></router-link>
    </div>
  </main>
</template>
