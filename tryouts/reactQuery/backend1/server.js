require('dotenv').config();
const express = require('express');
const {json, urlencoded} = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const basicRouter = require('./routers/basicRouter');
const {connectDB} = require('./config/dbConn');
const authRouter = require('./routers/authRouter');

const whitelist = ['http://localhost:3000'];
const app = express();

app.use(cors({
    origin: (origin, callback) => {
        if (!whitelist.find(wl => wl === origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}));

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', basicRouter);
app.use("/auth", authRouter);

connectDB(()=>{
    app.listen(3500, () => {
        console.log("Server is running on port 3500")
    })
})