const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    apptDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    coworking: {
      type: mongoose.Schema.ObjectId,
      ref: "Coworking",
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    hasReview: {
      type: String,
      enum: ["no", "pending", "approved", "disapproved"],
      default: "no",
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ReservationSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(`Review begins removed from reesrvation ${this._id}`);
    await this.model("Review").deleteMany({ reservation: this._id });
    console.log("Remove successfully");
    next();
  }
);

// Reverse populate with virtuals
ReservationSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "reservation",
  justOne: false,
});
module.exports = mongoose.model("Reservation", ReservationSchema);
