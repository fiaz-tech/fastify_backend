const {
     getAllTransactions, 
     getTransactionByProduct, 
     createTransaction, 
    } = require('../controllers/salesController');
 const {
    postSalesSchema,
    getSalesByProductSchema,
    getAllSalesSchema,
    } = require('../models/salesSchema');


 //Options for get all transactions
const getTransactionOpts = {
    schema: getAllSalesSchema,
    handler: getAllTransactions,
}


//Options for get transactions by product
const getTransactionByProductOpts = {
    schema: getSalesByProductSchema,
    handler: getTransactionByProduct,
};

//POST sales opts
const postTransactiontOpts = {
    schema: postSalesSchema,
    handler: createTransaction,
}



function salesRoutes (fastify, options, done){
    //GET all transactions
    fastify.get('/api/sales', getTransactionOpts)  

    //GET transactions by product
    fastify.get('/api/sales/:productId', getTransactionByProductOpts)

    //POST create transaction
    fastify.post('/api/sales', postTransactiontOpts)

    done()
}

module.exports = salesRoutes