const express = require('express');
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');

const app = express();
const PORT = process.env.PORT || 3500;

// ? Built-in middlewares
// ? Content-Type: application/x-www-form-urlencoded [For Submitted-Form-Data]
app.use(express.urlencoded({extended: false}));
// ? [For Submitted-Json-data]
app.use(express.json());
// ? Serve Static Files
app.use(express.static(path.join(__dirname, "/public")));

// ? Custom middlewares
app.use(require("./middleware/logEvents").logger);
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');

// ? Third-party middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

// ? Routes
app.use("/", require("./routes/root"));
app.use("/subdir", require('./routes/subdir'));
// ? Authentication routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require('./routes/refresh'));
app.use("/logout", require("./routes/logout"));
// ? API routes 
app.use("/employees", verifyJWT, require("./routes/api/employees"));

// ? 404 & Error handlers.
app.all("*", require("./middleware/handle404"));
app.use(require('./middleware/errorHandler'));

app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));

// process.on("uncaughtException", (err)=>{
//     errLogger(err);
// })