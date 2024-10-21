import User from '../models/users.model';
import { MongoRepository } from '../db/MongoRepository';

export class UserService {
  private userRepository = new MongoRepository(User);

  async createUser(userData: any) {
    return this.userRepository.create(userData);
  }

  async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, userData: any) {
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
