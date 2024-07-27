import { overlayQRCodeOnImage } from '../utils/imageUtils.utils.js';
import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';

const generateQRCode = async (req, res, next) => {
  try {
    const { name, rollNumber } = req.body;

    if (!name || !rollNumber) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const qrText = `Name: ${name}\nRollNumber: ${rollNumber}`;
    
    // Create temporary directory
    const tempDir = path.join(os.tmpdir(), 'qr');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    // Define file paths
    const qrCodePath = path.join(tempDir, `${rollNumber}.png`);
    const baseImagePath = path.join(tempDir, 'invitationCard.png');
    const outputPath = path.join(tempDir, `invitation_${rollNumber}.png`);

    // Generate QR code and save it to the temporary folder
    await QRCode.toFile(qrCodePath, qrText, {
      width: 300,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    console.log(`QR Code generated at: ${qrCodePath}`);

    // Ensure base image is available in the temp folder
    if (!fs.existsSync(baseImagePath)) {
      console.error(`Base image not found at: ${baseImagePath}`);
      return res.status(500).json({ error: 'Base image not found' });
    }

    // Overlay QR code on the base image
    await overlayQRCodeOnImage(baseImagePath, qrCodePath, outputPath);

    console.log(`Overlay image saved at: ${outputPath}`);

    // Clean up temporary files
    fs.unlinkSync(qrCodePath);

    // Attach the path of the output image to the request object
    req.qrCodePath = outputPath;
    next();
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

export { generateQRCode };
