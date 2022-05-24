const { format } = require("date-fns");
const { v4:uuid } = require("uuid");

const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async(message, logName)=>{
    const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    
    if (! fs.existsSync(path.join(__dirname, '..' ,"logs"))) fs.mkdirSync(path.join(__dirname, "logs"));
    try {
        await fsPromises.appendFile(path.join(__dirname, '..' , "logs", `${logName}.txt`), logItem);
    } catch (error) {
        console.error(error);
    }

}

const logger = (req, res, next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`, 'reqLog')
    next();
};

const errLogger = (err)=>{
    logEvents(`${err.name}\t${err.message}`, 'errLog');
}

module.exports = {logEvents, logger, errLogger};