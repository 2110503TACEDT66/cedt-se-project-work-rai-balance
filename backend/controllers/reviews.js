const Coworking = require("../models/Coworking");
const Reservation = require("../models/Reservation");
const Review = require("../models/Review");
const Point = require("../models/Point");
const User = require("../models/User");

//desc    Add review
//route   POST /api/project/reservation/:reservationId/reviews
//access  Private
exports.addReview = async (req, res, next) => {
  try {
    req.body.reservation = req.params.reservationId;

    const reservation = await Reservation.findById(req.params.reservationId);
    console.log(req.params.reservationId);

    if (req.user.role === "banned user") {
      return res.status(404).json({
        success: false,
        message: `You are banned`,
      });
    }

    if (!reservation) {
      return res.status(404).json({
        message: `No Reservation with the id of ${req.params.reservationId}`,
      });
    }

    req.body.user = reservation.user;

    req.body.coworking = reservation.coworking;

    const coworking = await Coworking.findById(req.body.coworking);
    if (!reservation) {
      return res.status(404).json({
        message: `No coworking with the id of ${req.body.coworking}`,
      });
    }

    const existedReview = await Review.find({
      reservation: req.params.reservationId,
    });

    // Can only create 1 review per reservation
    if (existedReview.length >= 1) {
      return res.status(400).json({
        success: false,
        message: `The user has already made a review for reservation ${req.body.reservation}`,
      });
    }

    const now = new Date().toISOString();
    // console.log("Now: " + now);
    const endReservationBangkok = new Date(reservation.apptDate.toISOString().split("T")[0] + "T" + reservation.end + ".000Z");
    // console.log("End: " + endReservationBangkok);
    const endReservationUTC7 = new Date(endReservationBangkok.getTime() - 7 * 60 * 60 * 1000);
    // console.log("End: " + endReservationUTC7);
    const endReservationUTC7ISO = endReservationUTC7.toISOString();
    // console.log("End: " + endReservationUTC7ISO);

    if (endReservationUTC7ISO > now) {
      return res.status(400).json({
        success: false,
        message: `The user cannot make review before due time`,
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

    if (req.body.rating === null || req.body.rating === undefined) {
      return res.status(400).json({
        success: false,
        message: `Review rating must be included.`,
      });
    }

    const review = await Review.create({
      coworking: req.body.coworking,
      reservation: req.params.reservationId,
      user: req.user.id,
      approval: "pending",
      rating: req.body.rating,
      comment: req.body.comment,
    });

    const reservationHasReview = await Reservation.findByIdAndUpdate(
      req.params.reservationId,
      { hasReview: "pending" }
    );

    // const user = await User.findById(req.user.id);
    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot create Review",
    });
  }
};

//desc    Update review
//route   PUT /api/project/reviews/:Id
//access  Private
exports.updateReview = async (req, res, next) => {
  try {
    if (req.user.role === "banned user") {
      return res.status(404).json({
        success: false,
        message: `You are banned`,
      });
    }

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

    if (review.user.toString() !== req.user.id) {
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
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot update Review",
    });
  }
};

//desc    Update review's approval field
//route   PUT /api/project/reviews/:Id/approve
//access  Private
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
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to approve this review`,
      });
    }

    if (review.approval == "pending" || review.approval == "disapproved") {
      review = await Review.findByIdAndUpdate(
        req.params.id,
        { approval: req.body.approval },
        {
          new: true,
          runValidators: true,
        }
      );

      const reservation = await Reservation.findByIdAndUpdate(
        review.reservation,
        { hasReview: req.body.approval },
        {
          new: true,
          runValidators: true,
        }
      );

      const user = await User.findById(review.user);

      if (req.body.approval == "approved") {
        const point = await Point.create({
          user: user,
          updatedPoint: user.currentPoint + 2,
          change: "Add 2",
          message: "Your review has been approved",
        });

        const user1 = await User.findByIdAndUpdate(
          user,
          { currentPoint: point.updatedPoint },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    } else if (
      review.approval == "approved" &&
      req.body.approval == "disapproved"
    ) {
      review = await Review.findByIdAndUpdate(
        req.params.id,
        { approval: req.body.approval },
        {
          new: true,
          runValidators: true,
        }
      );

      const reservation = await Reservation.findByIdAndUpdate(
        review.reservation,
        { hasReview: req.body.approval },
        {
          new: true,
          runValidators: true,
        }
      );

      const user = await User.findById(review.user);
      let userPoint = user.currentPoint - 2;
      if (userPoint < 0) {
        userPoint = 0;
      }

      const point = await Point.create({
        user: user,
        updatedPoint: userPoint,
        change: "Deduct 2",
        message: "Your review has been changed from approved to disapproved",
      });

      const user1 = await User.findByIdAndUpdate(
        user,
        { currentPoint: point.updatedPoint },
        {
          new: true,
          runValidators: true,
        }
      );
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
};

//desc GET review by reviewId
//route GET /api/project/reviews/:reviewId
//access Private
exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: `No review with the id of ${req.params.id}`,
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
      message: "Cannot find review",
    });
  }
};

// //desc    GET review by reservationId
// //route   GET /api/project/reservations/:reservationId/reviews
// //access  Private
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({
      reservation: req.params.reservationId,
    });

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
      message: "Cannot get review",
    });
  }
};

//desc    Get all reviews
//route   POST /api/project/reviews/all
//access  Private
exports.getReviews = async (req, res, next) => {
  try {
    let query;
    if (!req.body.approval) {
      query = Review.find().sort({ approval: -1 });
    } else if (req.body.approval == "pending") {
      query = Review.find({ approval: "pending" });
    } else if (req.body.approval == "approved") {
      query = Review.find({ approval: "approved" });
    } else if (req.body.approval == "disapproved") {
      query = Review.find({ approval: "disapproved" });
    }

    const reviews = await query;

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.error(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot get reviews",
    });
  }
};

//desc    GET reviews by coworkingId
//route   GET /api/project/coworkings/:coworkingId/reviews/all
//access  Private
exports.getReviewsByCoworking = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      coworking: req.params.coworkingId,
      approval: "approved",
    });

    if (!reviews) {
      return res.status(404).json({
        success: false,
        message: `No review found for coworking with the id of ${req.params.coworkingId}`,
      });
    }

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.error(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot get reviews",
    });
  }
};
