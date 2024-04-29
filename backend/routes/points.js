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
 *        - change
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated id of the point
 *          example: 609bda561452242d88d36e37
 *        user:
 *          type: string
 *          description: The user of the coworking space.
 *          example: 609bda561452242d88d36e37
 *        updatedPoint:
 *          type: number
 *          description: The user of the coworking space.
 *        change:
 *          type: string
 *          enum: ["Deduct 1", "Add 2", "Add 1", "Deduct 2"]
 *          description: The user of the coworking space.
 *        message:
 *          type: string
 *          description: The user of the coworking space.
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: The user of the coworking space.
 *          example: 2023-04-28T06:16:35.544+00:00
 *      example:
 *        id: 662de9c3f25eb6937ce03f29
 *        user: 662de9c3f25eb6937ce03f27
 *        updatedPoint: 2
 *        change: Add 2
 *        message: Register successfully
 *        updatedAt: 2024-04-28T06:16:35.544+00:00
 */

//get all points histories
/**
 * @swagger
 * /auth/{id}/points:
 *   get:
 *     summary: Get the list of all the points
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

