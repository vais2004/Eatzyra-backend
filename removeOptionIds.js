const { initializeDatabase } = require("./db/db.connect");
const { FoodItem } = require("./models/food.models");

const removeOptionIds = async () => {
  try {
    await initializeDatabase();

    // Remove `_id` from each object inside `options` array
    const result = await FoodItem.updateMany(
      {},
      { $unset: { "options.$[elem]._id": "" } },
      { arrayFilters: [{ "elem._id": { $exists: true } }] }
    );

    console.log(`✅ Removed _id from options in ${result.modifiedCount} documents`);
    process.exit();
  } catch (error) {
    console.error("❌ Error cleaning up:", error);
    process.exit(1);
  }
};

removeOptionIds();
