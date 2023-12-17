import { Client, Account, Databases, Storage } from "appwrite";
import appwriteconfig from "../config/appwriteconfig";

const client = new Client();
client
  .setEndpoint(appwriteconfig.appwriteUrl)
  .setProject(appwriteconfig.appwriteProjectId);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
