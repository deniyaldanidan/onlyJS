const {
    add,
    subtract
} = require("./math")

const os = require('os');
const path = require('path');


console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(os.hostname());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));

console.log(add(34, 56), subtract(45, 67));