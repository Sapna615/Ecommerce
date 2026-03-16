const ContactMessage = require("../../models/ContactMessage");
const { sendContactReplyEmail } = require("../../services/emailService");

const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Get contact messages error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages" });
  }
};

const markContactMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Update contact status error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update message" });
  }
};

const replyToContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;

    if (!replyMessage || !String(replyMessage).trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Reply message is required" });
    }

    const msg = await ContactMessage.findById(id);
    if (!msg) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    msg.replies = Array.isArray(msg.replies) ? msg.replies : [];
    msg.replies.push({ message: String(replyMessage).trim() });
    msg.status = "read";
    await msg.save();

    const emailResult = await sendContactReplyEmail({
      toEmail: msg.email,
      subject: msg.subject,
      replyMessage: String(replyMessage).trim(),
    });

    if (!emailResult.success) {
      console.log("Reply email failed (but saved to DB):", emailResult.error);
    }

    return res.status(200).json({
      success: true,
      data: msg,
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error("Reply to contact message error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send reply" });
  }
};

module.exports = {
  getAllContactMessages,
  markContactMessageStatus,
  replyToContactMessage,
};

