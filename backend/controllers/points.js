const Point = require("../models/Point");

// @desc        Get all point history
// @routes      Get /api/project/points
// @access      Public
exports.getPointHistories = async (req, res, next) => {
    let query;

    // General users can see only their history
    if (req.user.role !== "admin") {
      query = Point.find({ user: req.user.id })
    } else {
      // If you are an admin, you can see all
      if (req.params.userId) {
        query = Point.find({ user: req.params.userId })
      } else {
        query = Point.find()
      }
    }

    query = query.sort({ updatedAt: -1 });
    
    try {
      const points = await query;
      res.status(200).json({
        success: true,
        count: points.length,
        data: points,
      });
    } catch (err) {
      console.log(err.stack);
      return res.status(500).json({
        success: false,
        message: "Cannot find history",
      });
    }
};