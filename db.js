import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export default mongoose.connect(process.env.MONGO_URL, {});
