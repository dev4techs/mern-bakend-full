const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/');
  console.log("MongoDb Connected");
}