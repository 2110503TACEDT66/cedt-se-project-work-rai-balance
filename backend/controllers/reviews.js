const Coworking = require("../models/Coworking");
const Reservation = require("../models/Reservation");
const Review = require("../models/Review")
const Point = require("../models/Point");
const User = require("../models/User");

//desc    Add reveiw
//route   POST /api/project/reservation/:reservationId/reviews
//access  Private
exports.addReview = async (req, res, next) => {
   try{
      req.body.reservation = req.params.reservationId;
      
      const reservation = await Reservation.findById(req.params.reservationId);
      console.log(req.params.reservationId);
      
      if (!reservation) {
         return res.status(404).json({
           message: `No Reservation with the id of ${req.params.reservationId}`,
         });
       }
      
      req.body.user = reservation.user;

      req.body.coworking = reservation.coworking;

      const coworking = await Coworking.findById(req.body.coworking)
      if (!reservation) {
        return res.status(404).json({
          message: `No coworking with the id of ${req.body.coworking}`,
        });
      }
      //Check count of review
      const existedReview = await Review.find({ user: req.body.user });
      // the user can only create 3 review
        if (existedReview.length >= 1) {
          return res.status(400).json({
            success: false,
            message: `The user with ID ${req.user.id} has already made 1 review`,
          });
        }

      const review = await Review.create(req.body);

      // const user = await User.findById(req.user.id);
      res.status(201).json({
         success: true,
         data: review,
       });
   }catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot create Review",
    });
  }
}

exports.updateReview = async (req, res, next) => {
  try{
    

  }catch(err){
      console.log(err.stack);
      return res.status(500).json({
        success: false,
        message: "Cannot update Review",
      });
  }
}