// jshint esversion:8
const express = require('express'),
    session = require('express-session'),
    app = express(),
    mongoose = require("mongoose"),
    multer = require('multer'),
    bcrypt = require("bcrypt");
require("dotenv/config");

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("DB Connected!");
});
const { Session } = require('express-session');
// const { post } = require('../../yowa-api/routes');
const { admin } = require("../models/user");
const { song } = require("../models/audios"), { video } = require("../models/videos"), { image } = require("../models/images");

// Populates req.session
console.log(process.env.SESSION_SECRET);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: true // don't create session until something stored
}));
ses = new session.Session(this, "id", { value: this.sessionID });
// cookie = 
router = express.Router();

function isLoggedIn(req, res, next) {
    if (req.cookies.info != undefined) {
        res.redirect(`/admin/${req.cookies.info.email}`);
    } else next();
}
async function getSong(req, res, next) {
    try {
        let d = await song.find();
        // console.log(d);
        req.data = d;
        next();
    } catch (err) {
        console.error(err);
    }
}
router.get("/", isLoggedIn, (req, res) => {
        // session.id = "John Doe";
        res.render("admin");

        // console.log("store in session: ", session.id);

    })
    .post('/', async(req, res) => {


        let v = await admin.findOne({ email: req.body.email },
            function(err, doc) {
                if (!doc) {
                    res.status(404).json({ msg: "User not found!", success: false });
                    console.log(err);
                } else {
                    // console.log(res.locals);
                    return doc;
                }
            }).catch(err => console.log(err));

        try {
            bcrypt.compare(req.body.password, v.password, (err, same) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({ msg: "Password incorrect.", success: false })
                } else if (same === true) {
                    let n = new Date();
                    n.setDate = n.getDate() + 7;

                    res.cookie('info', { name: `${v.name}`, email: `${v.email}` }, { maxAge: 604800000, path: "/", encode: String });

                    res.status(200).json({ data: v.name, success: true });

                } else res.status(400).json({ msg: "Password is not correct.", success: false });
            })
        } catch (error) {
            console.log(error);
            res.redirect("/admin")
        }

    }).get("/:email", getSong, (req, res) => {
        console.log(req.data);
        if (req.cookies.info) {
            if (req.cookies.info.email === req.params.email) {
                try {
                    admin.findOne({ email: req.params.email }, (err, doc) => {
                        if (doc) {
                            let c = doc.name.split(' ');
                            if (c.length >= 2 && c.length <= 3) c = c[0];
                            else c = doc.name;
                            console.log(c);
                            res.render("dashboard", { data: doc, name: c, song: req.data });
                            // res.status(200).json({ data: doc, success: true });
                            // console.log(new session.Cookie());
                        }

                    })
                } catch (err) {
                    console.log(err)
                }
            } else res.render("error")

        } else {
            res.redirect("/admin")
        }
    });

const upload = multer({ dest: 'public/images/uploads/' });

function saveFile(model, name, p, n, t, xl) {
    let file = new model({
        admin: name,
        path: p,
        name: n,
        type: t,
        xlink: xl
    });


    file.save().then(doc => {
        console.log(doc);
    }).catch(err => console.error(err));



}
async function file(req, res, next) {
    console.log(req.file.mimetype);
    let fs = require("fs/promises");
    try {

        let fname, path, src;
        if (req.file.mimetype.split('/')[0] == 'audio') {
            let fx10sion = req.file.mimetype.split("/")[1];
            fname = req.body.fname ? req.body.fname + `.${fx10sion}` : req.file.originalname;
            path = 'musics';
            src = `/images/uploads/${path}/${fname}`;
            saveFile(song, req.cookies.info.name, src, req.body.fname, req.body.ftype, req.body.exLink);

        } else if (req.file.mimetype.split('/')[0] == 'image') {
            let fx10sion = req.file.mimetype.split("/")[1];
            fname = req.body.fname ? req.body.fname + `.${fx10sion}` : req.file.originalname;
            path = 'images';
            src = `/images/uploads/${path}/${fname}`;
            saveFile(image, req.cookies.info.name, src, req.body.fname, req.body.ftype, req.body.exLink);

        } else if (req.file.mimetype.split('/')[0] == 'video') {
            let fx10sion = req.file.mimetype.split("/")[1];
            fname = req.body.fname ? req.body.fname + `.${fx10sion}` : req.file.originalname;
            path = 'videos';
            src = `/images/uploads/${path}/${fname}`;
            saveFile(video, req.cookies.info.name, src, req.body.fname, req.body.ftype, req.body.exLink);
        }

        fs.rename(__dirname + '/../' + `/${req.file.path}`, __dirname + '/../' + `/public${src}`);
        // console.log(file);

        console.log(req.file)
            // }
    } catch (err) {
        console.log(err);
    }
    next();
}

router.post('/:email/upload', upload.single('file'), file, (req, res) => {
    console.log("we are here");

    res.redirect(`../${req.cookies.info.email}`);
});

module.exports = router;