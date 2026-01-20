import mongoose from 'mongoose';

 export const connectDb=async()=>{
    try{
             await mongoose.connect('mongodb+srv://jaisyadav2020_db_user:invoice123@cluster1.nhufrtl.mongodb.net/Invoice')
             .then(()=>console.log("DB connected"));
    }catch(err){
        console.log("Error in DB connection",err);
    }
}