const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()

// Menggunakan middleware Body Parser

app.use(bodyParser.json())

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
