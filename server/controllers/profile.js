import User from "../mongodb/models/user.js"
import Post from "../mongodb/models/post.js"

const getProfile = (req, res) => {
  const user_id = req.user.id

  User.findById(user_id)
    .select("-password")
    .then((user) => {
      console.log(user_id)
      Post.find({ posted_by: user_id })
        .select("-posted_by")
        .exec((err, posts) => {
          if (err) res.status(400).json(err)
          else
            res.status(200).json({
              ...user.toObject(),
              posts: posts,
            })
        })
    })
    .catch((err) => res.status(400).send({ error: err }))
}

const follow = async (req, res) => {
  const follower_id = req.user.id
  const following_id = req.body.user_id

  console.log(follower_id, following_id)

  try {
    // const [follower, following] = await Promise.all([User.findById(follower_id), User.findById(following_id)])

    // following.followers.push({
    //   _id: follower._id,
    //   avatar: follower.avatar,
    //   name: follower.name,
    // })

    // await following.save()

    res.status(200).json({ following: "following" })
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

const bookmark = async (req, res) => {
  const user_id = req.user.id
  const post_id = req.post_id

  try {
    const [user, post] = await Promise.all([User.findById(user_id), Post.findById(post_id)])

    user.bookmarks.push(post)

    await user.save()

    res.status(200).json(user)
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

const getFollowers = (req, res) => {
  res.status(200).send("getFollowers")
}

const getFollowings = (req, res) => {
  res.status(200).send("getFollowings")
}

const getBookmarks = (req, res) => {
  res.status(200).send("getBookmarks")
}

export default {
  getProfile,
  follow,
  getFollowers,
  getFollowings,
  bookmark,
  getBookmarks,
}
