const express = require("express");
const {
  getCoworkings,
  getCoworking,
  createCoworking,
  updateCoworking,
  deleteCoworking,
} = require("../controllers/coworkings");

//Include other resource routers
const reservationRouter = require("./reservations");
const reviewRouter = require("./reviews");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use("/:coworkingId/reservations/", reservationRouter);
router.use("/:coworkingId/reviews/", reviewRouter);

router
  .route("/")
  .get(getCoworkings)
  .post(protect, authorize("admin"), createCoworking);
router
  .route("/:id")
  .get(getCoworking)
  .put(protect, authorize("admin"), updateCoworking)
  .delete(protect, authorize("admin"), deleteCoworking);

module.exports = router;