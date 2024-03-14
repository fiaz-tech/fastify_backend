const user = {
    type: 'object',
    properties: {
        user_id: {type: 'string'},
        email: {type: 'string'},
        name: {type: 'string'},
    },
}



//User Schema
const userSchema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        email: {type: 'string'},
        password: { type: 'string'},
    }
};

const registerUserSchema = {
    body: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: {type: 'string'},
        email: {type: 'string'},
        password: {type: 'string'},
      },
    },
   
  };

const loginSchema = {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {type: 'string'},
        password: {type: 'string'},
      },
    },
   
  };

  const getProfileSchema = {
    response: {
        200: user,
      },
  };


module.exports ={
    userSchema,
    loginSchema,
    getProfileSchema,
    registerUserSchema,
} 