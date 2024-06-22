const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files (CSS, JS, images) from the current directory
app.use(express.static(__dirname));

// Serve game.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve leaderboard.html on the /leaderboard route
app.get('/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'leaderboard.html'));
});

// Serve static files from the 'products' directory
app.use('/products', express.static(path.join(__dirname, 'products')));

// Endpoint to serve a random image with type (original/fake)
app.get('/product-images/:type', (req, res) => {
    const { type } = req.params;
    const directoryPath = path.join(__dirname, 'products');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error scanning directory:', err);
            return res.status(500).json({ error: 'Unable to scan directory' });
        }

        // Filter image files based on type (original or fake)
        const filteredFiles = files.filter(file => file.startsWith(`${type}-`));

        if (filteredFiles.length === 0) {
            return res.status(404).json({ error: `No ${type} images found` });
        }

        // Pick a random image file
        const randomIndex = Math.floor(Math.random() * filteredFiles.length);
        const randomImage = filteredFiles[randomIndex];

        // Send the image file
        res.sendFile(path.join(directoryPath, randomImage));
    });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}/`);
});
