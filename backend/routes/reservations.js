const express = require("express");
const {
  getReservations,
  getReservation,
  addReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservations");

const reviewRouter = require("./reviews");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use("/:reservationId/reviews/", reviewRouter);

router
  .route("/")
  .get(protect, getReservations)
  .post(protect, authorize("admin", "user"), addReservation);
router
  .route("/:id")
  .get(protect, getReservation)
  .put(protect, authorize("admin", "user"), updateReservation)
  .delete(protect, authorize("admin", "user"), deleteReservation);

module.exports = router;
