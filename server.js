const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

//exporting multer funciton 
const upload  = require('./config/multer');
const user = require('./models/user');
const { fileLoader } = require('ejs');
app.listen(3000);

//mongodb connection 

const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);


console.log("URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
})
.then(() => console.log("MongoDB Connected"))
.catch(err => {
    console.log("FULL ERROR:");
    console.log(err);
});







//setting up ejs
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));



//dashbarod for register  
app.get('/', (req, res) => {
    res.render("register");
})



//register account
app.post('/register', async (req, res) => {
    let { email, password, username, name, age } = req.body;
    let existinguser = await userModel.findOne({ email });
    if (existinguser) return res.status(500).send("User already registered");

    const hash = await bcrypt.hash(password, 10);
    let user = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash
    })
    let token = jwt.sign({ email: email, userid: user._id }, "shhhhhh");
    res.cookie("token", token);
    res.redirect("/login");


})



// login page
app.get('/login', (req, res) => {
    res.render("login");
})

//login authentication 
app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let existuser = await userModel.findOne({ email });
    if (!existuser) return res.status(500).send("Something went wrong ");

    bcrypt.compare(password, existuser.password, (err, result) => {
        if (result){
            let token = jwt.sign({ email: email, userid: existuser._id }, "shhhhhh");
        res.cookie("token", token);
        res.redirect("/profile");
        }else {
            res.redirect('/login');
        }
    })
})



//logout page 
app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect("login");
})


//middleware for getting into anyother pages (by login & logout checking)
function isLoggedIn (req, res, next) {
    if (req.cookies.token === "")
        return  res.redirect("/login");
    else {
        let data = jwt.verify(req.cookies.token, "shhhhhh");
        req.user = data;
        next();
    }
    
}


//profile page
app.get('/profile',isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("posts");
    
    res.render("profile",{user});
})


// post creation 
app.post("/post",isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    let {content}  = req.body;
    let post = await postModel.create({
        user:user._id,
        content: content,

    })

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
})


//creating like
app.get("/post/:id" ,isLoggedIn, async (req,res)=>{
     let post = await postModel.findOne({_id:req.params.id}).populate("user");
     if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
     }else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
     }

     await post.save();
     res.redirect("/profile");
})


//edit feature 
app.get("/edit/:id" , isLoggedIn, async(req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user");
    res.render("edit",{post});
})



//update post content
app.post("/update/:id" , isLoggedIn, async(req,res)=>{
    let post = await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content});
    res.redirect("/profile");
})



//-----------porifle pic upload
app.get("/profile/upload", isLoggedIn, async (req,res)=>{
    res.render("profileupload");
})


//UPLOAD ROUTE 
app.post("/upload", isLoggedIn, upload.single('image'), async (req, res) => {
    console.log(req.file.filename);
    console.log(req.user);

    await userModel.findOneAndUpdate(
        { _id: req.user.userid },
        { profilepic: req.file.filename }
    );

    res.redirect('/profile');
});