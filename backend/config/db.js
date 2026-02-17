const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        if (error.message.includes('querySrv ECONNREFUSED')) {
            console.log('\x1b[33m%s\x1b[0m', 'Tip: Your DNS provider might be blocking SRV records. Try changing your DNS to 8.8.8.8 or 1.1.1.1, or use the standard connection string.');
        }
        // Don't exit process in development to allow server to still serve static files if needed
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
