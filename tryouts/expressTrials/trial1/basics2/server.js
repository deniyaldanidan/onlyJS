const express = require('express');
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const handle_404 = require('./middleware/404Handler');

const app = express();

//* custom logging-middleware
app.use(logger);
//* third-party-cors-middleware
app.use(cors(require('./config/corsOptions')));
//* built-in middleware to handle form-data|url-encoded-data
app.use(express.urlencoded({extended:false}));
//* built-in middleware for handling json-data
app.use(express.json());
//* buiil-in middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')))

//* routes 
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'));


//* 404 & error handlers
app.all('*', handle_404)
app.use(errorHandler)

app.listen(PORT, ()=>console.log(`Server listening on ${PORT}`));