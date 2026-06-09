const db = require('./src/db/index');
const express = require('express');
const dotenv = require("dotenv");
const ErrorHandler = require('./src/utility/ErrorHandler');
const routes = require('./src/Routes/index')
dotenv.config()

const PORT = process.env.PORT

const app = express();

db.dbConnections();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', routes)
app.use(ErrorHandler);
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})
