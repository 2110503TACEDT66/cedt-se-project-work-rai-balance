const express = require("express");
const {
   addReview,
   approveReview,
   getReview,
   updateReview,
   getReviews
 } = require("../controllers/reviews");

 const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("user", "admin"), addReview)
  .get(protect, authorize("user", "admin"), getReview);
  router
  .route("/:id")
  .put(protect, authorize("user"), updateReview)
  router.route("/:id/approve").put(protect, authorize("admin"), approveReview)
router.route("/all").post(protect, authorize("admin"), getReviews)

module.exports = router;