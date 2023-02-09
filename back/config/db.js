const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(console.log("MongoDB connected"));
  } catch (err) {
    console.error(err.message);
    process.exit(84);
  }
};

module.exports = connectDB;
