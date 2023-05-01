import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema(
  {
    posted_by: {
      type: ObjectId,
      required: true,
    },
    user_posted: { type: String, required: true },
    photo: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
)

const Post = mongoose.model("Post", PostSchema)

export default Post
