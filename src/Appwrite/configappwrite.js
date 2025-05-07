import Config from '../config/config.js';
import { Client, ID , Databases, Storage,Query } from 'appwrite';

export class Service {
    client = new Client(); //Create a new instance of the Client class
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(Config.appwriteUrl) //Set the endpoint for the client
        .setProject(Config.appwriteProject); //Set the project for the client
        this.databases = new Databases(this.client); //Create a new instance of the Databases class
        this.bucket = new Storage(this.client); //Create a new instance of the Storage class
    }
     
    //This function creates a post
    async createPost({title,slug,content,featuredimage,status,userID}){
         try{
            const postcreation = await this.databases.createDocument(Config.appwriteDatabase,
             Config.appwriteCollection,
             slug,
             {
                title,
                content,
                featuredimage,
                status,
                userID
             }
            ) //Create a new document in the database with a unique ID
            return postcreation; //Return the created post
         }
        catch(error){
            console.log("Error creating post:", error); //Log the error to the console
            //throw error; //Throw the error
        }
    }

    async updatePost(slug,{title, content, featuredimage, status}) {
         try{
            const postUpdate = await this.databases.updateDocument(
                Config.appwriteDatabase,
                Config.appwriteCollection,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
            return postUpdate; //Return the updated post
         }
         catch{
            console.log("Error updating post:", error); //Log the error to the console
            //throw error; //Throw the error
         }
    }

    async deletePost(slug) {
        try{
            await this.databases.deleteDocument(
                Config.appwriteDatabase,
                Config.appwriteCollection,
                slug
            );
            return true; //Return true if the post was deleted successfully
        }
        catch(error){
            console.log("Error deleting post:", error); //Log the error to the console
            //throw error; //Throw the error
            return false; //Return false if there was an error
        }
    }

    async getPost(slug) {
        try{
          return await this.databases.getDocument(
            Config.appwriteDatabase,
            Config.appwriteCollection,
            slug
           )
        }
        catch(error){
            console.log("Error getting post:", error); //Log the error to the console
            return false; //Return false if there was an error
        }
    }

    async getAllPosts(queries = [Query.equal('status', 'active')]) {
        try{
            return await this.databases.listDocuments(
                Config.appwriteDatabase,
                Config.appwriteCollection,
                queries, //Queries to filter the documents
                // [
                //     Query.equal('status', 'published')
                // ]
            );
        }
        catch(error){
            console.log("Error getting all posts:", error); //Log the error to the console
            return false; //Return false if there was an error
        }
    }

    //file uploade servise

    async uploadFile(file){
       try{
        return await bucket.createFile(
            Config.appwriteBucket,
            ID.unique(),
            file //Upload the file to the bucket
         );
       }
       catch(error){
            console.log("Error uploading file:", error); //Log the error to the console
            //throw error; //Throw the error
            return false; //Return false if there was an error
       }
    }

    async deleteFile(fileId) {
        try{
            return await this.bucket.deleteFile(
                Config.appwriteBucket,
                fileId //Delete the file from the bucket
            );
            return true; //Return true if the file was deleted successfully
        }
        catch(error){
            console.log("Error deleting file:", error); //Log the error to the console
            //throw error; //Throw the error
            return false; //Return false if there was an error
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            Config.appwriteBucket,
            fileId //Get the preview of the file
        );
    }
}

const service = new Service();

export default service;