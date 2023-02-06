const {MongoClient} = require('mongodb')

const url = "mongodb://127.0.0.1:27017"
var client = new MongoClient(url);
// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  console.log('start connect')
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}
module.exports = {
    main: main
}