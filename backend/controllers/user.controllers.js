// controllers/user.controller.js
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
// Helper to create and send token
const sendToken = (user, res, message, statusCode = 200) => {
  const token = jwt.sign(
    { userId: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      success: true,
      message,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        points: user.points,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
      },
    });
};


// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password.",
      });
    }

    // Validate role
    const allowedRoles = ["customer", "admin"];
    const userRole = allowedRoles.includes(role) ? role : "customer";

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    sendToken(user, res, "Registered successfully", 201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    sendToken(user, res, "Logged in successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Logout
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .json({ success: true, message: "Logged out successfully." });
};



export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (req.file) {
      // If user had an old avatar, remove it from Cloudinary
      if (user.avatar && user.avatar.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      // Upload new avatar
      const result = await cloudinary.uploader.upload_stream(
        {
          folder: "avatars",
          resource_type: "image",
        },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({
              success: false,
              message: "Avatar upload failed.",
            });
          }

          user.avatar = {
            public_id: result.public_id,
            url: result.secure_url,
          };

          await user.save();

          return res.json({
            success: true,
            message: "Profile updated successfully.",
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              points: user.points,
              isAdmin: user.isAdmin,
            },
          });
        }
      );

      // Pipe the buffer to Cloudinary stream
      const stream = result;
      stream.end(req.file.buffer);
      return;
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        points: user.points,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

