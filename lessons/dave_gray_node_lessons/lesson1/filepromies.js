const {readFile, writeFile, appendFile, rename, unlink} = require("fs").promises
const path = require("path");


const fileOps = async()=>{
    try {
        // console.log("Starting process");
        let myFilePath = path.join(__dirname, "resources", "written-promise1.txt");
        let myNewPath = path.join(__dirname, "resources", "renamed-written-promise1.txt");
        await writeFile(myFilePath, "This is written using fs promises\n");
        await appendFile(myFilePath, "This is appended text using fs promises");
        await rename(myFilePath, myNewPath);
        let data = await readFile(myNewPath, "utf8");
        console.log(data);
        await unlink(myNewPath);
    } catch (error) {
        console.error(error);
    }
}

fileOps()