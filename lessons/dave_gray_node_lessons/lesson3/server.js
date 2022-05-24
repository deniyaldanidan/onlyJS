const express = require('express');
const path = require("path");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500;

// Built-in middlewares
// Content-Type: application/x-www-form-urlencoded [For Submitted-Form-Data]
app.use(express.urlencoded({extended: false}));
// [For Submitted-Json-data]
app.use(express.json());
// Serve Static Files
app.use(express.static(path.join(__dirname, "/public")));

// Custom middlewares
app.use(require("./middleware/logEvents").logger);

// Third-party middleware
const corsOptions = require('./config/corsOptions');
app.use(cors(corsOptions));

// My Routes
app.use("/", require("./routes/root"));
app.use("/subdir", require('./routes/subdir'));
// Authentication routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
// API route
app.use("/employees", require("./routes/api/employees"));

// 404 & Error handlers.
app.all("*", require("./middleware/handle404"));
app.use(require('./middleware/errorHandler'));

app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));

// process.on("uncaughtException", (err)=>{
//     errLogger(err);
// })