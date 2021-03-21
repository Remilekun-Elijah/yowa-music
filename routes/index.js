// jshint esversion: 8
var express = require('express');
const nodemailer = require("nodemailer");
let createError = require("http-errors");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Yowa Music' });
    next();
}).get('/songs', function(req, res, next) {
    res.render('songs', { title: "All of my songs" });
    next();
}).post('/subscribed', function(req, res, next) {

    const adminEmail = "remilekunelijah21997@yahoo.com, juwonofficial@yahoo.com, ewmrhumr@yowamusic.com.ng";

    async function main() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "host11.registrar-servers.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "_mainaccount@yowamusic.com.ng", // generated ethereal user
                pass: "09023007389@fb.com", // generated ethereal password
            },
        });
        // send mail with defined transport object
        let adminMsg = await transporter.sendMail({
            from: `"Yowa Music" <ewmrhumr@yowamusic.com.ng>`, // sender address
            to: `remilekunelijah21997@yahoo.com, juwonofficial@yahoo.com, ewmrhumr@yowamusic.com.ng`, // list of receivers
            subject: "New Newsletter Subscriber", // Subject line
            html: `
            <section style="box-shadow: 1px 1px 2px 5px rgba(10,10,10,0.97); color:#333;  background:white; text-align:center; max-width:80%; width:80%; margin: 50px 20px 50px 20px; padding: 20px 20px;">
            <h1 style="color:rgb(13, 110, 253); margin-bottom: 40px; text-align:center">YOWA MUSIC </h1>
            <h2 style='color:#333; font-size:20px'>  Below is the information of the subscriber</h2>
                    <p style="font-size:20px; margin-bottom:10px"><span style="font-weight:600">Name:</span> ${req.body.name}</p>
                    <p style="font-size:20px; text-decoration:none; color: #333 !important"><span style="font-weight:600">Email:</span> ${req.body.email}</p>
                
                <section style="text-align: center">
            <hr style="margin-top: 40px">
            
            <p style='margin-top: 10px; font-size: 18px'>Yowa music &copy; 2021, all rights reserved.</p>
            </section>
            </section>`

        });
        console.log("Message sent: %s", `${adminMsg.messageId} ${adminEmail}`);

        // send mail with defined transport object
        let userMsg = await transporter.sendMail({
            from: `"Yowa Music" <ewmrhumr@yowamusic.com.ng>`, // sender address
            to: `${req.body.email}`, // list of receivers
            subject: "Thanks for subscribing to our newsletter", // Subject line
            html: `
            <body style='display: flex; flex-direction: column; justify-content: center;  background:#eee;  '>
            
            <section id='body' style="box-shadow: 1px 1px 2px 5px rgba(10,10,10,0.97); color:#333;  background:white; max-width:80%; width:80%; margin: 50px auto 50px auto; padding: 5px 20px;">
            <h1 style="color:rgb(13, 110, 253); margin-bottom: 40px; text-align:center">YOWA MUSIC </h1>
            <p style='font-size:18px;'>Hey ${req.body.name}!</p>
            <p style='font-size:18px; padding-top: 10px'> We want to thank you personally for subscribing to our newsletter.</p>
            <p style='font-size:18px'>As promised, we won't be sharing your email with anyone, we will only send you message whenever we have a new update on our website <b><a style='color:rgb(13, 110, 253); text-decoration: none;' href='http://yowamusic.com.ng'>yowamusic.com.ng</a></b>
            </p> 
            <p style='font-size:17px; margin-top: 30px; margin-bottom:0'>- Management </p>
            <p style='font-size:17px; margin-top:0'><span style='visibility: hidden; color:transparent;'>-</span> <span style='color:#aaa'>Yowa Music</span>.</p>
            
           
            <section style="text-align: center">
            <hr style="margin-top: 35px">
            <h2 style='color:#333; font-size:20px'> Useful links</h2>
            
            <div style="display: -webkit-box; -webkit-box-pack: center;">
            <ul style=" margin: 1px auto 1px auto; display: flex; flex-direction: row; justify-content: center;">
                
            <li style='font-size:17px; list-style-type:none;'><a style="text-decoration: none" href='http://yowamusic.com.ng'>Home</a></li>
                <li style='font-size:17px; list-style-type:none; color:#333'>|</li>
                <li style='font-size:17px; list-style-type:none;'><a style="text-decoration: none" href='http://yowamusic.com.ng/songs'>Songs</a></li>
                <li style='font-size:17px; list-style-type:none; color:#333'>|</li>
                <li style='font-size:17px; list-style:none;'><a style="text-decoration: none" href='http://yowamusic.com.ng/gallery'>Gallery</a>
            </li>
            </ul>
            </div>
            <p style='margin-top: 10px; font-size: 16px'>Yowa music &copy; 2021, all rights reserved.</p>
            </section>
            </section>
            </body>
            ` // html body
        });

        console.log("Message sent: %s", `${userMsg.messageId} ${req.body.email}`);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        res.render("home", {
            title: req.body.name
        });

    }

    main().catch(console.error);

});

module.exports = router;