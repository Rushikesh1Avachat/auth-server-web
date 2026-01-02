const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL is not defined");
    }

    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
