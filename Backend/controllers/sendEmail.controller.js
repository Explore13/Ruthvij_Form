import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { sendMail } from "../utils/sendEmail.utils.js";

const sendEmail = asyncHandler(async (req, res) => {
  try {
    const { name, receiverEmailID, rollNumber } = req.body;

    if (!name || !receiverEmailID || !rollNumber) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const qrCodePath = req.qrCodePath;
  
   if(!qrCodePath) throw new Error("QR code is required")

      console.log("Outputpath received : ",qrCodePath);


    const info = await sendMail(receiverEmailID,qrCodePath,name);
    if(info) console.log("Email is sent succesfully : ",info);
    res.status(200).json(info);
  } catch (error) {
    console.error("Error sending email:", error.message);
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
});

export { sendEmail };

