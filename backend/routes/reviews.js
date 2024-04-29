const express = require("express");
const {
  addReview,
  approveReview,
  getReviewsByCoworking,
  updateReview,
  getReviews,
  getReview,
  getReviewById,
} = require("../controllers/reviews");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("user", "admin", "banned user"), addReview)
  .get(protect, authorize("user", "admin"), getReview);
router.route("/all").get(protect, getReviewsByCoworking);
router
  .route("/:id")
  .put(protect, authorize("user", "banned user"), updateReview)
  .get(protect, authorize("user", "admin"), getReviewById);
router.route("/:id/approve").put(protect, authorize("admin"), approveReview);
router.route("/all").post(protect, authorize("admin"), getReviews);

module.exports = router;

//Review tag
/**
 * @swagger
 * tags:
 *    name: Reviews
 *    description: API endpoints for managing reviews
 */

//add Review model
/**
 * @swagger
 * components:
 *  schemas:
 *   Review:
 *      type: object
 *      required:
 *        - coworking
 *        - reservation
 *        - user
 *        - rating
 *        - comment
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated ID of the review
 *          example: 609bda561452242d88d36e37
 *        coworking:
 *          type: string
 *          description: The ID of the coworking being reviewed
 *        reservation:
 *          type: string
 *          description: The ID of the reservation associated with the review
 *        user:
 *          type: string
 *          description: The ID of the user who submitted the review
 *          example: 609bda561452242d88d36e37
 *        approval:
 *          type: string
 *          enum: ["pending", "approved", "disapproved"]
 *          description: The approval status of the review
 *        rating:
 *          type: number
 *          description: The rating given in the review
 *        comment:
 *          type: string
 *          description: The comment provided in the review
 *        createdAt:
 *          type: Date
 *          format: date-time
 *          description: The creation date of the review
 *      example:
 *        id: 662dee19f25eb6937ce03f76
 *        coworking: 65e29f14ccf74188031ddc21
 *        reservation: 662dee01f25eb6937ce03f6d
 *        user: 662dede3f25eb6937ce03f5f
 *        approval: disapproved
 *        rating: 2
 *        comment: SPAM SPAM SPAMSPAMSPAMSPAMSPAM SPAM
 *        createdAt: 2024-04-28T06:35:05.618+00:00
 */

// add one review
/**
 * @swagger
 * /reservation/{id}/reviews:
 *   post:
 *       summary: Create a new review
 *       tags: [Reviews]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Review'
 *       responses:
 *           201:
 *               description: Review created successfully
 *               content:
 *                   application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Review'
 *           500:
 *               description: Cannot create Review
 */

// update a review
/**
 * @swagger
 * /reviews/{id}:
 *  put:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of a review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Review'
 *       404:
 *         description: Can not change approval
 *       500:
 *         description: Cannot update Review
 */

// approveReview
/**
 * @swagger
 * /reviews/{id}/approve:
 *   put:
 *     summary: Approve a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review
 *     responses:
 *       200:
 *         description: Review approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Cannot approve
 */

// get review by id
/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of a review
 *     responses:
 *       200:
 *         description: The details of a review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: No reviews found for the reservation id
 *       500:
 *         description: Cannot find review
 */

// get review
/**
 * @swagger
 * /reviews/reservations/{id}/reviews:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of a review
 *     responses:
 *       200:
 *         description: The details of a review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: No reviews found for the reservation id
 *       500:
 *         description: Cannot get review
 */

//get all reviews
/**
 * @swagger
 * /coworkings/{id}/reviews/all:
 *   post:
 *     summary: Get all review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the coworking space
 *     responses:
 *       200:
 *         description: A list of review
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Review'
 *       500:
 *         description: Cannot get reviews
 */

// getReviewsByCoworking
/**
 * @swagger
 * /coworkings/{id}/reviews:
 *   get:
 *     summary: Get reviews by coworking ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the coworking
 *     responses:
 *       200:
 *         description: The list of reviews for the coworking id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: No reviews found for the reservation id
 *       500:
 *         description: Cannot get reviews
 */
