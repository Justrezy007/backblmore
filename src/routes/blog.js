const express = require('express')
const {body} = require('express-validator')
const router = express.Router()

const blogController = require("../controllers/blog")

router.post('/post',[body('title').isLength({min: 5}).withMessage('Title Tidak Sesuai'),body('body').isLength({min: 10 }).withMessage('Body tidak sesuai')],blogController.createBlogPost)

module.exports = router