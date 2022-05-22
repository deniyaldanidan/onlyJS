const {mkdir, existsSync, rmdir} = require('fs');
const path = require('path');

const myDirPath = path.join(__dirname, "resources", "testdir");

if(!existsSync(myDirPath)){   
    mkdir(myDirPath, err=>{
        if(err) throw err;
        console.log('Directory created');
    })
}
    
if (existsSync(myDirPath)) {
    rmdir(myDirPath, err=>{
        if(err) throw err;
        console.log('Directory removed');
    });
}

process.on("uncaughtException", (err)=>{
    console.log(err);
    process.exit(1);
});