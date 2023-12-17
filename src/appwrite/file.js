import appwriteconfig from "../config/appwriteconfig";
import { Client, Storage, ID } from "appwrite";

export class FileServices {
  client = new Client();
  storage;
  constructor() {
    this.client
      .setEndpoint(appwriteconfig.appwriteUrl)
      .setProject(appwriteconfig.appwriteProjectId);
    this.storage = new Storage(this.client);
  }
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        appwriteconfig.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite servie :: uploadFile :: error", error);
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(fileId);
    } catch (error) {
      console.log("Appwrite servie :: deleteFile :: error", error);
    }
  }
  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(
        appwriteconfig.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.log("Appwrite servie :: getFilePreview :: error", error);
    }
  }
}

const fileService = new FileServices();
export default fileService;
