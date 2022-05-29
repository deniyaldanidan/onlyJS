require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { default: mongoose } = require('mongoose');
const connectDB = require('./config/dbConn');

const app = express()
const PORT = process.env.PORT || 8081;
connectDB();
// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
// Default Home Route
app.get("/", (req, res)=>{
    res.status(200).json({'success': "This is home page"});
})
// Route for task Api
app.use("/tasks", require('./routes/task'));
// 404 & error handlers
app.all("*", require("./middlewares/handle404"));
app.use(require("./middlewares/errorHandler"));

mongoose.connection.once("open", ()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>console.log(`App is running on ${PORT}`));
})
