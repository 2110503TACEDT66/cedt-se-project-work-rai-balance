const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
   {
      coworking: {
         type: mongoose.Schema.ObjectId,
         ref: "Coworking",
         required: true,
       },
      reservation:{
         type: mongoose.Schema.ObjectId,
         ref: "Reservation",
         required: true,
      },
     user: {
         type: mongoose.Schema.ObjectId,
         ref: "User",
         required: true,
       },
     rating: {
       type: Number,
       required: false,
       default: 0,
     },
     comment: {
       type: String,
       required: false
     },
     updatedAt: {
         type: Date,
         default: Date.now,
       },
   },
 );
 
 module.exports = mongoose.model("Review", ReviewSchema);