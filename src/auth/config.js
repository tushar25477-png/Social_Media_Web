import conf from '../conf/conf.js';

import { Client, ID, Databases, Query, Storage } from "appwrite";


export class Service {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            const post = await this.database.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId
            });
            return post;
        } catch (error) {
            throw error;
        }  
    } 

    async updatePost(slug,{title,  content, featuredImage, status, userId}){
        try {
            const post = await this.database.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId
            });
            return post;
        } catch (error) {
            throw error;
        }  
    } 

    async deletePost(slug){
        try {
            await this.database.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return false;
        } catch (error) {
            throw error;
            return true;
        }  
    }       
    async getPost(slug){
        try {
            const post = await this.database.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return post;
        } catch (error) {
            throw error;
        }  
    } 

    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            const posts = await this.database.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
            return posts.documents;
        } catch (error) {
            throw error;
            return false;
        }  
    }
    // file upload
    async uploadFile(file){
        try {
            const uploadedFile = await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file);
            return uploadedFile;
        } catch (error) {
            throw error;
            return false;
        }  
    }   

    async deleteFile(fileId){
        try {
            const deletedFile = await this.storage.deleteFile(conf.appwriteBucketId, fileId);
            return deletedFile;
        } catch (error) {
            throw error;
            return false;
        }  
    }
    getFilePreview(fileId){
        try {
            const filePreview = this.storage.getFilePreview(conf.appwriteBucketId, fileId);
            return filePreview;
        } catch (error) {
            throw error;
            return false;
        }  
    }

}   

const service = new Service();

export default service;