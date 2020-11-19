const express = require("express")
const router = express.Router()
const userRoutes = require("./userRoutes")
const reviewRoutes = require("./reviewRoutes")
const vendorRoutes = require("./reviewRoutes")



router.use(userRoutes)
router.use(reviewRoutes)
router.use(vendorRoutes)


module.exports = router;
