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
import path from 'path';

// Function to overlay QR code on base image
const overlayQRCodeOnImage = async (imagePath, qrCodePath, outputPath, marginBottom = 100) => {
  try {
    // Read the base image and QR code
    const image = sharp(imagePath);
    const qrCodeBuffer = await sharp(qrCodePath).resize(500, 500).toBuffer();

    // Get metadata for base image
    const { width: imageWidth, height: imageHeight } = await image.metadata();

    // Get metadata for QR code
    const { width: qrCodeWidth, height: qrCodeHeight } = await sharp(qrCodeBuffer).metadata();

    // Calculate the position to center the QR code horizontally and apply bottom margin
    const x = Math.round((imageWidth - qrCodeWidth) / 2);
    const y = Math.round(imageHeight - qrCodeHeight - marginBottom);

    // Composite the QR code on the base image
    await image
      .composite([{
        input: qrCodeBuffer,
        left: x,  // X coordinate for QR code position
        top: y,   // Y coordinate for QR code position
      }])
      .jpeg({ quality: 30 })  // Save as JPEG with quality 30
      .toFile(outputPath);

    console.log(`Image saved at ${outputPath}`);
  } catch (error) {
    console.error('Error overlaying QR code on image:', error.message);
    throw new Error('Failed to overlay QR code on image');
  }
};


export { overlayQRCodeOnImage };
