const express = require("express");
const {
   addReview,
   approveReview,
   getReviewsByCoworking,
   updateReview,
   getReviews,
   getReview,
   getReviewById
 } = require("../controllers/reviews");

 const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("user", "admin", "banned user"), addReview)
  .get(protect, authorize("user", "admin"), getReview)
  router
  .route("/all")
  .get(protect, getReviewsByCoworking);
  router
  .route("/:id")
  .put(protect, authorize("user", "banned user"), updateReview)
  .get(protect,authorize("user", "admin"),getReviewById)
  router.route("/:id/approve").put(protect, authorize("admin"), approveReview)
router.route("/all").post(protect, authorize("admin"), getReviews)

module.exports = router;