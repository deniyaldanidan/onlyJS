const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})

router.get('/new-page(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
})

router.get('/old-page(.html)?', (req, res)=>{
    res.redirect(301, '/new-page.html');
})

router.get('/hello(.html)?', (req, res, next)=>{
    console.log("Attempted to open hello.html");
    next()
}, (req, res)=>{
    res.send("Hello World!")
})

const one = (req, res, next)=>{
    console.log("One");
    next();
}

const two = (req, res, next)=>{
    console.log("Two");
    next();
}

const three = (req, res)=>{
    res.send("Three");
}

router.get("/nums", [one, two, three]);

module.exports = router;