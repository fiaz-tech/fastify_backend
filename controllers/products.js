const cassandra = require('cassandra-driver');

const client = require('../config/productConfig');

const tableName = 'products';
//GET all Products
const getAllProducts = async (request, reply) => {
    try {
        const selectQuery = `SELECT * FROM ${tableName};`;
    
        const result = await client.execute(selectQuery);
    
        reply.send(result.rows);
      } catch (err) {
        console.error('Error retrieving products:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
      }
    //reply.send("all Products here")
};



 // GET product by ID
const getProductById =  async (request, reply) => {
    try {
      const { id } = request.params;
  
      const selectQuery = `SELECT * FROM ${tableName} WHERE id = ?;`;
  
      const result = await client.execute(selectQuery, [id]);
  
      if (result.rows.length === 0) {
        reply.status(404).send({ error: 'Data not found' });
      } else {
        reply.status(200).send(result.rows[0]);
      }
    } catch (err) {
      console.error('Error retrieving product by ID:', err);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  };


//POST  product
const postProduct =  async (request, reply) => {
    try {
        
      const { name, image, category, description, rating, price } = request.body;
      const id = cassandra.types.Uuid.random()
      const created_at = new Date();  // Current timestamp
      const updated_at  = new Date(); // Current timestamp
  
      const insertQuery = `
        INSERT INTO ${tableName} (id, name, image, category, description, rating, price, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
  
      await client.execute(insertQuery, [id, name, image, category, description, rating, price, created_at, updated_at ], { prepare: true });
  
      reply.status(201).send({ message: 'Data inserted successfully' });
    } catch (err) {
      console.error('Error inserting data:', err);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  };


// UPDATE product
const updateProduct =  async (request, reply) => {
    try {
    const { id } = request.params;
    const { name, image, category, description, rating, price } = request.body;
    const updated_at = new Date(); //current timestamp

    const updateQuery = `UPDATE ${tableName} SET name = ?, image = ?, category = ?, description = ?, rating = ?, price = ?, updated_at = ?  WHERE id = ?;`;

    await client.execute(updateQuery, [name, image, category, description, rating, price, updated_at, id], { prepare: true });

    reply.status(200).send({ message: 'Product updated successfully' });
    } catch (err) {
    console.error('Error updating data:', err);
    reply.status(500).send({ error: 'Internal Server Error' });
    }
};

//DELETE product
const deleteProduct = async (request, reply) => {
    try {
    const { id } = request.params;

    const deleteQuery = `DELETE FROM ${tableName} WHERE id = ?;`;

    await client.execute(deleteQuery, [id]);

    reply.status(200).send({ message: 'Product deleted successfully' });
    } catch (err) {
    console.error('Error deleting data:', err);
    reply.status(500).send({ error: 'Internal Server Error' });
    }
};



module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct,
}

