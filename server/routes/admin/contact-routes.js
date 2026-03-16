const express = require("express");
const {
  getAllContactMessages,
  markContactMessageStatus,
  replyToContactMessage,
} = require("../../controllers/admin/contact-controller");

const router = express.Router();

router.get("/get", getAllContactMessages);
router.put("/status/:id", markContactMessageStatus);
router.post("/reply/:id", replyToContactMessage);

module.exports = router;

