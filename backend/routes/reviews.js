const express = require("express");
const {
   addReview,
   approveReview,
   getReview,
   updateReview,
   getAllReviews,
   getReviewById,
   getAllUnapproveReviews
 } = require("../controllers/reviews");

 const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");



router
  .route("/")
  .post(protect, authorize("user"), addReview)
  .get(protect, authorize("admin"), getAllReviews);

  router.route("/pending").get(protect,authorize("user", "admin"),getAllUnapproveReviews)
// router
//   .route("/all")
//   .get(protect, authorize("admin"), getAllReviews);
  
  router
  .route("/:id")
  .put(protect, authorize("user"), updateReview)
  .get(protect,authorize("user", "admin"),getReviewById )
  router.route("/:id/approve").put(protect, authorize("admin"), approveReview)

module.exports = router;