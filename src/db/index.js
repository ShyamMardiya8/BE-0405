const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const DBURI = process.env.MONOGO_URI

const dbConnections = async () => {
    try {
        const data = await mongoose.connect(DBURI)
        console.log("======================> Database connected successfully", data.connection.name);
        return data.connection
    } catch (error) {
        console.error(error, "===>db/index.js")
    }
}

module.exports = {dbConnections}