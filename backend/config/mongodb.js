const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    // await mongoose.connect(
    //   `mongodb+srv://Uzair:uzair234567@cluster0.00ujx.mongodb.net/`
    // );
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB cluster connected.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = {
  connectToMongoDB,
};
