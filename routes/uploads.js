const express = require("express"),
    multer = require('multer'),
    upload = multer({ dest: 'uploads/' }),
    router = express.Router();
// app = express();

function file(req, res, next) {
    console.log("file middleware");
}
router.post('/upload', file, (req, res) => {
    res.send("you are here !");
});

module.exports = router;