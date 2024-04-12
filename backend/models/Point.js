const mongoose = require("mongoose");

const PointSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    updatedPoint: {
      type: Number,
      // required: false,
      default: 0,
    },
    change: {
      type: String,
      enum: ["-1", "+2"],
      default: "+2",
    },
    updatedAt: {
        type: Date,
        default: Date.now,
      },
  },
);

module.exports = mongoose.model("Point", PointSchema);
