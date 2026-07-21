import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All filed are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (password.length < 8) {
      console.log(password.length);

      return res.status(400).json({
        success: false,
        message: "Password must be atleat 8 characters",
      });
    }

    const existingUserByEmail = await User.findOne({ email: normalizedEmail });
    if (existingUserByEmail)
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      normalizedEmail,
      password: hashPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account created sucessfully ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Inavlid credentials",
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user = user.toObject();
    delete user.password;

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: `Welcome back ${user.firstName}`,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", " ", { maxAge: 0 }).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: false,
      message: error.message,
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const {firstName, lastName,occupation,bio,instagram,facebook,github,linkedin} = req.body
    const file = req.file;

    let photoUrl;
    if(file){
      const fileUri = getDataUri(file)
      const cloundResponse = await cloudinary.uploader.upload(fileUri)
      photoUrl = cloundResponse.secure_url;
    }

    const user = await User.findById(userId).select("-password")
    if(!user){
      return res.status(404).json({
        message:"User not found",
        success:false,
      })
    }

    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    if(occupation) user.occupation = occupation
    if(instagram) user.instagram = instagram
    if(facebook) user.facebook = facebook
    if(linkedin) user.linkedin = linkedin
    if(github) user.github = github
    if(bio) user.bio = bio
    if(file) user.photoUrl = photoUrl

    await user.save()
    return res.status(200).json({
      message:"Profile updated succesfully",
      success:true,
      user
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"Failed to update profile",
      success:false,
    })
  }
};