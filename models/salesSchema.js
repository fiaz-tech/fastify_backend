//Product Schema
const Transaction = {
    type: 'object',
    properties: {
        salesid: {type: 'string'},
        productid: {type: 'string'},
        quantity: {type: 'number'},
        amount: {type: 'number'},
    },
};

const postSalesSchema = {
    body: {
      type: 'object',
      required: ['quantity'],
      properties: {
        quantity: {type: 'number'},
        price: {type: 'number'},
      },
    },
   
  };

  const getSalesByProductSchema = {
    response: {
        200: {
            type: 'array',
            items: Transaction,
          },
      },
  };

  const getAllSalesSchema = {
    response: {
      200: {
        type: 'array',
        items: Transaction,
      }
    }
  }
  



module.exports = {
    Transaction,
    postSalesSchema,
    getSalesByProductSchema,
    getAllSalesSchema,
}