const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    // throw new Error("Throwing Trash");
    return res.json({message: "Welcome to Simple-Api"})
});

module.exports = router;