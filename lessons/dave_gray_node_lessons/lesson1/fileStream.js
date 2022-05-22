const { createReadStream, createWriteStream } = require("fs");
const path = require("path");

const rs = createReadStream(path.join(__dirname, "resources", "lorem.txt"), {encoding: "utf-8"});

const ws = createWriteStream(path.join(__dirname, "resources", "new-lorem.txt"));

// rs.on('data', dataChunk=> ws.write(dataChunk));

rs.pipe(ws);