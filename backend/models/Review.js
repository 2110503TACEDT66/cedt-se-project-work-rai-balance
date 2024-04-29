const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const ReviewSchema = new mongoose.Schema({
  coworking: {
    type: mongoose.Schema.ObjectId,
    ref: "Coworking",
    required: true,
  },
  reservation: {
    type: mongoose.Schema.ObjectId,
    ref: "Reservation",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  approval: {
    type: String,
    enum: ["pending", "approved", "disapproved"],
    default: "pending",
  },
  rating: {
    type: Number,
    default: null,
  },
  comment: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
