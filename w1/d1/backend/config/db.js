const mongoose = require('mongoose')
require('dotenv').config()
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        console.log('Database connected')
    } catch (e) {
        console.error('Database connection failed:', e)
        process.exit(1)
    }
}

const startServer = async (port, server) => {
    await dbConnection();

    server.listen(port, () => {
        console.log('Server up and running on port:', port)
    })
}

module.exports = startServer