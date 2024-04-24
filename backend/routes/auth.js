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
  unbanUser
} = require("../controllers/auth");

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

module.exports = router;
