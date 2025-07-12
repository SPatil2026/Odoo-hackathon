import User from "../models/user.models.js";

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export default isAdmin;