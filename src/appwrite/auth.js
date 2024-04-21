import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;
  // DOUBT: why need to create a constuctor ? why cant we do it when creating the variables
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call another account
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // EXTRA:

  async updatePhoneNumber(phone, password,userId) {
    try {
       // Assuming you have a method to get the current user's ID
      const promise = this.account.updatePhone(phone, password, userId);

      const response = await promise;
      console.log(response); // Success
      return response; // You might want to handle the response accordingly
    } catch (error) {
      console.log("Error updating phone number:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service:: getCurrentUser :: error", error);
    }

    return null; // DOUBT : find why this return is used
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authservice = new Authservice();

export default authservice;
