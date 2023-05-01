import User from "../mongodb/models/user.js"
import Post from "../mongodb/models/post.js"

const getProfile = (req, res) => {
  const user_id = req.user.id

  User.findById(user_id)
    .select("-password")
    .then((user) => {
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

  try {
    const [follower, following] = await Promise.all([User.findById(follower_id), User.findById(following_id)])

    // Check if the follower is already following the user
    if (following.followers.some((f) => f._id.equals(follower._id))) {
      return res.status(400).send({ error: "User is already a follower" })
    }

    following.followers.push(follower)
    follower.following.push(following)

    await following.save()
    await follower.save()

    res.status(200).json(following)
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

const bookmark = async (req, res) => {
  const user_id = req.user.id
  const post_id = req.body.post_id

  try {
    const [user, post] = await Promise.all([User.findById(user_id), Post.findById(post_id).lean()])

    // Check if the post is already bookmarked by the user
    if (user.bookmarks.some((b) => b._id.equals(post._id))) {
      return res.status(400).send({ error: "Post is already bookmarked by user" })
    }

    user.bookmarks.push(post)

    await user.save()

    res.status(200).json(user)
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

const getFollowers = (req, res) => {
  const user_id = req.user.id

  User.findById(user_id)
    .select("-password")
    .then((user) => {
      // res.status(200).json(user.followers)
      User.find({ _id: { $in: user.followers } })
        .then((user) => {
          res.status(200).json(user)
        })
        .catch((err) => {
          res.status(400).send({ error: err })
        })
    })
    .catch((err) => res.status(400).send({ error: err }))
}

const getFollowings = (req, res) => {
  const user_id = req.user.id

  User.findById(user_id)
    .select("-password")
    .then((user) => {
      // res.status(200).json(user.followers)
      User.find({ _id: { $in: user.following } })
        .then((user) => {
          res.status(200).json(user)
        })
        .catch((err) => {
          res.status(400).send({ error: err })
        })
    })
    .catch((err) => res.status(400).send({ error: err }))
}

const getBookmarks = (req, res) => {
  const user_id = req.user.id

  User.findById(user_id)
    .select("-password")
    .then((user) => {
      Post.find({ _id: { $in: user.bookmarks } })
        .then((posts) => {
          res.status(200).json(posts)
        })
        .catch((err) => {
          res.status(400).send({ error: err })
        })
    })
    .catch((err) => res.status(400).send({ error: err }))
}

export default {
  getProfile,
  follow,
  getFollowers,
  getFollowings,
  bookmark,
  getBookmarks,
}
