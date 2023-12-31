const morgan = require('morgan');
const express = require('express');
const dotenv = require('dotenv');
const connect = require('./src/config/db')
dotenv.config({path:'./src/config/config.env'})

connect();


const app = express();



//LOgging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))