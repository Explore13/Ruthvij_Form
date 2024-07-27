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
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    // Generate QR code and save it to the temporary folder
    const qrCodePath = path.join(tempDir, `${rollNumber}.png`);
    const baseImagePath = path.join(tempDir, 'invitationCard.png');
    const outputPath = path.join(tempDir, `invitation_${rollNumber}.png`);

    await QRCode.toFile(qrCodePath, qrText, {
      width: 300,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    // Ensure base image is available in the temp folder or handle the case where it's not
    if (!fs.existsSync(baseImagePath)) {
      // You may need to handle this error or provide a default image
      return res.status(500).json({ error: 'Base image not found' });
    }

    // Overlay QR code on the base image
    await overlayQRCodeOnImage(baseImagePath, qrCodePath, outputPath);
    fs.unlinkSync(qrCodePath);
    req.qrCodePath = outputPath;
    next();
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

export { generateQRCode };
