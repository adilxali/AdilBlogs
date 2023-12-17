import { defineStore } from "pinia";
import appwriteconfig from "../config/appwriteconfig";
import { ID } from "appwrite";
import { storage } from "../appwrite/appwrite";
export const useFileStore = defineStore("file", () => {
  async function uploadFile(id, file) {
    try {
      return await storage.createFile(
        appwriteconfig.appwriteBucketId,
        id,
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }
  async function deleteFile(fileId) {
    try {
      await storage.deleteFile(appwriteconfig.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  function getFilePreview(fileId) {
    return storage.getFilePreview(appwriteconfig.appwriteBucketId, fileId);
  }
  return { getFilePreview, uploadFile, deleteFile };
});
