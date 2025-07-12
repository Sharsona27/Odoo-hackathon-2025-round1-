const mongoose = require("mongoose");

// Import models
const User = require("./Models/UserModel");
const SwapRequest = require("./Models/SkillSwapRequestModel");
const Rating = require("./Models/RatingModel");

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mahima:2ehwgR1w48wnJOQc@skillswapdb.cadjhjl.mongodb.net/?retryWrites=true&w=majority&appName=SkillSwapDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to SkillSwap MongoDB Database");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Create collections and indexes
const setupCollections = async () => {
  try {
    console.log("\n🔧 Setting up database collections...");

    // 1. Users Collection
    console.log("📝 Setting up Users collection...");
    await User.createCollection();
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ mobile: 1 });
    await User.collection.createIndex({ location: 1 });
    console.log("✅ Users collection ready");

    // 2. Swap Requests Collection
    console.log("🔄 Setting up Swap Requests collection...");
    await SwapRequest.createCollection();
    await SwapRequest.collection.createIndex({ requesterId: 1 });
    await SwapRequest.collection.createIndex({ recipientId: 1 });
    await SwapRequest.collection.createIndex({ status: 1 });
    await SwapRequest.collection.createIndex({ createdAt: 1 });
    console.log("✅ Swap Requests collection ready");

    // 4. Ratings Collection
    console.log("⭐ Setting up Ratings collection...");
    await Rating.createCollection();
    await Rating.collection.createIndex({ swapId: 1 });
    await Rating.collection.createIndex({ raterId: 1 });
    await Rating.collection.createIndex({ ratedUserId: 1 });
    await Rating.collection.createIndex({ createdAt: 1 });
    console.log("✅ Ratings collection ready");

    console.log("\n🎉 Database setup completed successfully!");
    console.log("\n📊 Collections created:");
    console.log("   • users");
    console.log("   • swaprequests");
    console.log("   • ratings");

  } catch (error) {
    console.error("❌ Error setting up collections:", error);
  }
};

// Check database status
const checkDatabaseStatus = async () => {
  try {
    console.log("\n📊 Database Status Check:");
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Total collections: ${collections.length}`);
    
    collections.forEach(collection => {
      console.log(`   • ${collection.name}`);
    });

    // Check document counts
    const userCount = await User.countDocuments();
    const swapCount = await SwapRequest.countDocuments();
    const ratingCount = await Rating.countDocuments();

    console.log("\n📈 Document counts:");
    console.log(`   • Users: ${userCount}`);
    console.log(`   • Swap Requests: ${swapCount}`);
    console.log(`   • Ratings: ${ratingCount}`);

  } catch (error) {
    console.error("❌ Error checking database status:", error);
  }
};

// Main execution
const main = async () => {
  await connectDB();
  await setupCollections();
  await checkDatabaseStatus();
  
  console.log("\n✨ SkillSwap Database is ready!");
  console.log("🚀 You can now run the seed scripts to populate the database.");
  
  mongoose.connection.close();
  console.log("🔌 Database connection closed");
};

main().catch(console.error); 