import appwriteconfig from "../config/appwriteconfig";
import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

export class BlogServices {
  constructor() {
    this.databases = databases;
  }

  async createPost(title, slug, content, featuredImage, status, userId) {
    try {
      return await this.databases.createDocument(
        appwriteconfig.appwriteDatabaseId,
        appwriteconfig.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite servie :: createPost :: error", error);
    }
  }

  async updatePost(slug, title, content, featureImage, status) {
    try {
      return await this.databases.updateDocument(
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
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        appwriteconfig.appwriteDatabaseId,
        appwriteconfig.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite servie :: deletePost :: error", error);
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        appwriteconfig.appwriteDatabaseId,
        appwriteconfig.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite servie :: getPost :: error", error);
    }
  }
  async getPosts() {
    try {
      return await this.databases.listDocuments(
        appwriteconfig.appwriteDatabaseId,
        appwriteconfig.appwriteCollectionId
      );
    } catch (error) {
      console.log("Appwrite servie :: getPosts :: error", error);
    }
  }
}

const blogService = new BlogServices();
export default blogService;
