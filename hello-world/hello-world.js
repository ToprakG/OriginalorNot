// productImages.js

const path = require('path');
const fs = require('fs');

function getProductImages(req, res) {
  const directoryPath = path.join(__dirname, '..', 'products');
  console.log(directoryPath);
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        // Filter only image files (optional)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        res.json({ productImages: imageFiles });
    });
}

module.exports = getProductImages;
