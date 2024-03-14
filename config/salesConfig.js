const cassandra = require('cassandra-driver')

const contactPoints =  ["node-0.aws-us-east-1.909a44fbc0cd27d8d497.clusters.scylla.cloud", "node-1.aws-us-east-1.909a44fbc0cd27d8d497.clusters.scylla.cloud", "node-2.aws-us-east-1.909a44fbc0cd27d8d497.clusters.scylla.cloud"];
const localDataCenter = 'AWS_US_EAST_1';
const credentials = {username: 'scylla', password: 'WmjhIotF1X8f9Aq'};
const keyspace = 'fastifybackend';
const tableName = 'sales';

const client = new cassandra.Client({ contactPoints, localDataCenter: localDataCenter, credentials: credentials, keyspace });
// Create a table if it doesn't exist 
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    salesId UUID PRIMARY KEY,
    productId UUID,
    quantity int,
    amount decimal,
    created_at timestamp,
    
  );
`;

client.connect()
  .then(() => client.execute(createTableQuery))
  .then(() => console.log('Sales Table connected to successfully'))
  .catch((err) => console.error('Error creating/connecting to sales table:', err));


  module.exports = client;