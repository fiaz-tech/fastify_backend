const products = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'},
        image: {type: 'string'},
        category: {type: 'string'},
        description: {type: 'string'},
        rating: {type: 'number'},
        price: {type: 'number'},
    },
}

const postProductSchema = {
    body: {
      type: 'object',
      required: ['name', 'image', 'category', 'description', 'price'],
      properties: {
        id: {type: 'string'},
        name: {type: 'string'},
        image: {type: 'string'},
        category: {type: 'string'},
        description: {type: 'string'},
        rating: {type: 'number'},
        price: {type: 'number'},
      },
    },
   
  };


//Product Schema
const productSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        image: {type: 'string'},
        category: {type: 'string'},
        description: {type: 'string'},
        rating: {type: 'number'},
        price: {type: 'number'},
    },
};

const getProductsSchema = {
    response: {
      200: {
        type: 'array',
        items: products,
      },
    },
  };

  const getProductSchema = {
    response: {
        200: products,
      },
  };

module.exports = {
    productSchema,
    getProductsSchema,
    getProductSchema,
    postProductSchema
}