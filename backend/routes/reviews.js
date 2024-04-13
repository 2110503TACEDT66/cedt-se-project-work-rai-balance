const express = require("express");
const {
   addReview,
   approveReview,
   getReview,
   updateReview
 } = require("../controllers/reviews");

 const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("user"), addReview)
  .get(protect, authorize("user", "admin"), getReview);
  router
  .route("/:id")
  .put(protect, authorize("user"), updateReview)
  .put(protect, authorize("admin"), approveReview)

module.exports = router;