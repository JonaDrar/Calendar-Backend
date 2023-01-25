import mongoose from "mongoose";


export const dbConnection = async() => {

    const DB_CNN = process.env.DB_CNN
    
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(DB_CNN);
        console.log('DB Online');
    } catch (error) {
        console.error(error);
        throw new Error
    }

}