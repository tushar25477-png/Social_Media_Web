import conf from '../conf/conf.js'

import { Client, Account, ID } from 'appwrite'

export class AuthService {
  client = new Client()
  account

  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async createAccount(email, password, name) {
    const userAccount = await this.account.create(ID.unique(), email, password, name)

    if (userAccount) {
      return this.account.createEmailSession(email, password)
    }

    return userAccount
  }

  async login(email, password) {
    return this.account.createEmailSession(email, password)
  }

  async logout() {
    try {
      const userAccount = await this.account.deleteSessions()
      return userAccount
    } catch (error) {
      if (error?.code === 401) {
        return null
      }
      throw error
    }
  }

  async getCurrentUser() {
    try {
      const userAccount = await this.account.get()
      return userAccount
    } catch (error) {
      if (error?.code === 401) {
        return null
      }
      throw error
    }
  }
}

const authService = new AuthService()

export default authService