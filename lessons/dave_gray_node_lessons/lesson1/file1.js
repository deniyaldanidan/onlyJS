const {readFile, writeFile, appendFile} = require('fs');
const path = require('path');

process.on("uncaughtException", err=>{
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})

readFile(path.join(__dirname, "resources", 'hello.txt'), "utf8", (err, data)=>{
    if (err) throw err;
    console.log(data);
}
);

writeFile(path.join(__dirname, "resources", "written1.txt"), "Hello reader\nI'm an author", err=>{
    if(err) throw err;
    console.log("Write complete")
    
    appendFile(path.join(__dirname, "resources", "written1.txt"), "\nreader-replied\nHey I'm a reader", err=>{
        if(err) throw err;
        console.log("Append complete")
    });
});

