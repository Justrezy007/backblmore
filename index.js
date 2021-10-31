const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()
const router = express.Router()

// Deklarasi File Storage Multer
const fileStorage  = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'image')
    },
    filename: (req,file,cb) =>{
        cb(null,new Date().getTime() + '-' + file.originalname )
    }
})

// Menggunakan Filter Multer
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype ===  'image/jpg' ||  file.mimetype ===  'image/jpeg') {
        cb(null, true)
    }
    else{
        cb(null,false)
    }
}



// Menggunakan middleware Body Parser

app.use(bodyParser.json())

// Menggunakan middleware

app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('image'))


// Mengatasi CROSS ORIGIN pada web engine

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*"),
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

const productsRoutes = require("./src/routes/products")
const authRoutes = require("./src/routes/auth")
const blogController = require("./src/routes/blog")

// Untuk Routing Product
app.use('/v1/list/',productsRoutes)

// Untuk Routing Authentikasi
app.use('/v1/auth/', authRoutes)

// Untuk Blog
app.use('/v1/blog/', blogController)

// Error Handling
app.use((error,req,res,next)=>{
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data

    res.status(status).json({message:message,data:data})
})

mongoose.connect('mongodb+srv://mamanracing:gk92CgEylfQc31Dd@cluster0.6og2l.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000)
})
.catch(err=>console.log(err))
