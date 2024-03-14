const { getAllProducts, getProductById, postProduct, updateProduct, deleteProduct } = require('../controllers/products');
const {productSchema, getProductsSchema, getProductSchema, postProductSchema} = require('../models/productSchema');


const getProductstOpts = {
    schema: getProductsSchema,
    handler: getAllProducts,
  };



//Options for get one product by Id
const getProductOpts = {
    schema: getProductSchema,
    handler: getProductById,
}


//Options for post product
const postProductOpts = {
    schema: postProductSchema,
    handler: postProduct
}


//Options for uodate product
const updateProductOpts = {
    schema: {schema: {body: productSchema}}
}



function productRoutes (fastify, options, done){
    //GET all products
    fastify.get('/api/products',  getProductstOpts)  

    //GET single product by Id
    fastify.get('/api/products/:id', getProductOpts)

    //POST single product 
    fastify.post('/api/products', postProductOpts)

    //UPDATE single product
    fastify.put('/api/products/:id', updateProductOpts, updateProduct)

    //DELETE single product
    fastify.delete('/api/products/:id', deleteProduct)

    done()
}



module.exports = productRoutes