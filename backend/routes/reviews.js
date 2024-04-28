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
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated ID of the review
 *          example: d69021e1-6c54-4b01-90e6-d701748f0851
 *        coworking:
 *          type: string
 *          description: The ID of the coworking being reviewed
 *        reservation:
 *          type: string
 *          description: The ID of the reservation associated with the review
 *        user:
 *          type: string
 *          description: The ID of the user who submitted the review
 *        approval:
 *          type: string
 *          enum: ["pending", "approved", "disapproved"]
 *          default: "pending"
 *          description: The approval status of the review
 *        rating:
 *          type: number
 *          default: null
 *          description: The rating given in the review
 *        comment:
 *          type: string
 *          default: ""
 *          description: The comment provided in the review
 *        createdAt:
 *          type: Date
 *          default: Date.now
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
 * /reviews:
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
 *               description: Server error
 */

// approveReview
/**
 * @swagger
 * /reviews/{id}/approve:
 *   get:
 *     summary: Get a review by ID
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
 *         description: The details of the review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */

// getReviewsByCoworking
/**
 * @swagger
 * /reviews/coworking/{id}:
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
 *         description: The list of reviews for the specified coworking
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: No reviews found for the specified coworking
 */

//get all reviews
/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all review
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: A list of review
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Review'
 */

// get one review
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
 *         description: Review not found
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
 *         description: Review not found
 *       500:
 *         description: Server error
 */

// delete a review
/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of a review
 *
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */

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
