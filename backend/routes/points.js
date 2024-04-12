const express = require("express");
const {
  getPointHistories
} = require("../controllers/points");

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getPointHistories);
// router
//   .route("/:id")
//   .get(protect, getPointHistory)

module.exports = router;
