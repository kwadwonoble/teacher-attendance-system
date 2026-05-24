const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// GENERATE TOKEN

const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

};

// REGISTER

const register = async (req, res) => {

  try {

    const { email, password } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const user = await User.create({
      email,
      password,
    });

    res.status(201).json({

      _id: user._id,

      email: user.email,

      token: generateToken(user._id),

    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// LOGIN

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await user.matchPassword(password))
    ) {

      res.json({

        _id: user._id,

        email: user.email,

        token: generateToken(user._id),

      });

    } else {

      res.status(401).json({
        message: "Invalid credentials",
      });

    }

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// FORGOT PASSWORD

const forgotPassword = async (
  req,
  res
) => {

  try {

    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    // TOKEN

    const resetToken =
      crypto.randomBytes(32).toString(
        "hex"
      );

    user.resetPasswordToken =
      resetToken;

    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    // RESET URL

    const resetURL =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // MAIL TRANSPORT

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,

        },

      });

    // SEND EMAIL

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: user.email,

      subject: "Password Reset",

      html: `

        <h2>Password Reset</h2>

        <p>
          Click the button below to reset your password.
        </p>

        <a href="${resetURL}">
          Reset Password
        </a>

      `,

    });

    res.json({
      message: "Reset email sent",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// RESET PASSWORD

const resetPassword = async (
  req,
  res
) => {

  try {

    const user = await User.findOne({

      resetPasswordToken:
        req.params.token,

      resetPasswordExpire: {
        $gt: Date.now(),
      },

    });

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid or expired token",
      });

    }

    user.password = req.body.password;

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    await user.save();

    res.json({
      message:
        "Password reset successful",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {

  register,

  login,

  forgotPassword,

  resetPassword,

};