const mongoose = require("mongoose");
const { message } = require("statuses");

const PointSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    updatedPoint: {
      type: Number,
      required: false
    },
    change: {
      type: String,
      enum: ["Deduct 1", "Add 2", "Add 1", "Deduct 2"]
    },
    message: {
      type: String,
      required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
      },
  },
);

module.exports = mongoose.model("Point", PointSchema);
