const express = require('express');
const path = require('path');
const fs = require('fs');
const getProductImages = require('./hello-world/hello-world.js'); // Assuming it's in the same directory

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

// Endpoint to get product image filenames
app.get('/product-images', getProductImages);

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}/`);
});
