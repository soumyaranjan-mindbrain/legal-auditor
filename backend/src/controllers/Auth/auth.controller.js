const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const {transporter} = require("../../config/mailer");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/generateToken");

// ==========================================
// SEND TOKENS
// ==========================================
const sendTokens = async (res, user) => {
  const accessToken = generateAccessToken(user);    
  const refreshToken = generateRefreshToken(user);  

  user.refreshToken = refreshToken;
  await user.save();

  res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000, 
    })
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,  
    })
    .status(200)
    .json({
      msg: "Authentication successful",
      token: accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
};

// ==========================================
// REGISTER
// ==========================================
const register = async (req, res) => {
  try {
    let { name, email, password, phone, role, verifyEmail } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All required fields missing" });
    }

    const query = [{ email }];
    if (phone) query.push({ phone });

    const existingUser = await User.findOne({ $or: query });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (phone && existingUser.phone === phone) {
        return res.status(400).json({ error: "Phone number already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const allowedRoles = ["admin", "legal", "user"];
    let finalRole = "user";
    if (role && allowedRoles.includes(role.toLowerCase())) {
      finalRole = role.toLowerCase();
    }

    const isVerificationEnabled = verifyEmail === true;

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      role: finalRole,
      isVerified: !isVerificationEnabled, // If verification is disabled, user is active immediately
      verifyOTP: isVerificationEnabled ? otp : null,
      verifyOTPExpiry: isVerificationEnabled ? Date.now() + 10 * 60 * 1000 : null,
    });

    await newUser.save();

    if (isVerificationEnabled) {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Verify your email",
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
      <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; color: #333;">Email Verification</h2>
        <p style="text-align: center; color: #666; font-size: 15px;">Use the OTP below to verify your email address</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; font-size: 32px; letter-spacing: 8px; font-weight: bold; background: #f0f4ff; color: #2d5bff; padding: 15px 25px; border-radius: 8px;">${otp}</span>
        </div>
        <p style="text-align: center; color: #888; font-size: 13px;">This OTP will expire in <b>10 minutes</b>.</p>
      </div>
    </div>`
      });

      return res.status(201).json({
        msg: "Registered successfully. Verify your email.",
        verificationRequired: true
      });
    }

    // Auto login for Option 2 (Verification Disabled)
    await sendTokens(res, newUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// VERIFY EMAIL
// ==========================================
const verifyEmail = async (req, res) => {
  try {
    let { email, otp } = req.body;

    email = email?.trim().toLowerCase();

    const user = await User.findOne({
      email,
      verifyOTP: otp,
      verifyOTPExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.verifyOTP = null;
    user.verifyOTPExpiry = null;

    await user.save();

    res.json({ msg: "Email verified successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// RESEND OTP
// ==========================================
const resendOTP = async (req, res) => {
  try {
    let { email } = req.body;

    email = email?.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.verifyOTP = otp;
    user.verifyOTPExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Resend OTP",
 html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

      <h2 style="text-align: center; color: #333;">Email Verification</h2>

      <p style="text-align: center; color: #666; font-size: 15px;">
        Use the OTP below to verify your email address
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="
          display: inline-block;
          font-size: 32px;
          letter-spacing: 8px;
          font-weight: bold;
          background: #f0f4ff;
          color: #2d5bff;
          padding: 15px 25px;
          border-radius: 8px;
        ">
          ${otp}
        </span>
      </div>

      <p style="text-align: center; color: #888; font-size: 13px;">
        This OTP will expire in <b>10 minutes</b>. Do not share it with anyone.
      </p>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />

      <p style="text-align: center; font-size: 12px; color: #aaa;">
        If you didn’t request this, you can safely ignore this email.
      </p>

    </div>
  </div>
`
    });  

    res.json({ msg: "OTP resent" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// LOGIN
// ==========================================
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // If verification was enabled and user hasn't verified yet
    if (user.verifyOTP && !user.isVerified) {
      return res.status(403).json({ 
        error: "Verify your email first",
        verificationRequired: true 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    await sendTokens(res, user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// REFRESH TOKEN
// ==========================================
const refreshToken = async (req, res) => {
  try {
        console.log("Cookies:", req.cookies); 
    const token = req.cookies.refresh_token;

    if (!token) return res.status(401).json({ error: "No refresh token" });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    await sendTokens(res, user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// LOGOUT
// ==========================================
const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.refreshToken = "";
      await user.save();
    }

res.clearCookie("access_token");
res.clearCookie("refresh_token");
    res.json({ msg: "Logged out successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// GET ME
// ==========================================
const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
};

// ==========================================
// CHANGE PASSWORD
// ==========================================
const changePassword = async (req, res) => {
  try {
     const body = req.body;
    const oldPassword = body.oldPassword;
    const newPassword = body.newPassword;

     if (!oldPassword || !newPassword) {
      return res.status(400).json({
        error: "Old password and new password are required",
      });
    }

    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.password) {
      return res.status(500).json({ error: "User password missing in DB" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Old password incorrect" });
    }

    const isSame = await bcrypt.compare(newPassword, user.password);

    if (isSame) {
      return res.status(400).json({
        error: "New password cannot be same as old password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ msg: "Password changed successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
// ==========================================
// FORGOT PASSWORD
// ==========================================
const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    email = email?.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
     console.log(otp)
    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password OTP",
html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

      <h2 style="text-align: center; color: #333;">Email Verification</h2>

      <p style="text-align: center; color: #666; font-size: 15px;">
        Use the OTP below to verify your email address
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="
          display: inline-block;
          font-size: 32px;
          letter-spacing: 8px;
          font-weight: bold;
          background: #f0f4ff;
          color: #2d5bff;
          padding: 15px 25px;
          border-radius: 8px;
        ">
          ${otp}
        </span>
      </div>

      <p style="text-align: center; color: #888; font-size: 13px;">
        This OTP will expire in <b>10 minutes</b>. Do not share it with anyone.
      </p>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />

      <p style="text-align: center; font-size: 12px; color: #aaa;">
        If you didn’t request this, you can safely ignore this email.
      </p>

    </div>
  </div>
`
    });  
   

    res.json({ msg: "Reset OTP sent" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// RESET PASSWORD
// ==========================================
const resetPassword = async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;

    email = email?.trim().toLowerCase();
    otp = otp?.toString().trim();
  

    const user = await User.findOne({
      email,
     resetOTP: otp,
   resetOTPExpiry: { $gt: Date.now() },
    });
    console.log(user)

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;

    await user.save();

    return res.json({ msg: "Password reset successful" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// ==========================================
// UPDATE PROFILE
// ==========================================
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ error: "User not found" });
    
    if (name) user.name = name;
    await user.save();
    
    res.json({
      msg: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  verifyEmail,
  resendOTP,
  login,
  refreshToken,
  logout,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword,
  updateProfile,
};


 