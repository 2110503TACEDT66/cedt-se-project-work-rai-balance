const Coworking = require("../models/Coworking");
const Reservation = require("../models/Reservation");
const Review = require("../models/Review")
const Point = require("../models/Point");
const User = require("../models/User");

//desc    Add review
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

      const existedReview = await Review.find({ reservation: req.params.reservationId });

      // can only create 1 review per reservation
      if (existedReview.length >= 1) {
        return res.status(400).json({
          success: false,
          message: `The user has already made a review for reservation ${req.body.reservation}`,
        });
      }
      //Check count of review
      // const existedReview = await Review.find({ user: req.body.user });
      // the user can only create 3 review
        // if (existedReview.length >= 1) {
        //   return res.status(400).json({
        //     success: false,
        //     message: `The user with ID ${req.user.id} has already made 1 review`,
        //   });
        // }

      const review = await Review.create({
        coworking: req.body.coworking,
        reservation: req.params.reservationId,
        user: req.user.id,
        approved : false,
        passed : false,
        rating: req.body.rating,
        comment: req.body.comment
      });

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

exports.approveReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: `No review with the id of ${req.params.id}`,
      });
    }

    //Make sure user is the reservation owner
    if (
      // review.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to approve this review`,
      });
    }

    review = await Review.findByIdAndUpdate(req.params.id, {approved: true, passed: req.body.passed}, {
      new: true,
      runValidators: true,
    });

    const user = await User.findById(review.user);

    if (req.body.passed == true) {
      const point = await Point.create({
        user: user,
        updatedPoint: user.currentPoint+2,
        change: "+2",
        message: "Your review has been approved"
      })
  
      const user1 = await User.findByIdAndUpdate(user, {currentPoint: point.updatedPoint}, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot approve",
    });
  }
}

exports.getUnapprovedReviews = async (req, res, next) => {
  try{
    

  }catch(err){
      console.log(err.stack);
      return res.status(500).json({
        success: false,
        message: "Cannot update Review",
      });
  }
}