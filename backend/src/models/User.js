const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
     type: String,
      default: ""
     },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,   
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "legal", "user"],
    default: "user",
  },

  bio: { 
    type: String, 
    default: "" 
  },
  profilePic: { 
    type: String,
     default: ""
     },
  course: { 
    type: String, 
    default: "" 
  },
  status: { 
    type: String,
     default: "Active"
     },
  github: { 
    type: String,
     default: "" 
    },
  linkedin: { 
    type: String, 
    default: "" 
  },

  // ==========================================
  //   AUTH
  // ==========================================
  refreshToken: {
     type: String, 
     default: "" 
    },

  // ==========================================
  //   EMAIL VERIFICATION (NEW)
  // ==========================================
  isVerified: {
    type: Boolean,
    default: false,
  },

  verifyOTP: {
    type: String,
    default: null,
  },

  verifyOTPExpiry: {
    type: Date,
    default: null,
  },

  // ==========================================
  //  PASSWORD RESET
  // ==========================================
  resetOTP: { 
    type: String, 
    default: null 
  },
  resetOTPExpiry: {
     type: Date, 
     default: null 
    },
    
// ==========================================
// USER PREFERENCES 
// ==========================================
preferences: {
  theme: {
    type: String,
    default: "dark"
  },
  notifications: {
    type: Boolean,
    default: true
  }
}
}, 
{
  timestamps: true,
  collection: "User",
});

module.exports = mongoose.model("User", userSchema);