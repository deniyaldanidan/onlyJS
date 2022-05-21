const express = require('express');
const { readFile } = require('fs').promises;

const app = express();

app.get("/", async(req, res)=>{
    console.log(req.baseUrl);
    res.send(await readFile("./index.html", "utf8"));
});

app.listen(3000, ()=>console.log("App is running on 3000"));