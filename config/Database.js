const { default: mongoose } = require("mongoose");

// ❌ DO NOT fallback to localhost on Render
const dbUrl = process.env.DB_URL;

exports.dbConnect = async () => {
  try {
    if (!dbUrl) {
      throw new Error("DB_URL is not defined");
    }

    await mongoose.connect(dbUrl);

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // 🔥 REQUIRED for Render
  }
};
