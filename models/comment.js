import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
   text:{
      type:String,
      required:true,
   },
   postId:{
      type:String,
      required:true,
      unique:true,
   },
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true,
   },
},{
   timestamps:true,
},
);

export default mongoose.model('Comment',CommentSchema); // created model of User