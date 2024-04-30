const Coworking = require("../models/Coworking");
const Point = require("../models/Point");
const Reservation = require("../models/Reservation");
const User = require("../models/User");

//desc    Get All reservations
//route   Get /api/project/reservations
//access  Public
exports.getReservations = async (req, res, next) => {
  let query;

  // General users can see only their appointment
  if (req.user.role !== "admin") {
    query = Reservation.find({ user: req.user.id }).populate({
      path: "coworking",
      select: "name province tel",
    });
  } else {
    // If you are an admin, you can see all
    if (req.params.coworkingId) {
      console.log(req.params.coworkingId);
      query = Reservation.find({ coworking: req.params.coworkingId }).populate({
        path: "coworking",
        select: "name province tel",
      });
    } else {
      query = Reservation.find().populate({
        path: "coworking",
        select: "name province tel",
      });
    }
  }

  try {
    const reservations = await query;
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot find Appointment",
    });
  }
};

//desc    Get single reservation
//route   Get /api/project/reservations/:id
//access  Public
exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate({
      path: "coworking",
      select: "name description tel",
    });
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot find Reservation",
    });
  }
};

//desc    Add reservation
//route   POST /api/project/:coworkingId/reservations
//access  Private
exports.addReservation = async (req, res, next) => {
  try {
    req.body.coworking = req.params.coworkingId;

    const coworking = await Coworking.findById(req.params.coworkingId);

    if (req.user.role === "banned user") {
      return res.status(404).json({
        success: false,
        message: `You are banned`,
      });
    }

    if (!coworking) {
      return res.status(404).json({
        success: false,
        message: `No coworking with the id of ${req.params.coworkingId}`,
      });
    }

    // add user Id to req.body
    req.body.user = req.user.id;

    //Check for existed appointment
    // const existedReservations = await Reservation.find({ user: req.user.id });

    //If the user is not an admin, they can only create 3 appointment
    // if (existedReservations.length >= 3 && req.user.role !== "admin") {
    //   return res.status(400).json({
    //     success: false,
    //     message: `The user with ID ${req.user.id} has already made 3 appointments`,
    //   });
    // }

    const now = new Date().toISOString();
    // console.log("Now: " + now);

    // Get the startReservation time in Bangkok timezone
    const startReservationBangkok = new Date(req.body.apptDate.split("T")[0] + "T" + req.body.start + ".000Z");

    // Adjust the startReservation time to UTC+7 by subtracting 7 hours
    const startReservationUTC7 = new Date(startReservationBangkok.getTime() - 7 * 60 * 60 * 1000);

    // Convert startReservationUTC7 to ISO string
    const startReservationUTC7ISO = startReservationUTC7.toISOString();
    // console.log("Start: " + startReservationUTC7ISO);

    if (startReservationUTC7ISO < now) {
      return res.status(401).json({
        success: false,
        message: "Please make a reservation that starts after the current time",
      });
    }

    if (
      req.body.start.localeCompare(coworking.opentime) < 0 ||
      req.body.end.localeCompare(coworking.closetime) > 0
    ) {
      return res.status(400).json({
        success: false,
        message: `Please make reservation within ${coworking.opentime} and ${coworking.closetime}`,
      });
    }

    if (req.body.start.localeCompare(req.body.end) > 0) {
      return res.status(400).json({
        success: false,
        message: `Please make valid reservation, start time cannot be after end time`,
      });
    }

    const user = await User.findById(req.user.id);

    if (user.currentPoint <= 0) {
      return res.status(400).json({
        success: false,
        message: `Point is not enough, cannot make reservation`,
      });
    }

    const point = await Point.create({
      user: user._id,
      updatedPoint: user.currentPoint - 1,
      change: "Deduct 1",
      message: "Make reservation successfully",
    });

    const user1 = await User.findByIdAndUpdate(
      user.id,
      { currentPoint: point.updatedPoint },
      {
        new: true,
        runValidators: true,
      }
    );

    const reservation = await Reservation.create(req.body);
    res.status(201).json({
      success: true,
      data: reservation,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot create Reservation",
    });
  }
};

//desc    Update reservation
//route   PUT /api/project/reservations/:Id
//access  Private
exports.updateReservation = async (req, res, next) => {
  try {
    let reservation = await Reservation.findById(req.params.id);

    let coworking = await Coworking.findById(reservation.coworking);

    if (req.user.role === "banned user") {
      return res.status(404).json({
        success: false,
        message: `You are banned`,
      });
    }

    //const coworking = await Coworking.findById(req.params.coworkingId);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    //Make sure user is the reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this reservation`,
      });
    }

    const now = new Date().toISOString();
    const startReservationBangkok = new Date(reservation.apptDate.toISOString().split("T")[0] + "T" + reservation.start + ".000Z");
    const startReservationUTC7 = new Date(startReservationBangkok.getTime() - 7 * 60 * 60 * 1000);
    const startReservationUTC7ISO = startReservationUTC7.toISOString();
    // console.log("Start: " + startReservationUTC7ISO);

    if (startReservationUTC7ISO < now) {
      return res.status(401).json({
        success: false,
        message: "Cannot update reservation that has already started",
      });
    }

    if (
      req.body.start.localeCompare(coworking.opentime) < 0 ||
      req.body.end.localeCompare(coworking.closetime) > 0
    ) {
      return res.status(400).json({
        success: false,
        message: `Please update reservation within ${coworking.opentime} and ${coworking.closetime}`,
      });
    }

    if (req.body.start.localeCompare(req.body.end) > 0) {
      return res.status(400).json({
        success: false,
        message: `Please update valid reservation, start time cannot be after end time`,
      });
    }

    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot update reservation",
    });
  }
};

//desc    Delete reservation
//route   DELETE /api/project/reservations/:Id
//access  Private
exports.deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (req.user.role === "banned user") {
      return res.status(404).json({
        success: false,
        message: `You are banned`,
      });
    }

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    // Make sure user is the reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this reservation`,
      });
    }

    const now = new Date().toISOString();
    const startReservationBangkok = new Date(reservation.apptDate.toISOString().split("T")[0] + "T" + reservation.start + ".000Z");
    const startReservationUTC7 = new Date(startReservationBangkok.getTime() - 7 * 60 * 60 * 1000);
    const startReservationUTC7ISO = startReservationUTC7.toISOString();
    // console.log("Start: " + startReservationUTC7ISO);

    if (startReservationUTC7ISO < now) {
      return res.status(401).json({
        success: false,
        message: "Cannot delete reservation that has already started",
      });
    }

    // if(reservation.hasReview !== "no"){
    //   return res.status(401).json({
    //     success: false,
    //     message: `User ${req.user.id} can not delete this reservation because you have review`,
    //   });
    // }

    await reservation.deleteOne();

    const user = await User.findById(req.user.id);

    const point = await Point.create({
      user: user._id,
      updatedPoint: user.currentPoint + 1,
      change: "Add 1",
      message: "Delete reservation successfully",
    });

    const user1 = await User.findByIdAndUpdate(
      user.id,
      { currentPoint: point.updatedPoint },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      success: false,
      message: "Cannot delete Reservation",
    });
  }
};
