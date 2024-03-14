const cassandra = require('cassandra-driver');
const dotenv = require('dotenv');

dotenv.config();
const contactPoints = [process.env.CONTACT_POINTS];
const localDataCenter = process.env.DATA_CENTER;
const credentials = {username: process.env.USERNAME, password: process.env.PASSWORD};
const keyspace = process.env.KEYSPACE;
const tableName = 'products';





const client = new cassandra.Client({ contactPoints, localDataCenter: localDataCenter, credentials: credentials, keyspace });

// Create a table if it doesn't exist (similar to your createTable.js script)
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id UUID PRIMARY KEY,
    name text,
    image text,
    category text,
    description text,
    rating int,
    price int,
    created_at timestamp,
    updated_at timestamp
  );
`;

client.connect()
  .then(() => client.execute(createTableQuery))
  .then(() => console.log('Product table connected to successfully'))
  .catch((err) => console.error('Error creating table:', err));


module.exports = client;
