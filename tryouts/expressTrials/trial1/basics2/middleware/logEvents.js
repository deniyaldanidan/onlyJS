const { v4:uuid } = require('uuid');
const {format} = require('date-fns');
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const logEvents = async (message, logName)=>{
    const dateTime = format(new Date(), 'yyyyMMdd HH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, '..' , 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (error) {
        console.error(error);
    }
}

const logger = (req, res, next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(req.url, req.method);
    next()
}

module.exports = {logEvents, logger};