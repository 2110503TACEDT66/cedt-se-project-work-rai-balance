const User = require("../models/User");
const Point = require("../models/Point");

exports.addTwoPoint = async(req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }
        const user = User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        req.body.user = user;
        // Calculate updated point
        const updatedPoint = user.currentPoint + 2;

        // Update the user's current point
        user.currentPoint = updatedPoint;

        // Save the updated user object
        await user.save();

        const point = await Point.create({
            userId: user._id, // Assuming Point model has a field userId
            updatedPoint: updatedPoint,
            change: "+2"
        });
        res.status(201).json({
            success: true,
            data: point
          });
    } catch (err) {
        console.log(err.stack);
        return res.status(500).json({
          success: false,
          message: "Cannot update point",
        });
      }
}

