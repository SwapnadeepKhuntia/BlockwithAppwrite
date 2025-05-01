import Config from "../config/config.js";
import { Client, Account , ID} from "appwrite";

export class AuthService {
     client = new Client(); //Create a new instance of the Client class
     account;
     constructor() {
            this.client.setEndpoint(Config.appwriteUrl) //Set the endpoint for the client
            .setProject(Config.appwriteProject); //Set the project for the client
            this.account = new Account(this.client); //Create a new instance of the Account class
        }

    async createAccount({email, password, name}) {
         //Method to create a new account
         try{
              const userAccount = await this.account.create(ID.unique(), email, password, name); //Create a new account with the provided email, password and name

              if(userAccount) {
                //   console.log("Account created successfully:", userAccount); //Log the account details to the console
                //   return userAccount; //Return the account details

               //call another method
                return this.login({email, password}); //Login the user with the provided email and password
              }
                else {
                    // console.error("Account creation failed"); //Log the error to the console
                    // return null; //Return null if account creation failed
                    return userAccount;
                }
         }
         catch(error){
            console.error("Error creating account:", error); //Log the error to the console
            // throw error; //Throw the error
         }
    }

    async login({email, password}) {
        //Method to login the user
        try{
            return await this.account.createEmailSession(email, password); //Create a new email session with the provided email and password
        }
        catch(error){
            console.error("Error logging in:", error); //Log the error to the console
            //throw error; //Throw the error
        }
    }

    async getCurrentUser() {
        //Method to get the current user
        try{
            return await this.account.get(); //Get the current user details
        }
        catch(error){
            console.error("Error getting current user:", error); //Log the error to the console
            //throw error; //Throw the error
        }
        return null; //Return null if there was an error
    }

    async logout() {
        //Method to logout the user
        try{
            // return await this.account.deleteSession('current'); //Delete the current session
            return await this.account.deleteSessions(); //Delete all sessionsthe current session
        }
        catch(error){
            console.error("Error logging out:", error); //Log the error to the console
            //throw error; //Throw the error
        }
        // return null; //Return null if there was an error
    }

}

const authService = new AuthService(); //Object to hold the authService instance

export default authService; //Export the authService instance   