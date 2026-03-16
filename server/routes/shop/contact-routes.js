const express = require("express");
const { submitContactMessage } = require("../../controllers/shop/contact-controller");

const router = express.Router();

router.post("/submit", submitContactMessage);

module.exports = router;

