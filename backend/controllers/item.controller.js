import Item from "../models/item.models.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.models.js";

/**
 * Add New Item
 */
export const addItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required.",
      });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "items",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      uploadedImages.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const item = await Item.create({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      images: uploadedImages,
      uploader: req.id, // from isAuthenticated middleware
    });

    res.status(201).json({
      success: true,
      message: "Item submitted successfully and awaiting approval.",
      item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * Get All Items
 */
export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ approved: true, status: "available" })
      .populate("uploader", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * Get Single Item
 */
export const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("uploader", "name email role");
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }
    res.json({
      success: true,
      item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * Approve Item (Admin)
 */
export const approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    item.approved = true;
    await item.save();

    res.json({
      success: true,
      message: "Item approved successfully.",
      item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * Reject (Delete) Item (Admin)
 */
export const rejectItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    // Delete images from Cloudinary
    for (const image of item.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await item.deleteOne();

    res.json({
      success: true,
      message: "Item rejected and removed.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * Delete Item (Uploader or Admin)
 */
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    // Allow uploader or admin to delete
    const user = await User.findById(req.id);
    if (item.uploader.toString() !== req.id && user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this item.",
      });
    }

    // Delete images from Cloudinary
    for (const image of item.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await item.deleteOne();

    res.json({
      success: true,
      message: "Item deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
