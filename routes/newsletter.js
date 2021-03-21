// jshint esversion:6
var express = require('express');
var router = express.Router();

router.post('/subscribed', (req, res, next) => {

    console.log(req.params);
    res.send("<h1>Thanks for subscribing to our newsletter, we are now redirecting you back to the home page</h1>");

});

module.exports = router;