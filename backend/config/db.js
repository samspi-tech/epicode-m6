const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
    } catch (e) {
        console.error('Database connection failed:', e);
        process.exit(1);
    }
};

const startServer = async (port, server) => {
    await dbConnection();

    server.listen(port, () => {
        console.log('Server up and running on port:', port);
    });
};

module.exports = startServer;
