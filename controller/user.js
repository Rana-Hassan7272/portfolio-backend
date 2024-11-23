import cloudinary from 'cloudinary'
import jwt from 'jsonwebtoken'
import { User } from '../model/User.js'
import { sendMail } from '../middlewares/sendMail.js';

export const login=(async(req,res)=>{
    try{
    const {email,password}=req.body;
   const user=await User.findOne({email,password});
   if(!user){
    return res
        .status(400)
        .json({success:false,message:"Invalid email or password"})
   }
   const token=jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY)
   res.status(200)
   .cookie("token",token,{
    expires: new Date(Date.now() + 6000000),
    httpOnly:true
   })
   .json({
    success:true,
    message:"Logged in Successfully"
   })
    }
    catch(error){
        return res
        .status(400)
        .json({success:false,message:error.message})

        
    }
})

export const logout=(async(req,res)=>{
    try{
    
       res.status(200)
       .cookie("token",null,{
        expires: new Date(Date.now() ),
        httpOnly:true
       
       })
       .json({
        success:true,
        message:"Logged Out Successfully"
       })
        }
        catch(error){
            return res
            .status(400)
            .json({success:false,message:error.message})
    
            
        }
})

export const getUser=(async(req,res)=>{
    try{
   
   const user=await User.findOne().select("-password -email");
   if(!user){
    return res
        .status(400)
        .json({success:false,message:"Invalid email or password"})
   }
  
   res.status(200)
   
   .json({
    success:true,
    user
   })
    }
    catch(error){
        return res
        .status(400)
        .json({success:false,message:error.message})

        
    }
})

export const getProfile=(async(req,res)=>{
    try{
   
   const user=await User.findById(req.user._id);
   if(!user){
    return res
        .status(400)
        .json({success:false,message:"Invalid email or password"})
   }
  
   res.status(200)
   
   .json({
    success:true,
    user
   })
    }
    catch(error){
        return res
        .status(400)
        .json({success:false,message:error.message})

        
    }
})


export const contact=(async(req,res)=>{
    try{
   
  const {name,email,message}=req.body;
  const userMessage=`My name is ${name} and email is ${email} and message is ${message}`
  await sendMail(userMessage)
  res.status(200)
   
  .json({
   success:true,
   message:"Message sent successfully"
  })

    }
    catch(error){
        return res
        .status(400)
        .json({success:false,message:error.message})

        
    }
})


export const updateUser=(async(req,res)=>{
    try{
   const user=await User.findById(req.user._id)
   
   const {name,email,password,skills,about}=req.body;
   if(name){
    user.name=name;
   }
   if (email && typeof email === "string") {
    user.email = email;
  } else if (email) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }
  
  if (password && typeof password === "string") {
    user.password = password;
  } else if (password) {
    return res.status(400).json({
      success: false,
      message: "Invalid password format",
    });
  }
  
   if(about){
    if (about.name) {
        user.about.name = about.name;
      }
      if (about.title) {
        user.about.title = about.title;
      }
      if (about.subtitle) {
        user.about.subtitle = about.subtitle;
      }

      if (about.description) {
        user.about.description = about.description;
      }
      if (about.quote) {
        user.about.quote = about.quote;
      }
if(about.avatar){
  await cloudinary.v2.uploader.destroy(user.about.avatar.public_id)
  const cloud=await cloudinary.v2.uploader.upload(about.avatar,{folder:"3D PORTFOLIO"})
  user.about.avatar={
    public_id:cloud.public_id,
    url:cloud.secure_url
  }
}
if (skills) {
    if (skills.image1) {
     await cloudinary.v2.uploader.destroy(user.skills.image1.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
        folder:"3D PORTFOLIO",
      });

      user.skills.image1 = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    if (skills.image2) {
      await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(skills.image2, {
        folder: "3D PORTFOLIO",
      });

      user.skills.image2 = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    if (skills.image3) {
      await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
        folder: "3D PORTFOLIO",
      });

      user.skills.image3 = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    if (skills.image4) {
      await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
        folder: "3D PORTFOLIO",
      });

      user.skills.image4 = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    if (skills.image5) {
      await cloudinary.v2.uploader.destroy(user.skills.image5.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
        folder: "3D PORTFOLIO",
      });

      user.skills.image5 = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    if (skills.image6) {
      await cloudinary.v2.uploader.destroy(user.skills.image6.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
        folder: "3D PORTFOLIO",
      });

      user.skills.image6 = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  }
   }
  await user.save();
  res.status(200)
   
  .json({
   success:true,
   message:"Updated user data successfully"
  })


    }
    catch(error){
        return res
        .status(400)
        .json({success:false,message:error.message})

        
    }
})

export const addTimeline=(async(req,res)=>{
    try{
   const {title,description,date}=req.body
  const user=await User.findById(req.user._id)
  user.timeline.unshift({
    title,description,date
  })
  await user.save()

  res.status(200)
   
  .json({
   success:true,
   message:"Added Timeline successfully"
  })

    }
    catch(error){
        return res
        .status(400)
        .json({success:false,message:error.message})

        
    }
})
export const addProjects=(async(req,res)=>{
    try{
   const {title,description,technologies,url,image}=req.body
  const user=await User.findById(req.user._id)
  const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: "3D PORTFOLIO",
  });
  user.projects.unshift({
    title,url,description,technologies,image:{
       public_id:myCloud.public_id,
       url:myCloud.secure_url 
    }
  })
  await user.save()

  res.status(200)
   
  .json({
   success:true,
   message:"Added project successfully"
  })

    }
    catch(error){
        return res
        .status(400)
        .json({success:false,message:error.message})

        
    }
})

export const deleteTimeline=(async(req,res)=>{
    try{
    const {id}=req.params
  const user=await User.findById(req.user._id)
  user.timeline=user.timeline.filter((item)=>item._id!=id)
  await user.save()

  res.status(200)
   
  .json({
   success:true,
   message:"Deleted Timeline successfully"
  })

    }
    catch(error){
        return res
        .status(400)
        .json({success:false,message:error.message})

        
    }
})

export const deleteProjects=(async(req,res)=>{
    try{
    const {id}=req.params
  const user=await User.findById(req.user._id)
  const project = user.projects.find((item) => item._id == id);
  await cloudinary.v2.uploader.destroy(project.image.public_id);
  user.projects=user.projects.filter((item)=>item._id!=id)
  await user.save()

  res.status(200)
   
  .json({
   success:true,
   message:"Deleted Project successfully"
  })

    }
    catch(error){
        return res
        .status(400)
        .json({success:false,message:error.message})

        
    }
})