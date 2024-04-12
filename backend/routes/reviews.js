const express = require("express");
const {
   addReview
 } = require("../controllers/reviews");

 const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("user"), addReview);


module.exports = router;