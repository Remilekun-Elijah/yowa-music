var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('songs.ejs', {title: "All of my songs"});
});

module.exports = router;