const express = require("express"), 
           morgan = require("morgan"), 
           bodyparser = require("body-parser"), 
           path = require("path"), 
           app = express();
           
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "/public"))); 
/*app.get("/", (req, res) => {
    res.sendFile(__dirname+/index.html))
}; */
app.post("/register", (req, res)=>{ 
    console.log(req.body);
    res.send("User has been successfully registered"); 
});

app.listen(3000, ()=> console.log("App is listening on port 3000"));