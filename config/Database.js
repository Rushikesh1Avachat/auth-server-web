const { default: mongoose } = require("mongoose");

const dbUrl = process.env.DB_URL; // ❌ remove localhost for production

exports.dbConnect = async () => {
  try {
    if (!dbUrl) {
      throw new Error("DB_URL is not defined");
    }

    await mongoose.connect(dbUrl);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // 🔥 stop app if DB fails
  }
};
