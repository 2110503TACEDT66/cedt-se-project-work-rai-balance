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
 *    description: The coworkings managing API
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
 *          description: The auto-generated id of the coworking
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
 *     summary: Returns the list of all the coworkings
 *     tags: [Coworkings]
 *     responses:
 *       200:
 *         description: The list of the coworkings
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
 *     summary: Get the coworking by id
 *     tags: [Coworkings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coworking id
 *     responses:
 *       200:
 *         description: The coworking description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coworking'
 *     404:
 *       description: The coworking was not found
 */

// add one coworking
/**
 * @swagger
 * /coworkings:
 *   post:
 *       summary: Create a new coworking
 *       tags: [Coworkings]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Coworking'
 *       responses:
 *           201:
 *               description: The coworking was successfully created
 *               content:
 *                   application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Coworking'
 *           500:
 *               description: Some server error
 */

// update the coworking
/**
 * @swagger
 * /coworkings/{id}:
 *  put:
 *     summary: Update the coworking by the id
 *     tags: [Coworkings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coworking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Coworking'
 *     responses:
 *       200:
 *         description: The coworking was updated
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Coworking'
 *       404:
 *         description: The coworking was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /coworkings/{id}:
 *   delete:
 *     summary: Remove the coworking by id
 *     tags: [Coworkings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coworking id
 *
 *     responses:
 *       200:
 *         description: The coworking was deleted
 *       404:
 *         description: The coworking was not found
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
