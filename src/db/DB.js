const mongoose=require('mongoose')
const { DB_NAME } = require('../constants')


const connectDb= async ()=>{
    try {
       const connection= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n mongo db connected !! DB host : ${connection.connection.host}`);

    } catch (error) {
       console.log("mongoDB connection error",error.message) 
       process.exit(1)
    }
}
module.exports=connectDb