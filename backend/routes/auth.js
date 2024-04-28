const express = require("express");

const {
  register,
  login,
  getMe,
  logout,
  getAllUsers,
  deleteMe,
  updateMe,
  banUser,
  unbanUser,
  getUser,
} = require("../controllers/auth");

//Auth tag
/**
 * @swagger
 * tags:
 *    name: Auth
 *    description: API endpoints for managing authentication
 */

//add Auth model
/**
 * @swagger
 * components:
 *  schemas:
 *    Auth:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated ID of user
 *          example: d69021e1-6c54-4b01-90e6-d701748f0851
 *        name:
 *          type: string
 *          description: The name of the user.
 *        telephone:
 *          type: string
 *          description: The telephone number of the user.
 *        email:
 *          type: string
 *          description: The email address of the user.
 *        currentPoint:
 *          type: Number
 *          description: The current point of the user.
 *        role:
 *          type: string
 *          enum: ["user", "admin", "banned user"]
 *          default: "user"
 *          description: The role of the user.
 *        password:
 *          type: string
 *          description: The password of the user.
 *        createdAt:
 *          type: Date,
 *          default: Date.now
 *          description: The timestamp indicating when the user was created.
 *      example:
 *        id: 662de9c3f25eb6937ce03f27
 *        name: farsai
 *        telephone: 011124578
 *        email: farsai1@gmail.com
 *        currentPoint: 2
 *        role: user
 *        password: $2b$10$KTkRCVll7LkA5CzI.NwS4.eisncnbrOe63eKhBZX6ZPrzCFopGSr.
 *        createdAt: 2024-04-28T06:16:35.438+00:00
 */

// Get All Users
/**
 * @swagger
 * /auth/getallusers:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

// Get Me
/**
 * @swagger
 * /auths/me:
 *   get:
 *       summary: Get current user details
 *       tags: [Auth]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 *       responses:
 *           200:
 *               description: Details of the current user
 *               content:
 *                   application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 *           404:
 *               description: User not found
 */

// Register user
/**
 * @swagger
 * /auth/register:
 *   post:
 *       summary: Create a new account user
 *       tags: [Auth]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 *       responses:
 *           201:
 *               description: Register successfully
 *               content:
 *                   application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 *           400:
 *               description: Server error
 */

// Login user ยังไม่ได้แก้
/**
 * @swagger
 * /auth/login:
 *   post:
 *       summary: Login user
 *       tags: [Auth]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 *       responses:
 *           200:
 *               description: Login successful
 *               content:
 *                   application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 *           401:
 *               description: Invalid credentials - Email or password is incorrect
 */

// Logout user
/**
 * @swagger
 * /auth/logout:
 *   get:
 *       summary: logout user
 *       tags: [Auth]
 *       responses:
 *           201:
 *               description: Logout successfully
 */

// update the User
/**
 * @swagger
 * /auth/update:
 *  put:
 *     summary: Update a User by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

// delete the User
/**
 * @swagger
 * /auth/delete:
 *   delete:
 *     summary: Delete a User by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the User
 *
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

// Ban the User ไม่แน่ใจ
/**
 * @swagger
 * /auth/{id}/ban:
 *   get:
 *     summary: Ban a User by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the User to ban
 *     responses:
 *       200:
 *         description: User banned successfully
 *       404:
 *         description: User not found
 */

// Unban the User ไม่แน่ใจ
/**
 * @swagger
 * /auth/{id}/unban:
 *   get:
 *     summary: Unban a User by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the User to unban
 *     responses:
 *       200:
 *         description: User unbanned successfully
 *       404:
 *         description: User not found
 */

// get one user
/**
 * @swagger
 * /auth/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Details of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

const pointRouter = require("./points");

router.use("/:userId/points/", pointRouter);

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.get("/getallusers", protect, authorize("admin"), getAllUsers);
router.delete("/deleteMe", protect, deleteMe);
router.put("/updateMe", protect, updateMe);
router.route("/:userId/ban").get(protect, authorize("admin"), banUser);
router.route("/:userId/unban").get(protect, authorize("admin"), unbanUser);
router.route("/:userId").get(protect, authorize("admin"), getUser);

module.exports = router;
