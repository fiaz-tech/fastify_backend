const fastify = require('fastify')({logger: true});
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const client = require('../config/usersConfig');
const secretKey = process.env.JWT_SECRET;

const tableName = 'users';
  

// User Registration (POST /register)
const registerUser =  async (request, reply) => {
    try {
            const { name, email, password } = request.body;
  
            // Check if the email is already taken
            const existingUser = await client.execute(
                 `SELECT * FROM ${tableName} WHERE email = ? LIMIT 1 ALLOW FILTERING`,
            [email]
             );
  
            if (existingUser.rows.length > 0) {
                reply.status(400).send({ error: 'Email already exists' });
                return;
             }
  
            // Generate unique user_id using UUID
            const user_id = uuidv4();
  
            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);
  
            // Insert user into the database
            await client.execute(
                `INSERT INTO ${tableName} (user_id, name, email, password) VALUES (?, ?, ?, ?)`,
                    [user_id, name, email, hashedPassword]
                );
  
            reply.status(201).send({ message: 'User registered successfully' });
        } catch (err) {
            console.error('Error registering user:', err);
            reply.status(500).send({ error: 'Internal Server Error' });
            }
  };



// User Authentication & Login
const loginUser = async (request, reply) => {
    try {
      const { email, password } = request.body;
  
      // Find user by email
      const user = await client.execute(
        `SELECT * FROM  ${tableName} WHERE email = ? LIMIT 1 ALLOW FILTERING`,
        [email]
      );
  
      // Check if user exists and verify password
      if (user.rows.length > 0 && await bcrypt.compare(password, user.rows[0].password)) {

      // Generate JWT token
    const token = jwt.sign({ userId: user.rows[0].user_id }, secretKey, { expiresIn: '1h' });
  
        reply.send({ token });
      } else {
        reply.status(401).send({ error: 'Invalid credentials' });
      }
    } catch (err) {
      console.error('Error authenticating user:', err);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  };
  

  //GEt user profile PRIVATE
  const getUserProfile =  async (request, reply) => {
    try {

      //console.log(request.user);
      const user_id = request.user.id;

      //Find user
      const user = await client.execute(
        `SELECT * FROM  ${tableName} WHERE user_id = ? LIMIT 1`,
        [user_id]
      );

      if (user.rows.length === 0) {
        reply.status(404).send({ error: 'User not found' });
        return;
      }

       // Respond with user details (excluding sensitive information like password)
       const userDetails = {
        userId: user.rows[0].user_id.toString(),
        email: user.rows[0].email,
        name: user.rows[0].name,
      };
  
      reply.send(userDetails);
      
    } catch (err) {
      console.error('Error getting user details:', err);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  };
  


  module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
  }
  
