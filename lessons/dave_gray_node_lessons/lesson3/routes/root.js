const express = require('express');
const path = require("path");

const router = express.Router();

router.get("^/$|^/index(.html)?$", (req, res)=>{
    // res.sendFile("./views/index.html", {root: __dirname});
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res)=>{
    res.redirect(301, "new-page.html");
});

// Chaining routes
const one = (req, res, next)=>{
    console.log("Chain 1");
    next();
}

const two = (req, res, next)=>{
    console.log("Chain 2");
    next();
}

const three = (req, res)=>{
    console.log("Chain 3");
    res.send("Chain is completed");
}

router.get("^/chain(.html)?$", [one, two, three]);

module.exports = router;