// // jshint esversion: 6
// require("dotenv/config");

// const express = require("express"),
//     { admin } = require("../models/user"),
//     mongoose = require("mongoose"),
//     bcrypt = require('bcrypt'),
//     saltRounds = 10,
//     router = express.Router();

// mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     // we're connected!
//     console.log("DB Connected!");
// });

// router.get("/admins", (req, res) => {
//     admin.find((err, data) => {
//         if (err) {
//             res.status(500).json({
//                 msg: "Internal server error, try again.",
//                 success: false
//             })
//             console.log(err);
//         }
//         if (data.length === 0) {
//             data = "Database is empty.";
//         }
//         res.status(200).json({
//             data,
//             success: true
//         });
//         console.log(data);
//     });

// }).get("/admin/:id", (req, res) => {
//     admin.findOne({ "_id": req.params.id }, (err, data) => {
//         if (!data) {
//             res.status(404).json({
//                 msg: "We don't have what you are looking for.",
//                 success: false
//             });
//             console.log(err);
//             return;
//         }
//         res.status(200).json({
//             data,
//             success: true
//         });
//         console.log(data);
//     });
// });

// // POST ROUTES
// router.post("/admin", (req, res) => {
//     let password;
//     bcrypt.hash(req.body.password, saltRounds).then(hash => {
//         console.log(hash);
//         password = hash;

//         const newAdmin = new admin({
//             name: req.body.name,
//             email: req.body.email,
//             password: password
//         });
//         newAdmin.save().then(data => {

//             res.status(201).json({
//                 data,
//                 "success": true
//             });
//             console.log(data);
//         }).catch(err => {
//             res.status(500).json({
//                 msg: "There was an error",
//                 success: false
//             });
//             throw err;
//         });

//     }).catch(err => {
//         res.status(500).json({
//             msg: "Error! Password hashing failed",
//             success: false
//         });
//         console.log(err)

//     });
//     console.log(req.body.name, req.body.password);
// });

// module.exports = router;