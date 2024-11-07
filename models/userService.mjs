import User from "./UserSchem.mjs";
import mongoose from "mongoose";

class UserService {
  static async getList() {
    try {
      const exists = await User.checkCollectionExists;
      if (exists) {
        const data = await mongoose.model(collectionName).find().exec();
        return data;
      }
      return (await User.find({})) ?? [];
    } catch (error) {
      return [];
    }
  }

  static async create(data) {
    try {
      const user = new User(data);  
      return await user.save();
    } catch (error) {
      throw new Error('Error creat new user');
    }
  }

  static async getById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error('Error get user by id');
    }
  }

  static async updateUser(id, data) {
    try {
      return await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new Error('Error update user');
    }
  }

  static async deleteUs(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error delete user');
    }
  }
}

export default UserService