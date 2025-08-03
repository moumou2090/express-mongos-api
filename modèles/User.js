const mongoose = require("mongoose");

// تعريف مخطط المستخدم (Schema)
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
});

// تصدير الموديل
module.exports = mongoose.model("User", userSchema);
