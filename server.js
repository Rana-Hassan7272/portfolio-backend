import { app } from "./app.js";
import dotenv from 'dotenv'
import { connectDatabase } from "./config/database.js";
import cloudinary from 'cloudinary'

dotenv.config({path:"../backend/config/config.env"})
connectDatabase()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
app.listen(process.env.PORT,()=>{
    console.log(`App is listening on ${process.env.PORT}`)
})