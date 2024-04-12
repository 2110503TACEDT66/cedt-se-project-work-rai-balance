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
      enum: ["-1", "+2", "+1"]
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
