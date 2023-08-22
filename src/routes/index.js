const express = require('express');
const router = express.Router();

// Middleware for logging each request
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Example endpoint
router.get('/status', (req, res) => {
    res.send({ status: 'OK' });
});

// Another example endpoint to fetch data for a specific game (placeholder)
router.get('/data/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    // For now, just send a placeholder response
    res.send({ gameId, data: 'Game data here' });
});

// Centralized error handler
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

module.exports = router;
