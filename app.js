const express = require("express"), 
           morgan = require("morgan"), 
           bodyparser = require("body-parser"), 
           path = require("path"), 
           app = express();
           
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "/public"))); 
app.get("/", (req, res) => {
    res.send(`<h1 style="color:teal"> Successfuly registered.</p> <p class="text-25"> Now redirecting you to the dashboard </p>`);
    res.redirect(__dirname+"/index.html");
});
app.post("/", (req, res)=>{ 
    console.log(req.body);
    res.send("User has been successfully registered"); 
});
app.post("signin", (req,res)=>{
	consoe.log(req.body);
});
app.listen(3000, ()=> console.log("App is listening on port 3000"));
