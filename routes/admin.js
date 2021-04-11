// jshint esversion:8
const express = require('express'),
    session = require('express-session'),
    app = express(),
    mongoose = require("mongoose"),
    multer = require('multer'),
    bcrypt = require("bcrypt");
if (app.get("env") === 'NODE_ENV') require("dotenv/config");

console.log(app.get("env"));
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

router.get("/", isLoggedIn, (req, res) => {
        // session.id = "John Doe";
        admin.find().then((err, doc) => {
            {
                if (!doc) return console.error(err);
                console.log(doc)
            }
        })
        res.render("admin");
    })
    .post('/', async(req, res) => {
        try {
            let v = await admin.findOne({ email: req.body.email });

            // function(err, doc) {
            if (!v) {
                res.status(404).json({ msg: "User not found!", success: false });
                // console.log(err);
                return;
            }
            // })


            bcrypt.compare(req.body.password, v.password, (err, same) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({ msg: "Password incorrect.", success: false });
                } else if (same === true) {
                    let n = new Date();
                    n.setDate = n.getDate() + 7;

                    res.cookie('info', { name: `${v.name}`, email: `${v.email}` }, { maxAge: 604800000, path: "/", encode: String });

                    res.json({ data: v.name, success: true });

                } else res.status(400).json({ msg: "Password is not correct.", success: false });
            })
        } catch (error) {
            console.error(error);
            res.redirect("/admin")
        }

    })

async function getFile(name) {

    return name.find();
}
router.get("/:email", async(req, res) => {
    let audio = await getFile(song);
    let vid = await getFile(video);
    let img = await getFile(image);
    // console.log(vid);
    if (req.cookies.info) {
        if (req.cookies.info.email === req.params.email) {
            try {
                admin.findOne({ email: req.params.email }, (err, doc) => {
                    if (doc) {
                        let c = doc.name.split(' ');
                        if (c.length >= 2 && c.length <= 3) c = c[0];
                        else c = doc.name;
                        console.log(c);
                        res.render("dashboard", { data: doc, name: c, song: audio, video: vid, img: img });
                        // res.status(200).json({ data: doc, success: true });
                        // console.log(new session.Cookie());
                    } else {
                        res.clearCookie("info");
                        res.redirect("/admin");
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
// console.log()
router.post('/:email/upload', upload.single('file'), file, (req, res) => {
    console.log("we are here");

    res.redirect(`../${req.cookies.info.email}`);
}).delete('/:email/delete', async(req, res) => {
    // res.send("YOU ARE HERE");
    // if(req.query.file.split('/'))

    // let s = req.query.file.split('/');
    let fs = require('fs/promises');
    let file = req.query.file.split('/')[3];
    // if (s[s.length - 2] === 'musics') {
    try {
        // console.log()

        if (file === "videos") file = video;
        else if (file === "musics") file = song;
        else file = image;

        let f = await file.findOneAndDelete({ path: req.query.file });
        console.log(f);
        fs.unlink(__dirname + '/../' + `public${f.path}`).catch(er => {
            console.error(er);
            res.status(400).json({ msg: "This file isn't on our server anymore." });
        });
        res.status(200).json({ msg: 'File deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: "This file isn't on our server anymore." });
        res.end();
    }
    // }

    console.log();
    res.status(200)
}).delete('/:email/destroyAccount', async(req, res) => {

    try {

        let f = await admin.findOneAndDelete({ name: req.cookies.info.name });
        console.log(f);

        res.status(200).json({ msg: 'Account has been deleted.' });
        res.clearCookie('info');
    } catch (err) {
        console.error(err);
    }

})
module.exports = router;