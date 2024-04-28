const express = require("express");
const { getPointHistories } = require("../controllers/points");

//Point tag
/**
 * @swagger
 * tags:
 *    name: Points
 *    description: The points managing API
 */

//add Point model
/**
 * @swagger
 * components:
 *  schemas:
 *    Point:
 *      type: object
 *      required:
 *        - user
 *        - updatedPoint
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated id of the point
 *          example: d69021e1-6c54-4b01-90e6-d701748f0851
 *        user:
 *          type: mongoose.Schema.ObjectId
 *          ref: "User"
 *          description: The user of the coworking space.
 *        updatedPoint:
 *          type: Number
 *          description: The user of the coworking space.
 *        change:
 *          type: String
 *          enum: ["Deduct 1", "Add 2", "Add 1", "Deduct 2"]
 *          description: The user of the coworking space.
 *        message:
 *          type: String
 *          description: The user of the coworking space.
 *        updatedAt:
 *          type: Date
 *          default: Date.now
 *          description: The user of the coworking space.
 *      example:
 *        id: 662de9c3f25eb6937ce03f29
 *        user: 662de9c3f25eb6937ce03f27
 *        updatedPoint: 2
 *        change: Add 2
 *        message: Register successfully
 *        updatedAt: 2024-04-28T06:16:35.544+00:00
 */

//get all points
/**
 * @swagger
 * /points:
 *   get:
 *     summary: Returns the list of all the points
 *     tags: [Points]
 *     responses:
 *       200:
 *         description: The list of the points
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Point'
 */

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getPointHistories);
// router
//   .route("/:id")
//   .get(protect, getPointHistory)

module.exports = router;
