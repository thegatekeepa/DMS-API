const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const callMongo = await mongoose.connect(process.env.MONGO_URI);
    console.log(
        "DMS Server is now connected to MongoDB."
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;