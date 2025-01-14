const express = require("express");
const router = express.Router();
const servicesSwish = require("../services/index.js");

router.post("/create/payment", servicesSwish.createPayment);

module.exports = router;
