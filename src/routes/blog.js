const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const blogController = require("../controllers/blog");

// [POST] blog post
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("Title Tidak Sesuai"),
    body("body").isLength({ min: 10 }).withMessage("Body tidak sesuai"),
  ],
  blogController.createBlogPost
);

//  [GET] get all post /blog/post?page=[int]&perpage=[int]
router.get('/posts', blogController.getAllPosts)

// [GET] get post by id
router.get('/posts/:postId', blogController.getPostById)

// [PUT] update post by Id
router.put('/post/:postId',[
    body("title").isLength({ min: 5 }).withMessage("Title Tidak Sesuai"),
    body("body").isLength({ min: 10 }).withMessage("Body tidak sesuai"),
  ], blogController.updatePostById)

//  [DELETE]  Delete Post By Id
router.delete('/post/:postId', blogController.deletePostById)


module.exports = router;
