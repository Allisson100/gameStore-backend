const express = require("express");
const router = express.Router();
const controllerML = require("../MercadoLivre/controllers/index.js");
const controllerSwish = require("../Swish/controllers/index.js");

router.use("/ml", controllerML);
router.use("/swish", controllerSwish);

module.exports = router;
