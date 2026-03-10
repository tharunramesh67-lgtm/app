require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Static File Serving (React Frontend)
app.use(express.static(path.join(__dirname, '../client/dist')));

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Catch-all route to serve the React frontend
app.get(/.*/, (req, res) => {
    // If the request starts with /api but isn't matched above, return 404
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' });
    }

    // Serve index.html for all other routes (React Router support)
    const indexPath = path.join(__dirname, '../client/dist', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            // Fallback if the build folder doesn't exist yet
            res.json({
                message: 'Welcome to the MERN API',
                environment: process.env.NODE_ENV || 'development',
                frontendStatus: 'Build files not found. Run npm run build in client folder.'
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
