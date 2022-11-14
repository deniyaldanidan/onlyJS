require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const credentials = require('./middlewares/credentials');
const fs = require('fs');
const errorHandler = require('./middlewares/errorHandler');
const db_connect = require('./config/db_connect');
const { default: mongoose } = require('mongoose');
const {infoLog} = require('./config/loggers');
const morgan = require('morgan');
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3500

db_connect();

//* http-logger
morgan.token('myDate', ()=>new Date().toLocaleString('en-GB', {timeZone: "IST"}))
app.use(morgan(':myDate :url :method :remote-addr :status'))
app.use(morgan(':myDate :url :method :remote-addr :status', {stream: fs.createWriteStream(path.join(__dirname, 'logs', 'http.log'), {flags: "a"})}));

//* Middlewares
app.use(cookieParser());
app.use(credentials);
app.use(cors(require('./config/corsOptions')))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//* Routes
app.use("/", require('./routes/home'));
app.use("/", require('./routes/auth'))
app.use("/mini-blog", require('./routes/mini-blog'));
//* Handle 404 
app.use("*", require('./middlewares/404'));
//* error-handler
app.use(errorHandler);


mongoose.connection.once("open", ()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
        infoLog(`Server running in port ${PORT}`)
    });
});