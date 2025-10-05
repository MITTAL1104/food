import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://raghavklk11_db_user:9729087589@cluster0.uqncoq6.mongodb.net/Food-delApp').then(() =>console.log("DB Connected"));
}