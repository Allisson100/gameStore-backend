const express = require("express");
const router = express.Router();
const servicesML = require("../services/index");

router.post("/create/payment", servicesML.createNewPayment);
router.post("/create/preference", servicesML.createNewPreference);

module.exports = router;
