import CommentModel from '../models/comment.js';
export const getAllComments = async(req,res)=>{
   try {
      const comments = await CommentModel.find()
        .populate('user')
        .exec();
  
      res.json(comments);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error occured during getting all comments",
      });
    }
}
export const createComment = async (req,res) => {
   try {
      const doc = new CommentModel({
        text: req.body.text,
        user: req.userId,
        postId: req.body.postId,
      });
      const comment = await doc.save();
      res.json(comment);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error occured during creation of the comment",
      });
    }
}