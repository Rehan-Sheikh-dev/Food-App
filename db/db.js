import mongoose from "mongoose";

const DbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    } catch (error) {
        console.log("MongoDb connection failed:",error);
    }
}

export default DbConnect;