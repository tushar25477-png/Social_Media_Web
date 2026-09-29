import conf from '../conf/conf.js'

import { Client, ID, Databases, Query, Storage } from 'appwrite'

export class Service {
  client = new Client()
  database
  storage

  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId)
    this.database = new Databases(this.client)
    this.storage = new Storage(this.client)
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    return this.database.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
      title,
      slug,
      content,
      featuredImage,
      status,
      userId,
    })
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    return this.database.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
      title,
      content,
      featuredImage,
      status,
      userId,
    })
  }

  async deletePost(slug) {
    await this.database.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
    return true
  }

  async getPost(slug) {
    return this.database.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    const posts = await this.database.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
    return posts.documents
  }

  async uploadFile(file) {
    return this.storage.createFile(conf.appwriteBucketId, ID.unique(), file)
  }

  async deleteFile(fileId) {
    return this.storage.deleteFile(conf.appwriteBucketId, fileId)
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
  }
}

const service = new Service()

export default service