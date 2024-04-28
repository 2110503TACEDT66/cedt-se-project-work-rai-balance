const express = require("express");
const {
  getCoworkings,
  getCoworking,
  createCoworking,
  updateCoworking,
  deleteCoworking,
} = require("../controllers/coworkings");

//Coworking tag
/**
 * @swagger
 * tags:
 *    name: Coworkings
 *    description: API endpoints for managing coworking spaces
 */

//add Coworking model
/**
 * @swagger
 * components:
 *  schemas:
 *    Coworking:
 *      type: object
 *      required:
 *        - name
 *        - address
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated ID of the coworking space
 *          example: d69021e1-6c54-4b01-90e6-d701748f0851
 *        ลําดับ:
 *          type: string
 *          description: Ordinal number
 *        name:
 *          type: string
 *          description: The name of the coworking space.
 *        address:
 *          type: string
 *          description: The house number, street, and road of the coworking space.
 *        district:
 *          type: string
 *          description: The district where the coworking space is located.
 *        province:
 *          type: string
 *          description: The province where the coworking space is located.
 *        postalcode:
 *          type: string
 *          description: The 5-digit postal code of the coworking space.
 *        tel:
 *           type: string
 *           description: The telephone number of the coworking space.
 *        region:
 *          type: string
 *          description: The region where the coworking space is located.
 *        opentime:
 *          type: string
 *          description: The opening time of the coworking space.
 *        closetime:
 *          type: string
 *          description: The closing time of the coworking space.
 *        picture:
 *          type: string
 *          description: The picture of the coworking space.
 *      example:
 *        id: 609bda561452242d88d36e37
 *        ลําดับ: 23
 *        name: work rai balance Coworking
 *        address: 121 bangna
 *        district: bangna
 *        province: Bangkok
 *        postalcode: 10260
 *        tel: 055-319401
 *        region: กรุงเทพมหานคร (Bangkok)
 *        opentime: 09:00:00
 *        closetime: 18:00:00
 *        picture: https://drive.google.com/uc?export=download&id=1PdB_V7bjBIZvMamK5H1_5mKFwvUOm_tK
 */

//get all coworkings
/**
 * @swagger
 * /coworkings:
 *   get:
 *     summary: Get all coworking spaces
 *     tags: [Coworkings]
 *     responses:
 *       200:
 *         description: A list of coworking spaces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Coworking'
 */

// get one coworking
/**
 * @swagger
 * /coworkings/{id}:
 *   get:
 *     summary: Get a coworking space by ID
 *     tags: [Coworkings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the coworking space
 *     responses:
 *       200:
 *         description: The details of the coworking space
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coworking'
 *       404:
 *         description: Coworking space not found
 */

// add one coworking
/**
 * @swagger
 * /coworkings:
 *   post:
 *       summary: Create a new coworking space
 *       tags: [Coworkings]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Coworking'
 *       responses:
 *           201:
 *               description: Coworking space created successfully
 *               content:
 *                   application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Coworking'
 *           500:
 *               description: Server error
 */

// update the coworking
/**
 * @swagger
 * /coworkings/{id}:
 *  put:
 *     summary: Update a coworking space by ID
 *     tags: [Coworkings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the coworking space
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Coworking'
 *     responses:
 *       200:
 *         description: Coworking space updated successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Coworking'
 *       404:
 *         description: Coworking space not found
 *       500:
 *         description: Server error
 */

// delete one coworking
/**
 * @swagger
 * /coworkings/{id}:
 *   delete:
 *     summary: Delete a coworking space by ID
 *     tags: [Coworkings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the coworking space
 *
 *     responses:
 *       200:
 *         description: Coworking space deleted successfully
 *       404:
 *         description: Coworking space not found
 */

//Include other resource routers
const reservationRouter = require("./reservations");
const reviewRouter = require("./reviews");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use("/:coworkingId/reservations/", reservationRouter);
router.use("/:coworkingId/reviews/", reviewRouter);

router
  .route("/")
  .get(getCoworkings)
  .post(protect, authorize("admin"), createCoworking);
router
  .route("/:id")
  .get(getCoworking)
  .put(protect, authorize("admin"), updateCoworking)
  .delete(protect, authorize("admin"), deleteCoworking);

module.exports = router;
