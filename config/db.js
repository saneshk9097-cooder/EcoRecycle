const mongoose = require('mongoose');

// Cache the database connection for serverless environment
let isConnected = false;

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error('\n========================================');
        console.error('[DATABASE CONFIGURATION ERROR]');
        console.error('MONGODB_URI environment variable is missing.');
        console.error('Please configure MONGODB_URI in your environment or Render dashboard.');
        console.error('========================================\n');
        process.exit(1);
    }

    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('\n========================================');
        console.error('[MONGODB CONNECTION ERROR]');
        console.error('Failed to establish connection to database:', err.message);
        console.error('\nTroubleshooting recommendations:');
        console.error('1. Verify that your MONGODB_URI is correct in the environment.');
        console.error('2. IMPORTANT (for Render/Production): Ensure your MongoDB Atlas cluster has');
        console.error('   IP Access List configured to allow access from anywhere (0.0.0.0/0).');
        console.error('   Since Render outward IPs are dynamic, restricting IPs will cause connection timeouts.');
        console.error('========================================\n');
        throw err;
    }
};

module.exports = connectDB;
