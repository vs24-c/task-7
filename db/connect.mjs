import config from "../config/default.mjs";
// Імпортуємо необхідний модуль
import mongoose from 'mongoose';
// Встановлюємо глобальні проміси
mongoose.Promise = global.Promise;
// Функція для підключення до MongoDB
export default async function () {
  try {
    await mongoose.connect(config.mongoURI, {});
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}