import mongoose from "mongoose";
import config from "../config/default.mjs";

const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: [, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [15, 'Name must be at most 50 characters long'],
    trim: true,
  },
  surname: {
    type: String,
    required: [, 'Surname is required'],
    minlength: [3, 'Surname must be at least 3 characters long'],
    maxlength: [15, 'Surname must be at most 50 characters long'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [12, 'Age must be at least 12'],
    max: [120, 'Age must be at most 120'],
    toInt: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (v) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: 'Please provide a valid email address.',
    },
  },
});

userSchema.static.checkDBExist = async () => {
  const databases = await mongoose.connection.listDatabases();
  return databases.databases.some((db) => db.name === config.databaseName);
};
userSchema.static.checkCollectionExists = async function () {
  if (await this.checkDBExist()) {
    const collections = await mongoose.connection.db.listCollections({name: 'users'}).toArray();
    return collections.length > 0;
  }
  return false;
};
const User = mongoose.model('User', userSchema);
export default User;