import { Router } from "express";
import { sendEmail } from "../controllers/sendEmail.controller.js";
import { generateQRCode } from "../middlewares/qrCodeGenerator.middleware.js";

const router = Router();

// Define the route for sending email
router.route("/sendEmail").post(generateQRCode, sendEmail);


export default router;
