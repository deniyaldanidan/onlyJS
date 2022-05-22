const { format } = require("date-fns");
const { v4:uuid } = require("uuid");

const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async(message, logName)=>{
    const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    
    if (! fs.existsSync(path.join(__dirname, "logs"))) fs.mkdirSync(path.join(__dirname, "logs"));
    try {
        await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
    } catch (error) {
        console.error(error);
    }

}

module.exports = logEvents;