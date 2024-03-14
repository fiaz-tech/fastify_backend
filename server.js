const fastify = require('fastify')({logger: true});
fastify.register(require('@fastify/websocket'));
fastify.register(require('@fastify/auth'));

fastify.register(require('./routes/productRoutes'));
fastify.register(require('./routes/salesRoutes'));
fastify.register(require('./routes/userRoutes'));


fastify.register(require('@fastify/cors'));


require('dotenv').config();

// WebSocket route
fastify.get('/ws', { websocket: true }, (connection, req) => {
  // `connection.socket` is the WebSocket instance
  console.log('Client connected');


  // Listen for messages from the client
  connection.socket.on('message', (message) => {
    console.log('Received message:', message);

    // Send a response back to the client
    connection.socket.send('Hello from the server!');
  });

  // Listen for the WebSocket connection closing
  connection.socket.on('close', (code, reason) => {
    console.log('Connection closed:', code, reason);
  });
});

//fastify.listen({ port: 8000 }, (err) => {if (err) throw err });


// Implementing Clusters
const cluster = require('node:cluster');

const numCPUs = require('node:os').availableParallelism();

const process = require('node:process');


if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection and work
  // In this case it is a Fastify server

  //const PORT = 3001;

  fastify.listen({ port: 8000 }, (err) => {if (err) throw err });
    

  console.log(`Worker ${process.pid} started`);
}

