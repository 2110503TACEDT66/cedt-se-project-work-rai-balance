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
      // console.log('Time: ' + Date.now());

      const now = new Date().toISOString();
      console.log('Time: ' + now);

      const endReservation = reservation.apptDate.toISOString().split('T')[0] + 'T' + reservation.end + '.000Z';

      if (endReservation > now) {
        return res.status(400).json({
          success: false,
          message: `The user cannot make review before due time`,
        });
      }

      // if (reservation.apptDate > Date.now().split('T')[0])
      // {
        
      // }
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
        approval,
        rating: req.body.rating,
        comment: req.body.comment
      });

      const reservationHasReview = await Reservation.findByIdAndUpdate(req.params.reservationId, { hasReview: "pending"})

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

//desc    Update reservation
//route   PUT /api/project/reviews/:Id
//access  Private
exports.updateReview = async (req, res, next) => {
  try{
    if (req.body.approval) {
      return res
        .status(400)
        .json({ success: false, message: "Can not change approval" });
    }
    let review = await Review.findById(req.params.id);

    let reservation = await Reservation.findById(review.reservation);

    let coworking = await Coworking.findById(review.coworking);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: `No review with the id of ${req.params.id}`,
      });
    }

    if (
      review.user.toString() !== req.user.id 
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this reservation`,
      });
    }

    if (review.approval == "approved") {
      return res.status(401).json({
        success: false,
        message: `Your review has already been approved and you cannot make changes`,
      });
    }

    if (review.approval == "disapproved") {
      return res.status(401).json({
        success: false,
        message: `Your review has already been disapproved and you cannot make changes`,
      });
    }


    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: review,
    });
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

    review = await Review.findByIdAndUpdate(req.params.id, {approval: req.body.approval}, {
      new: true,
      runValidators: true,
    });

    reservation = await Reservation.findByIdAndUpdate(review.reservation, {hasReview: req.body.approval}, {
      new: true,
      runValidators: true,
    });

    const user = await User.findById(review.user);

    if (req.body.approval == "approved") {
      const point = await Point.create({
        user: user,
        updatedPoint: user.currentPoint+2,
        change: "Add 2",
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

exports.getAllReviews = async (req, res, next) => {
  try{
    

  }catch(err){
      console.log(err.stack);
      return res.status(500).json({
        success: false,
        message: "Cannot update Review",
      });
  }
}

//desc    GET review by reservationId
//route   GET /api/project/reservations/:reservationId/review
//access  Private
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ reservation: req.params.reservationId });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: `No review found for reservation with the id of ${req.params.reservationId}`,
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    console.error(err.stack);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve review",
    });
  }
}