<script setup>
import { onMounted, ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useBlogStore } from "../stores/blogStore";
import { useFileStore } from "../stores/fileStore";
import { useAuthStore } from "../stores/authStore";
import Loader from "../components/Loader.vue";
import { storeToRefs } from "pinia";
const { getFilePreview } = useFileStore();
const { currentUser } = storeToRefs(useAuthStore());
const route = useRoute();
const router = useRouter();
const { getPost, deletePost } = useBlogStore();
const { loading } = storeToRefs(useBlogStore());

const post = ref(null);
const { slug } = route.params;
const id = slug.toString();
onMounted(() => {
  post.value = null;
  if (id) {
    getPost(id).then((res) => {
      post.value = res;
    });
  } else {
    console.log("no slug");
    router.push("/");
  }
});
</script>
<template>
  <Loader v-if="loading" />
  
  <div
    v-if="post"
    class="mx-auto flex flex-col items-center gap-3 text-gray-800 border border-gray-700 rounded-lg max-w-7xl max-h-screen w-90 h-[75vh]"
  >
    <img
      v-if="post?.featuredImage"
      :src="getFilePreview(post?.featuredImage)"
      :alt="post?.title"
      class="object-cover h-60 overflow-hidden rounded-lg border border-gray-700"
    />
    <div class="flex justify-between px-2 pb-3 border-b border-gray-950 w-full">
      <p>Post on: {{ post?.$createdAt.slice(0, 10) }}</p>
      <div
        v-if="currentUser?.$id === post?.userId"
        class="flex justify-between gap-6"
      >
        <router-link
          :to="`/edit-post/${id}`"
          class="font-serif hover:font-mono hover:underline hover:text-gray-950 hover:scale-110"
          >Edit</router-link
        >
        <p
          @click="deletePost(post.$id)"
          class="font-serif hover:underline cursor-pointer text-red-600 hover:scale-110"
        >
          Delete
        </p>
      </div>
    </div>
    <div class="leading-normal w-full px-2">
      <h5 class="mb-2 text-2xl font-bold text-center text-gray">
        {{ post?.title }}
      </h5>
      <p class="mb-3 font-normal text-left text-gray-900">
        {{ post?.content }}
      </p>
    </div>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>
