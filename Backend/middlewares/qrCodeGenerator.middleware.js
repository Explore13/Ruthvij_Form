import { overlayQRCodeOnImage } from '../utils/imageUtils.utils.js';
import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';
// Middleware function to generate QR code
const generateQRCode = async (req, res, next) => {
  try {
    const { name, rollNumber } = req.body;

    if (!name || !rollNumber) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!rollNumber) {
      console.log("Roll number is missing");
      return res.status(400).json({ error: 'Roll number is required' });
    }

    const qrText = `Name : ${name}\n "RollNumber" : ${rollNumber}`;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename); 
    const qrCodePath = path.join(__dirname, '../public/qr', `${rollNumber}.png`);
    const baseImagePath = path.join(__dirname, '../public/invitationCard.png'); // Path to the base image
    const outputPath = path.join(__dirname, '../public/qr', `invitation_${rollNumber}.png`);
    // const pdfPath = path.join(__dirname, '../public/qr', `invitation_${rollNumber}.pdf`);

    // Generate QR code and save it to local folder
    await QRCode.toFile(qrCodePath, qrText, {
        width: 300,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      

    // Overlay QR code on the base image
    const data = await overlayQRCodeOnImage(baseImagePath, qrCodePath, outputPath);
    console.log("QR attached ");

    // Attach the combined image file path to the request object
    req.qrCodePath = outputPath;


    console.log("Outputpath passed");
    
    next();
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

export { generateQRCode };
