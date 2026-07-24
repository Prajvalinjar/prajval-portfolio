const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

async function processImage() {
  try {
    console.log("Loading image...");
    const imagePath = path.join(__dirname, 'public', 'profile.jpg');
    
    console.log("Removing background (this will download a small model if first time)...");
    const fileUrl = 'file:///' + imagePath.replace(/\\/g, '/');
    const blob = await removeBackground(fileUrl);
    
    console.log("Converting blob to buffer...");
    const buffer = Buffer.from(await blob.arrayBuffer());
    
    const outputPath = path.join(__dirname, 'public', 'profile_cutout_clean.png');
    fs.writeFileSync(outputPath, buffer);
    console.log("Successfully saved clean transparent PNG to:", outputPath);
  } catch (error) {
    console.error("Error removing background:", error);
  }
}

processImage();
