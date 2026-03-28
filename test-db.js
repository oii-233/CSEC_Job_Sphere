import mongoose from 'mongoose';

const uri = "mongodb+srv://imanibbb544_db_user:Akxo8xMwLLsNzXEP@cluster0.wchujiq.mongodb.net/?appName=Cluster0";

console.log("Connecting...");
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("Connected. Testing query...");
    const User = mongoose.model('User', new mongoose.Schema({ name: String }));
    return User.findOne({}).maxTimeMS(3000);
  })
  .then((res) => {
    console.log("Query success:", res);
    process.exit(0);
  })
  .catch(err => {
    console.error("DB Error:", err.message);
    process.exit(1);
  });
