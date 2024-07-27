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
    const tempDir = os.tmpdir(); // Use default temp directory
    const qrFolder = path.join(tempDir, 'qr'); // Create a qr folder in temp directory
    if (!fs.existsSync(qrFolder)) fs.mkdirSync(qrFolder);

    // Paths for QR code and base image
    const qrCodePath = path.join(qrFolder, `${rollNumber}.png`);
    const baseImagePath = path.join('tmp/qr', 'invitationCard.png'); // Path relative to project root
    const outputPath = path.join(qrFolder, `invitation_${rollNumber}.png`);

    // Generate QR code and save it to the temporary folder
    await QRCode.toFile(qrCodePath, qrText, {
      width: 300,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    // Ensure base image is available in the temp folder or handle the case where it's not
    if (!fs.existsSync(baseImagePath)) {
      return res.status(500).json({ error: `Base image not found at: ${baseImagePath}` });
    }

    // Overlay QR code on the base image
    await overlayQRCodeOnImage(baseImagePath, qrCodePath, outputPath);
    fs.unlinkSync(qrCodePath); // Delete the QR code file
    req.qrCodePath = outputPath;
    next();
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

export { generateQRCode };
