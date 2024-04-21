import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

// DOUBT :What is meant by ASYNC FUNC
// ANS: in case of thsi type of function we will be
//      using the await keyword , this keyword will
//      make pause the execution of that paricular
//      line on which that await is used , and this
//      pausing will be removed after the execution of
//      that particular statement

// suppose if a statement take 5sec to complete its
// execution , and there are many other statement that
// usee the result of that statement , so if the func
// doesnt wait for that particular statement , then it
// it will cause for error , thats the reason behind
// the usage of this async func
// we mainly use this funtion in case of the read/write
// operation etc.

// DOUBT: what is the difference between the daatabases
//        and the bucket (storage) that is used below ?
// ANS: by seeing in the appwrite we can see that
//      database is having the table with the details
//      that is required for the posts. Whereas storage
//      has the images
export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  // post related services
  async createPost({ title, slug, content, featuredimage, status, userid ,phone}) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userid,
          phone
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredimage, status, userid }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    // DOUBT: the working of the above code :
    // ANS: here we are giving a default value to the
    //      query , so if we doesnt pass any argument
    //      then that default value will be used and
    //      the post with active status will only be
    //      displayed

    // here in the above queries is an array that
    // contains whose status is active
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
    }
  }

  //   file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  //   if we want we can put it in async

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
  
  
  

}




const service = new Service();
export default service;
