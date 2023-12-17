import { defineStore, acceptHMRUpdate } from "pinia";
import appwriteconfig from "../config/appwriteconfig";
import { ref } from "vue";
import { Query, ID } from "appwrite";
import { databases } from "../appwrite/appwrite";
import router from "../router";

export const useBlogStore = defineStore("blog", () => {
  const posts = ref([]);
  const post = ref(null);
  const loading = ref(false);
  async function init() {
    try {
      loading.value = true;
      const response = await databases.listDocuments(
        appwriteconfig.appwriteDatabaseId,
        appwriteconfig.appwriteCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      posts.value = response.documents;
    } catch (error) {
      console.log("Blog Store :: init :: error", error);
    } finally {
      loading.value = false;
    }
  }

  async function createPost(post) {
    try {
      loading.value = true;
      return databases.createDocument(
        appwriteconfig.appwriteDatabaseId,
        appwriteconfig.appwriteCollectionId,
        ID.unique(),
        post
      );
    } catch (error) {
      console.log("Appwrite servie :: createPost :: error", error);
    } finally {
      loading.value = false;
    }
  }

  async function updatePost(slug, { title, content, featureImage, status }) {
    try {
      loading.value = true;
      return await databases.updateDocument(
        appwriteconfig.appwriteDatabaseId,
        appwriteconfig.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite servie :: updatePost :: error", error);
    } finally {
      loading.value = false;
    }
  }

  async function deletePost(slug) {
    try {
      loading.value = true;
      await databases.deleteDocument(
        appwriteconfig.appwriteDatabaseId,
        appwriteconfig.appwriteCollectionId,
        slug
      );
      router.push("/posts");
      return true;
    } catch (error) {
      console.log("Appwrite servie :: deletePost :: error", error);
    } finally {
      loading.value = false;
    }
  }

  async function getPost(slug) {
    try {
      loading.value = true;
      return await databases.getDocument(
        appwriteconfig.appwriteDatabaseId,
        appwriteconfig.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Blog Store :: getPost :: error", error);
    } finally {
      loading.value = false;
    }
  }

  async function getPosts() {
    try {
      loading.value = true;
      const response = await databases.listDocuments(
        appwriteconfig.appwriteDatabaseId,
        appwriteconfig.appwriteCollectionId
      );
      posts.value = response.documents;
    } catch (error) {
      console.log("Blog Store :: getPosts :: error", error);
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    getPosts,
    posts,
    post,
    getPost,
    createPost,
    updatePost,
    deletePost,
    init,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot));
}
