const express = require('express')
const router = express.Router()

const productsController = require('../controllers/products')

// Method Post Products
router.post('/product', productsController.createProduct)

// Method Get Products
router.get("/products", productsController.getAllProducts)

module.exports = router