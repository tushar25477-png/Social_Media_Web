import conf from '../conf/conf.js';

import { Client, Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another function to create user profile in database
                return this.account.createEmailSession(email, password);
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            const userAccount = await this.account.createEmailSession(email, password);
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            const userAccount = await this.account.deleteSessions();
            return userAccount;
        } catch (error) {
            if (error?.code === 401) {
                return null;
            }
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const userAccount = await this.account.get();
            return userAccount;
        } catch (error) {
            if (error?.code === 401) {
                return null;
            }
            throw error;
        }
    }
}

const authService = new AuthService()

export default authService