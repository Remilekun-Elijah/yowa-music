var express = require("express"),
    router = express.Router(),
    path = require('path');

router.get('/public', (req, res) => {
    res.sendFile('../public/images/favicon.png');
    // res.send('Hello');
});

module.exports = router