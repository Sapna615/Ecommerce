const ContactMessage = require("../../models/ContactMessage");
const { sendContactMessageEmail } = require("../../services/emailService");

const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message, priority } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const created = await ContactMessage.create({
      name,
      email,
      phone: phone || "",
      subject,
      message,
      priority: priority || "medium",
      status: "new",
    });

    // Fire-and-forget email (do not block saving)
    const emailResult = await sendContactMessageEmail({
      name,
      email,
      phone,
      subject,
      message,
      priority: priority || "medium",
    });

    if (!emailResult.success) {
      console.log("Contact email failed (but saved to DB):", emailResult.error);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: created,
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error("Submit contact message error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

module.exports = { submitContactMessage };

