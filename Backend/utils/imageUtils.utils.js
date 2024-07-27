// import sharp from 'sharp';

// const overlayQRCodeOnImage = async (imagePath, qrCodePath, outputPath) => {
//   try {
//     // Read the base image and QR code
//     const image = sharp(imagePath);
//     const qrCode = sharp(qrCodePath).resize(500, 500).toBuffer();

//     // Get the base image metadata
//     const { width: imageWidth, height: imageHeight } = await image.metadata();

//     // Define QR code position
//     const x = imageWidth - 256-200;  // Adjust as needed
//     const y = imageHeight - 256 - 200; // Adjust as needed

//     // Composite the QR code on the base image
//     await image
//       .composite([{
//         input: await qrCode,
//         left: x,  // X coordinate for QR code position
//         top: y,   // Y coordinate for QR code position
//       }])
//       .jpeg({ quality: 30 })  // Save as JPEG with quality 50
//       .toFile(outputPath);

//     console.log(`Image saved at ${outputPath}`);
//   } catch (error) {
//     console.error('Error overlaying QR code on image:', error.message);
//     throw new Error('Failed to overlay QR code on image');
//   }
// };

// export { overlayQRCodeOnImage };

import sharp from 'sharp';
import fs from 'fs';

const overlayQRCodeOnImage = async (imagePath, qrCodePath, outputPath, marginBottom = 100) => {
  try {
    if (!fs.existsSync(imagePath) || !fs.existsSync(qrCodePath)) {
      throw new Error('Base image or QR code not found');
    }

    const image = sharp(imagePath);
    const qrCode = sharp(qrCodePath).resize(500, 500).toBuffer();

    const { width: imageWidth, height: imageHeight } = await image.metadata();
    const { width: qrCodeWidth, height: qrCodeHeight } = await sharp(await qrCode).metadata();

    const x = Math.round((imageWidth - qrCodeWidth) / 2);
    const y = Math.round(imageHeight - qrCodeHeight - marginBottom);

    await image
      .composite([{
        input: await qrCode,
        left: x,
        top: y,
      }])
      .jpeg({ quality: 30 })
      .toFile(outputPath);

    console.log(`Image saved at ${outputPath}`);
  } catch (error) {
    console.error('Error overlaying QR code on image:', error.message);
    throw new Error('Failed to overlay QR code on image');
  }
};

export { overlayQRCodeOnImage };
