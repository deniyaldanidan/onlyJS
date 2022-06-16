require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectMonDB = require('./config/mondbConn');
const { default: mongoose } = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8008;
connectMonDB()

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(require('./middlewares/reqLogger'));

// default home root
app.get("^(\/|\/index|\/home)$", (req, res)=>{
    res.send("Home");
});

// People API Root
app.use("/peoples", require('./routes/peoplesApi'));



// 404 & error handlers
app.all("*", require('./middlewares/handle404'))
app.use(require('./middlewares/errorHandler'));

mongoose.connection.once("open", ()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>console.log(`Server is running on ${PORT}`));
})

process.on("uncaughtException", (error)=>{
    console.log("An Error Occured");
    console.error(error);
    process.exit(1);
})