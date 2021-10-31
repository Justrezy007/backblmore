const {validationResult} = require('express-validator')
const Blogpost = require('../models/blog')

exports.createBlogPost = (req,res,next) => {
    const title = req.body.title
    // const image = req.body.image
    const body = req.body.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const err = new Error('Input Value Tidak Sesuai')
        err.errorStatus = 400
        err.data = errors.array()
        throw err;
    }

    const Posting = new Blogpost({
        title: title,
        body : body,
        author : {
            uid: 1,
            nama:'Gangs',
        }
    })

    Posting.save()
    .then(result=>{ 
        res.status(201).json({
            message : "Success Create Blog Post",
            data : result
        })
    })
    .catch(err=>console.log(err))

    
}