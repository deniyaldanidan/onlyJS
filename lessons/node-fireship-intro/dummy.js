const { EventEmitter } = require("events");
const { readFile, readFileSync } = require('fs');

const {readFile: readFilePromise} = require('fs').promises;

console.log("Hello");
console.log(process.platform);


process.on("exit", function () {
    console.log("Code is Ended");
});

const eventEmitter = new EventEmitter();
// Creating a custom event called lunch
eventEmitter.on('lunch', function(){
    console.log("It is lunch time");
});

// Emitting the created event.
eventEmitter.emit("lunch");

// const txt = readFileSync("./hello.txt", 'utf-8');

// readFile("./hello.txt", "utf8", (err, txt)=> err ? console.log(err) : console.log(txt) );

// const txt = async ()=> await readFilePromise("./hello.txt", 'utf-8');
// txt().then((res)=>console.log(res));

async function txt(){
    let txt = await readFilePromise("./hello.txt", 'utf-8');
    console.log(txt);
}

txt();
