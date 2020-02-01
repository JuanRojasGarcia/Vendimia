var express = require("express");
var router = express.Router();
var port = 3000;
 
router.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
 
module.exports = router;


