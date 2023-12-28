import Blogs from "../models/BlogSchema.js";


export const getAllBlogs = async(req,res)=>{
   try {
     const data = await Blogs.find().populate("user","-password").sort("-createdOn");
     console.log("getall blogs",data)
     if(data){
      res.status(200).json(data)
     }else{
      res.status(404).json({msg:'user error pls check'})
     }
    
   } catch (error) {
       res.status(500).json({error:error})
   } 
}

export const createBlog = async(req,res)=>{
  try {
    const {title,content,image} = req.body;
    if(title && content){
      const blog = new Blogs({
        title,content,image, user: req.userId
      })
      await blog.save();
    //  console.log(title,content,image, req.auth);
      res.status(200).json({msg:'blog created now',blog:blog})
    }
  } catch (error) {
    res.status(500).json({error:error})
  }
}

export const deleteSelectData = async(req,res)=>{
  try {
    const blog = await Blogs.findOneAndDelete({user: req.userId, _id: req.params.id});
    if(!blog){
      res.status(404).json({msg:'unauthorized user.!'});
    }
    res.status(200).json({blog:"blog deleted"});
  } catch (error) {
    res.status(500).json({error:"Server error",error});
  }
}

export const updBlogs = async(req,res)=>{
  try {
    
     const {title,content,image} = req.body;
       
     const updBlog = await Blogs.findOneAndUpdate({user: req.userId, _id:req.params.id},{
      title, content, image
     })
     if(!updBlog){
       res.status(401).json('client error')
     }
    res.status(200).json({msg:'Blog is update',updB : updBlog})
  } catch (error) {
    res.status(500).json({error:"Server error",error});
  }
}

export const authBlog = async(req,res)=>{
  await Blogs.findById(req.params.id).populate('user','-password')

  .then(authres => console.log(authres) )
  .catch(err=> console.log(err))
}