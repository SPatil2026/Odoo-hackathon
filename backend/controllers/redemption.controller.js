import Redemption from "../models/redeem.models.js";
import Item from "../models/item.models.js";
import User from "../models/user.models.js";

/**
 * Redeem an item with points
 */
export const redeemItem = async (req, res) => {
  try {
    const { itemId } = req.body;

    const item = await Item.findById(itemId);
    if (!item || !item.approved || item.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Item is not available for redemption.",
      });
    }

    const user = await User.findById(req.id);

    const pointsRequired = 50; // Example fixed cost—adjust as needed
    if (user.points < pointsRequired) {
      return res.status(400).json({
        success: false,
        message: "You do not have enough points to redeem this item.",
      });
    }

    // Create redemption
    const redemption = await Redemption.create({
      user: user._id,
      item: item._id,
      pointsUsed: pointsRequired,
    });

    // Deduct points
    user.points -= pointsRequired;
    await user.save();

    // Mark item as redeemed
    item.status = "redeemed";
    await item.save();

    res.status(201).json({
      success: true,
      message: "Item redeemed successfully.",
      redemption,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * Cancel a redemption
 */
export const cancelRedemption = async (req, res) => {
  try {
    const redemption = await Redemption.findById(req.params.id).populate("item");

    if (!redemption) {
      return res.status(404).json({
        success: false,
        message: "Redemption not found.",
      });
    }

    if (redemption.user.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this redemption.",
      });
    }

    if (redemption.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Redemption cannot be cancelled.",
      });
    }

    // Refund points
    const user = await User.findById(req.id);
    user.points += redemption.pointsUsed;
    await user.save();

    // Mark item as available again
    redemption.item.status = "available";
    await redemption.item.save();

    redemption.status = "cancelled";
    await redemption.save();

    res.json({
      success: true,
      message: "Redemption cancelled and points refunded.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
