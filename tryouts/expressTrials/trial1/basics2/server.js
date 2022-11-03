require('dotenv').config()
const express = require('express');
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const handle_404 = require('./middleware/404Handler');
const cookie_parser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const db_connect = require('./config/db_connect');

const app = express();

//* Connect to DB
db_connect();

//* custom logging-middleware
app.use(logger);
//* third-party-middleware for handling cookies
app.use(cookie_parser()); 
//* Handle credentials
app.use(credentials);
//* third-party-cors-middleware
app.use(cors(require('./config/corsOptions')));
//* built-in middleware to handle form-data|url-encoded-data
app.use(express.urlencoded({extended:false}));
//* built-in middleware for handling json-data
app.use(express.json());
//* buiil-in middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')))

//* basic-routes 
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'))
//*auth routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//* api route
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));


//* 404 & error handlers
app.all('*', handle_404)
app.use(errorHandler)

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>console.log(`Server listening on ${PORT}`));
})