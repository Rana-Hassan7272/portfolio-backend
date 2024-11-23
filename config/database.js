import mongoose from "mongoose";

export const connectDatabase=()=>{
    mongoose.connect(process.env.MONGO_URI).then((c)=>{
        console.log(`Mongodb is connected to : ${c.connection.host}`)
    })
    .catch((e)=>{
        console.log("error",e)
    })
}