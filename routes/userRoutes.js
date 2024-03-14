const fastify = require('fastify')();

const { 
  registerUser, 
  loginUser, 
  getUserProfile
 } = require('../controllers/userController');
const { 
  userSchema, 
  loginSchema,
  registerUserSchema, 
  getProfileSchema
}  = require('../models/userSchema');
const  protect  = require('../middleware/auth');



const loginOpts = {
  schema: loginSchema,
  handler: loginUser ,
};


const getProfileOpts = {
  schema: getProfileSchema,
  handler: getUserProfile,
}



//Options for register
const registerOpts = {
    schema: registerUserSchema,
    handler: registerUser,
};


function userRoutes (fastify, options, done){
    

    //POST Register user
    fastify.post('/api/users/register',  registerOpts)

    //POST Login User
    fastify.post('/api/users/login', loginOpts)

    //GET user Details
    //fastify.get('/api/users/profile' , getUserProfile )
    fastify.register(require('@fastify/auth')).after(() => privateUserRoutes(fastify));

    done();
};



const privateUserRoutes = (fastify) => {
  // create login
fastify.get('/api/users/profile', {
  preHandler: fastify.auth([protect]),
  ...getProfileOpts
});

}



module.exports = userRoutes;