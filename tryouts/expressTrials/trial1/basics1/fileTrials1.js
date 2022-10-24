const path = require('path');
const fsPromises = require('fs').promises;
const fs = require('fs');
/*
! callback hell
fs.writeFile(path.join(__dirname,'assets','sample1.txt'), 'Hey Allen, How are ya?' , err=>{
    if(err) throw err;
    console.log("Write Completed");
    fs.appendFile(path.join(__dirname,'assets','sample1.txt'), '\nI\'m good, Allen. How are you?' , err=>{
        if(err) throw err;
        console.log("Append Completed");
        fs.readFile(path.join(__dirname,'assets','sample1.txt'), 'utf-8' , (err, data)=>{
            if(err) throw err;
            console.log(data);
            fs.rename(path.join(__dirname,'assets','sample1.txt'), path.join(__dirname,'assets','renamedSample1.txt') , err=>{
                if(err) throw err;
                console.log("Rename Completed");
            })
        })
    })
})
*/

if(!fs.existsSync('./assets')){
    fs.mkdir('./assets', err=>{
        if (err){
            throw err;
        }
        console.log('Directory is created');
    })
} else{
    console.log("assets folder already exist");
}
// to delete a folder use fs.rmdir

const fileOps = async ()=>{
    try {
        await fsPromises.writeFile(path.join(__dirname, 'assets', 'sample1.txt'), 'Hey Allen, How are ya?');
        await fsPromises.appendFile(path.join(__dirname, 'assets', 'sample1.txt'), '\nI\'m good, How are ya?');
        const data = await fsPromises.readFile(path.join(__dirname, 'assets', 'sample1.txt'), 'utf-8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'assets', 'renamedSample1.txt'));
        await fsPromises.rename(path.join(__dirname, 'assets', 'sample1.txt'), path.join(__dirname, 'assets', 'renamedSample1.txt'));
    } catch (error) {
        console.log(error)
    }
}

fileOps();
/*
// ? before uncommenting this code create a textfile named lorem.txt and write something big in it
const rs = fs.ReadStream('./assets/lorem.txt', {encoding: "utf8"});
const ws = fs.WriteStream('./assets/loremNew.txt');
// rs.on('data', dataChunk=>{
//     ws.write(dataChunk);
// })
rs.pipe(ws)
*/
// exit on unCaught error
process.on("uncaughtException", err=>{
    console.error('Uncaught Error', err);
    process.exit(1)
})