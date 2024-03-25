const express = require("express");
const router = express.Router();
const { emailSendFunction } = require("../controllers/EmailController");

router.post("/email", emailSendFunction);

module.exports = router;
