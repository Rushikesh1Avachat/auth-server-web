const { default: mongoose } = require("mongoose");

exports.dbConnect = async () => {
  try {
    const dbUrl = process.env.DB_URL; // ✅ read at runtime

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

