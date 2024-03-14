const cassandra = require('cassandra-driver');
const client = require('../config/salesConfig');

const tableName = 'sales';



//GET all Transactions
const getAllTransactions = async (request, reply) => {
    try {
        const selectQuery = `SELECT * FROM ${tableName};`;
    
        const result = await client.execute(selectQuery);
    
        reply.send(result.rows);
      } catch (err) {
        console.error('Error retrieving sales:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
      }
    
};


//GET Transactions by product
const getTransactionByProduct = async (request, reply) => {
    try {
        const productId = request.params.productId;

        const query = `SELECT * FROM ${tableName} WHERE productId = ? ALLOW FILTERING`;
        const params = [productId];

        const result = await client.execute(query, params, { prepare: true });
        reply.send(result.rows);

      } catch (error) {
        console.error(error);
        reply.code(500).send({ error: 'Internal Server Error' });
      }
}


//POST Transaction
const createTransaction = async (request, reply) => {
    try {
        
        const { productId, quantity, amount } = request.body;
        const salesId = cassandra.types.Uuid.random()
        const created_at = new Date();  // Current timestamp
    
        const insertQuery = `
          INSERT INTO ${tableName} (salesId, productId, quantity, amount, created_at) VALUES (?, ?, ?, ?, ?);
        `;
    
        await client.execute(insertQuery, [ salesId, productId, quantity, amount, created_at ], { prepare: true });
    
        reply.status(201).send({ message: 'Sales inserted successfully' });
      } catch (err) {
        console.error('Error inserting sales:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
      }
  };


  module.exports = {
    getAllTransactions,
    getTransactionByProduct,
    createTransaction,
  }

