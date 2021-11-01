const { response } = require('express')
const {validationResult} = require('express-validator')
const Blogpost = require('../models/blog')
const path = require('path')
const fs = require('fs')

// [POST] create Blog Post /post
exports.createBlogPost = (req,res,next) => {


    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const err = new Error('Input Value Tidak Sesuai')
        err.errorStatus = 400
        err.data = errors.array()
        throw err;
    }

    if(!req.file){
        const err = new Error('Image harus Diupload')
        err.errorStatus = 422
        throw err;
    }

    const title = req.body.title
    const image = req.file.path
    const body = req.body.body

    const Posting = new Blogpost({
        title: title,
        body : body,
        image : image,
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

// [GET] Get All Post /posts
exports.getAllPosts = (req,res,next)=>{
    Blogpost.find()
    .then(result=>{
        res.status(200).json({
            message: 'Berhasil mendapatkan Semua Post',
            data: result
        })
    })
    .catch(err => next(err))
}

// [GET] Get Post By Id /posts/:postId
exports.getPostById = (req,res,next)=>{
    Blogpost.findById(req.params.postId)
    .then(result=>{
        // Jika post tidak ditemukan
        if(!result){
            const err = new Error('Postingan tidak ditemukan')
            err.errorStatus = 404
            throw err
        }
        // Jika post ditemukan
        res.status(200).json({
            message: 'Berhasil mendapatkan post',
            data : result
        })
    })
}

// [PUT] update post by Id
exports.updatePostById = (req,res,next)=>{
    const error = validationResult(req)

    // Pengecekan input dari user
    if(!error.isEmpty()){
        const err = new Error('Input Value tidak sesuai')
        err.errorStatus = 400
        err.data = error.array()
        throw err
    }

    // Pengecekan apakah sudah upload image
    if(!req.file){
        const err = new Error('Image Harus di Input')
        err.errorStatus = 422
        throw err
    }

    const title = req.body.title
    const image = req.file.path
    const body = req.body.body
    const postId = req.params.postId

    Blogpost.findById(postId)
    .then(post=>{
        // Pengecekan apakah post ada
        if(!post){
            const err = new Error('Postingan tidak ditemukan')
            err.errorStatus = 404
            throw err
        }

        post.title = title
        post.image = image
        post.body = body

        return post.save()
    })
    .then(result=>{
        res.status(200).json({
            message: "Update berhasil",
            data: result
        })
    })
    .catch(err=>next(err))

}

// [DELETE] Delete post by Id /post/:postId
exports.deletePostById = (req,res,next)=>{

    const postId = req.params.postId

    // Cek Apakah Postingan Ada
    Blogpost.findById(postId)
    .then(post =>{
        if(!post){
            const err = new Error('Postingan Tidak Ditemukan')
            err.errorStatus = 404;
            throw err
        }

        // Menghapus Gambar di dalam direktori
        deleteImage(post.image)

        // Menghapus Postingan menghasilkan promise
        return  Blogpost.findByIdAndRemove(postId)

    })
    .then(result=>{
        res.status(200).json({
            message: 'Postingan berhasil dihapus',
            data : result
        })
    })
    .catch(err=>next(err))
}

// Fungsi menghapus gambar
const deleteImage = (filepath)=>{

    // Mendapatkan path dari gambar dengan menggabungkan path sekarang dengan path gambar
    filepath = path.join(__dirname,"../..",filepath)
    // Menghapus gambar dari direktori
    fs.unlink(filepath, err => console.log(err))
}