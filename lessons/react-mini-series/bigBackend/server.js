require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8008;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(require('./middlewares/reqLogger'));

// default home root
app.get("^(\/|\/index|\/home)$", (req, res)=>{
    res.send("Home");
});



// 404 & error handlers
app.all("*", require('./middlewares/handle404'))
app.use(require('./middlewares/errorHandler'));

app.listen(PORT, ()=>console.log(`Server is running on ${PORT}`));

process.on("uncaughtException", (error)=>{
    console.log("An Error Occured");
    console.error(error);
    process.exit(1);
})