const cassandra = require('cassandra-driver');

const contactPoints =  ["node-0.aws-us-east-1.909a44fbc0cd27d8d497.clusters.scylla.cloud", "node-1.aws-us-east-1.909a44fbc0cd27d8d497.clusters.scylla.cloud", "node-2.aws-us-east-1.909a44fbc0cd27d8d497.clusters.scylla.cloud"];
const localDataCenter = 'AWS_US_EAST_1';
const credentials = {username: 'scylla', password: 'WmjhIotF1X8f9Aq'};
const keyspace = 'fastifybackend';
const tableName = 'users';

const client = new cassandra.Client({ contactPoints, localDataCenter: localDataCenter, credentials: credentials, keyspace });


// Create a table if it doesn't exist 
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    user_id UUID PRIMARY KEY,
    name text,
    email text,
    password text,
    created_At timestamp,
    updated_At timestamp,   
  );
`;

client.connect()
  .then(() => client.execute(createTableQuery))
  .then(() => console.log('Users Table connected to successfully'))
  .catch((err) => console.error('Error creating/connecting to users table:', err));



  module.exports = client;