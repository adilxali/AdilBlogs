<script setup>
import { ref, computed, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import Input from "../components/Input.vue";
import Loader from "../components/Loader.vue";
import { useBlogStore } from "../stores/blogStore";
import { useAuthStore } from "../stores/authStore";
import { useFileStore } from "../stores/fileStore";
const { uploadFile, deleteFile } = useFileStore();
const { createPost, updatePost } = useBlogStore();
const { loading } = storeToRefs(useAuthStore());

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const { slug } = route.params;
const post = ref(null);
const title = ref("");
const body = ref("");
const fileInput = ref();
const handleFile = (e) => {
  fileInput.value = e.target.files[0];

  console.log(fileInput.value);
};
console.log(post);
const addPost = async () => {
  try {
    if (slug) {
      const file = fileInput?.value.files[0];
      if (file) {
        await deleteFile(post.featuredImage);
      }
      const id = uuidv4();
      const url = uploadFile(id, file);
      console.log(url);
      await updatePost(slug, {
        title: title.value,
        content: body.value,

        featuredImage: id,
        userId: authStore.currentUser.$id,
      });
      alert("Post updated");
      router.push("/posts");
      console.log("post updated");
    } else {
      const file = fileInput?.value.files[0];
      if (file) {
        const id = uuidv4();

        await createPost({
          title: title.value,
          content: body.value,

          featuredImage: id,
          userId: authStore.currentUser.$id,
        });
        uploadFile(id, file);
        alert("Post added");
        router.push("/posts");
      } else {
        console.log("no file");
      }
    }
  } catch (error) {
    console.error("Error adding post:", error);
  }
};
watch(
  () => route.params.slug,
  async (slug) => {
    if (slug) {
      const res = await getPost(slug);
      post.value = res;
      console.log("watch");
    } else {
      console.log("no slug");
    }
  }
);
</script>
<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div>
    <form @submit.prevent="addPost">
      <Input
        v-model="title"
        label="Title"
        type="text"
        placeholder="Enter title"
        id="title"
      />
      
      <div>
        <label for="file">File</label>
        <input
          type="file"
          ref="fileInput"
          id="file"
          @change="handleFile"
          accept="image/*"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        />
      </div>
      <div>
        <label for="content">Content</label>
        <textarea
          id="content"
          v-model="body"
          rows="10"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-blue-700 text-white p-3 rounded-lg w-full mt-3"
      >
        {{ slug ? "Update Post" : "Add Post" }}
      </button>
    </form>
  </div>
</template>
