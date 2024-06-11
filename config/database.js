
const mongoose=require('mongoose')
require('dotenv').config()
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("Database connection successfull!!");
    }
    catch(err){
        console.log(`Database connection failed ${err.message}`);
    }
}
module.exports=connectDB