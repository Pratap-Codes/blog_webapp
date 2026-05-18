import mongoose from "mongoose";


const connectDB= async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MonogoDB connceted succesfully");
        
    } catch (error) {
       console.log("MongoDB connection failed",error);
        
    }
}

export default connectDB;