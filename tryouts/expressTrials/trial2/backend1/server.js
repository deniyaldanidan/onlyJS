require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const credentials = require('./middlewares/credentials');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const db_connect = require('./config/db_connect');
const { default: mongoose } = require('mongoose');

const app = express()
const PORT = process.env.PORT || 3500

db_connect();

//* Middlewares
app.use(logger);
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
    app.listen(PORT, ()=>console.log(`Server running in port ${PORT}`));
})