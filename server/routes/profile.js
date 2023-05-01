import express from "express"
import profileController from "../controllers/profile.js"
import auth from "../middleware/auth.js"
const router = express()

//@route GET api/users
// @desc Test route
//@access Public
router.get("/", [auth], profileController.getProfile)
router.post("/follow", [auth], profileController.follow)
router.get("/followers", [auth], profileController.getFollowers)
router.get("/followings", [auth], profileController.getFollowings)
router.post("/bookmark", [auth], profileController.bookmark)
router.get("/bookmarks", [auth], profileController.getBookmarks)
router.post("/like", [auth], profileController.getBookmarks)
router.get("/likes", [auth], profileController.getBookmarks)

export default router
