<script setup>
import { useFileStore } from "../stores/fileStore";
const { getFilePreview } = useFileStore();
defineProps(["posts"]);
</script>
<template>
  <div v-if="posts.length" class="flex flex-col justify-center gap-3 overflow-auto">
    <router-link
      v-for="post in posts"
      :key="post.$id"
      :to="`/post/${post.$id}`"
      class="flex flex-col items-center md:h-52 gap-3 bg-gray-800 border border-gray-700 rounded-lg md:flex-row md:max-w-xl hover:bg-gray-700"
    >
      <img
        :src="getFilePreview(post.featuredImage)"
        :alt="post.title"
        class="object-cover w-full overflow-hidden rounded-lg border border-gray-700 md:h-52 md:w-48 md:rounded-none md:rounded-s-lg"
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">
          {{ post.title }}
        </h5>
        <p class="mb-3 font-normal text-gray-400">{{ post.content }}</p>
      </div>
    </router-link>
  </div>
  <div v-else>
    <h1 class="font-bold text-3xl italic ">No Post Available</h1>
    <router-link to="/add-post"><p class="text-center underline italic">Please Add Post to View</p></router-link>
  </div>
</template>
