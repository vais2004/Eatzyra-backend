const { initializeDatabase } = require("./db/db.connect");
const { FoodItem } = require("./models/food.models");

const removeOptionIds = async () => {
  try {
    await initializeDatabase();

    // Fetch all documents
    const foodItems = await FoodItem.find({});

    for (const item of foodItems) {
      // Check if any option has _id
      const hasOptionId = item.options.some(opt => opt._id);
      if (hasOptionId) {
        // Remove _id from each option
        item.options = item.options.map(({ _id, ...rest }) => rest);
        await item.save(); // Save the cleaned document
      }
    }

    console.log("✅ Removed _id from options in all documents");
    process.exit();
  } catch (err) {
    console.error("❌ Error cleaning up:", err);
    process.exit(1);
  }
};

removeOptionIds();
