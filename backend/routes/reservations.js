const express = require("express");
const {
  getReservations,
  getReservation,
  addReservation,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservations");

//Reservation tag
/**
 * @swagger
 * tags:
 *    name: Reservations
 *    description: The reservations managing API
 */

//add Reservation model
/**
 * @swagger
 * components:
 *  schemas:
 *    Reservation:
 *      type: object
 *      required:
 *        - user
 *        - coworking
 *        - start
 *        - end
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated id of the coworking
 *          example: d69021e1-6c54-4b01-90e6-d701748f0851
 *        user:
 *          type: mongoose.Schema.ObjectId
 *          ref: "User"
 *          description: The auto-generated id of the coworking
 *        coworking:
 *          type: mongoose.Schema.ObjectId
 *          ref: "Coworking"
 *          description: The auto-generated id of the coworking
 *        start:
 *          type: string
 *          description: The auto-generated id of the coworking
 *        end:
 *          type: string
 *          description: The auto-generated id of the coworking
 *        hasReview:
 *          type: string
 *          enum: ["no", "pending", "approved", "disapproved"]
 *          default: "no"
 *          description: The auto-generated id of the coworking
 *        createAt:
 *          type: Date
 *          default: Date.now
 *          description: The auto-generated id of the coworking
 *      example:
 *        id: 609bda561452242d88d36e37
 *        user: 662dea794a047dc4e479e4dc
 *        coworking: 65e2a201ccf74188031ddc3f
 *        start: 09:00:00
 *        end: 11:00:00
 *        hasReview: no
 *        createAt: 2024-04-28T06:20:06.104+00:00
 */

//get all coworkings
/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Returns the list of all the reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: The list of the reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Reservation'
 */

// get one reservation
/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get the reservation by id
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *     responses:
 *       200:
 *         description: The reservation description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *     404:
 *       description: The reservation was not found
 */

// add one reservation
/**
 * @swagger
 * /reservations:
 *   post:
 *       summary: Create a new reservation
 *       tags: [Reservations]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Reservation'
 *       responses:
 *           201:
 *               description: The reservation was successfully created
 *               content:
 *                   application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Reservation'
 *           500:
 *               description: Some server error
 */

// update the reservation
/**
 * @swagger
 * /reservations/{id}:
 *  put:
 *     summary: Update the reservation by the id
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: The reservation was updated
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: The reservation was not found
 *       500:
 *         description: Some error happened
 */

// delete one reservation
/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Remove the reservation by id
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *
 *     responses:
 *       200:
 *         description: The reservation was deleted
 *       404:
 *         description: The reservation was not found
 */

const reviewRouter = require("./reviews");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use("/:reservationId/reviews/", reviewRouter);

router
  .route("/")
  .get(protect, getReservations)
  .post(protect, authorize("admin", "user", "banned user"), addReservation);
router
  .route("/:id")
  .get(protect, getReservation)
  .put(protect, authorize("admin", "user", "banned user"), updateReservation)
  .delete(
    protect,
    authorize("admin", "user", "banned user"),
    deleteReservation
  );

module.exports = router;
