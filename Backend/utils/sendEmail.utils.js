import auth from "../config/emailAuth.config.js";
import path from "path";
import fs from "fs";

const receiver = (receiverEmailID, qrCodePath, name) => {
  return {
    from: {
      name: "Surya Ghosh",
      address: process.env.SENDER_EMAIL_ID
    },
    to: receiverEmailID,
    subject: "Join Us for Teachers' Day Celebration!",
    text: "Celebrate Teachers' Day with us! Don't miss the fun and festivities.",
    html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: #4CAF50; text-align: center;">🎉 Ruthvij'2024 🎉</h1>
          <div>Dear <strong>${name}</strong>,</div>
          <p>
            We are excited to invite you to a special Teachers' Day celebration! 
            It's a time to honor and appreciate our amazing teachers for their dedication and hard work.
          </p>
          <p>
            Join us for an event filled with fun activities, performances, and a chance to show your gratitude to your teachers.
          </p>
          <div style="text-align: center;">
            <img src="cid:qrCode" alt="Teachers' Day Celebration" style="width: 100%; max-width: 600px; height: auto; border-radius: 8px;" />
          </div>
          <p><strong>Date:</strong> 5th September, 2024</p>
          <p><strong>Time:</strong> 10:00 a.m.</p>
          <p><strong>Venue:</strong> Future Institute of Engineering and Management</p>
          <p>
            We encourage you to bring along your friends and join us in making this day memorable for our beloved teachers!
          </p>
          
          <p>Looking forward to seeing you there!</p>
          <p>Best regards,</p>
          <p>ECE Department, FIEM</p>
          <h6 style="text-align: center;">
            Developed by: Surya Ghosh, 3rd Year of ECE
          </h6>
        </div>
      `,
    attachments: [
      {
        filename: path.basename(qrCodePath),
        path: qrCodePath,
        cid: "qrCode",  // Content-ID for the QR code image
      },
    ],
  };
};

const sendMail = async (receiverEmailID, qrCodePath, name) => {
  try {
    console.time("Email Sending");
    console.log("Sending email with QR code path:", qrCodePath);
    
    const stats = fs.statSync(qrCodePath);
    console.log(`File Size: ${stats.size} bytes`);

    const info = await auth.sendMail(receiver(receiverEmailID, qrCodePath, name));
    console.log("Email Sent");
    return info;
  } catch (error) {
    console.error("Error sending mail:", error.message);
    throw error;
  }
};

export { sendMail };

/*
<p style="text-align: center;">
            <a href="cid:qrCode" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;" target="_blank" rel="noopener noreferrer">RSVP Now</a>
          </p>
*/