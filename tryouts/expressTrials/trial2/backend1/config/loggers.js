const fs = require('fs');
const path = require('path')

if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
    fs.mkdir(path.join(__dirname, '..', 'logs'), err=>{
        if(err){
            throw err;
        }
    });
}

const infoStream = fs.createWriteStream(path.join(__dirname, '..', 'logs', 'info.log'), { flags: "a" });
const errorStream = fs.createWriteStream(path.join(__dirname, '..', 'logs', 'error.log'), { flags: "a" });


const infoLog = (message, log = true) => {
    const data = `${new Date().toLocaleString('en-GB', {timeZone: "IST"})} ${message}\n`;
    log && console.log(data);
    infoStream.write(data)
}

const errLog = (message, log = true) => {
    const data = `${new Date().toLocaleString('en-GB', {timeZone: "IST"})} ${message}\n`;
    log && console.log(data);
    errorStream.write(data)
}

module.exports = { infoLog, errLog };