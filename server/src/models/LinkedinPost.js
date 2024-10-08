import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    prospect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prospect',
      required: true
    },
    text: String,
    postUrl: String,
    numLikes: Number,
    numComments: Number,
    numReposts: Number,
    postedAt: Date,
    postedAtString: String, // Add this field to store the original string
    postedDateTimestamp: Number,
    isReshared: Boolean,
    originalPostUrl: String,
    totalReactionCount: Number,
    appreciationCount: Number,
    empathyCount: Number,
    interestCount: Number,
    praiseCount: Number,
    urn: String
  }, { timestamps: true });
  
  const Post = mongoose.model("Post", postSchema);
  
  export default Post;