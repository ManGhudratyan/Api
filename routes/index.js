const router = require("express").Router();
const userRoute = require("./users");
const User = require('../models/User');
router.use("/api/users", userRoute);
router.use("/api/login", userRoute);
router.use("/api/register", userRoute);

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findOne();
    res.status(200).json({
      status: 'success',
      user
    })
  } catch (e) {
    next(e)
  }
})

module.exports = router;
