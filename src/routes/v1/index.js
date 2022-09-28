const express = require("express");

const helpController = require("../../controllers/helpController");
const router = express.Router();

router.get("/help", helpController.helpDetails);

module.exports = router;
