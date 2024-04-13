const express = require("express");
const {
   addReview,
   approveReview
 } = require("../controllers/reviews");

 const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("user"), addReview);
  router
  .route("/:id")
  .put(protect, authorize("admin"), approveReview)

module.exports = router;