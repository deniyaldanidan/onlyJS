const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
eventEmitter.on("log", (msg, fileName)=>logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) =>{
    try {
        const rawData = await fsPromises.readFile(filePath, !contentType.includes('image') ? 'utf-8' : '');
        
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        
        response.writeHead(filePath.includes('404.html') ? 404 :200, {'Content-Type': contentType});
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (error) {
        console.log(error);
        eventEmitter.emit("log", `${error.name}:${error.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end()
    }
}

const server = http.createServer((req, res)=>{
    eventEmitter.emit("log", `${req.url}\t${req.method}`, 'reqLog.txt');
    
    const extension = path.extname(req.url);
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath;

    if (contentType === 'text/html' && req.url === '/') {
        filePath = path.join(__dirname, 'views', 'index.html');
    } else if( contentType === 'text/html' && req.url.slice(-1) === '/' ){
        filePath = path.join(__dirname, 'views', req.url, 'index.html');
    } else if (contentType === 'text/html'){
        filePath = path.join(__dirname, 'views', req.url);
    } else{
        filePath = path.join(__dirname, req.url);
    }

    if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

    const fileExists = fs.existsSync(filePath);

    if (fileExists){
        serveFile(filePath, contentType, res);
    } else{
        switch (path.parse(filePath).name){
            case "old-page":
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;
            case "www-page":
                res.writeHead(301, {'Location': '/'});
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
                break;
        }
    }
});

server.listen(PORT, ()=>console.log(`Server running on ${PORT}`));