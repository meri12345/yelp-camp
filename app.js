var express = require("express");
var app = express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Camp=require("./models/campground");
var seedDB = require("./seeds");
var User = require("./models/user");
var passport = require("passport");
var LocalStrategy=require("passport-local")
var Comment=require("./models/comment");
var sessionImport = require("express-session")


//seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useUnifiedTopology:true, useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));


app.use(sessionImport({
	secret:"Avada Kedavra",
	resave:false,
	saveUninitialized:false
}))

app.use((req,res,next)=>{
		res.locals.currentUser=req.user;
		next();
		})

app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",(req,res)=>{
	res.render("landing");
})

app.post("/campgrounds",(req,res)=>{
	var name = req.body.name;
	var image = req.body.image;
	var desc=req.body.desc;
	var obj = {name:name,image:image,desc:desc};
	Camp.create(obj,(err,item)=>{
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	})
	
})

app.get("/campgrounds/new",(req,res)=>{
	res.render("campgrounds/new");
})

app.get("/campgrounds",(req,res)=>{
	
	Camp.find({}).then((items)=>{
		res.render("campgrounds/index",
				   {list:items,currentUser:req.user})
	})
	.catch((err)=>{
		console.log(err);
	})
	
})

app.get("/campgrounds/:id",(req,res)=>{
	Camp.findById(req.params.id).populate("comments").exec((err,item)=>{
		if(err){
			console.log("ERROR");
		}
		else{
			
			res.render("campgrounds/show",{camp:item});
		}
	})
	
})

app.get("/campgrounds/:id/comments/new",isLoggedIn,(req,res)=>{
	Camp.findById(req.params.id,(err,item)=>{
		if(err){
			console.log(err);
		}
		else{
			
			res.render("comments/new",{camp:item});
		}
	})
	
})

app.post("/campgrounds/:id/comments",(req,res)=>{
	Camp.findById(req.params.id,(err,item)=>{
		if(err){
			console.log(err);
			res.redirect("/campgrounds")
		}
		else{
			Comment.create(req.body.comment,(err,comment)=>{
				if(err){
					console.log(err);
				}				
				else{
					item.comments.push(comment);
					item.save();
					res.redirect("/campgrounds/"+item._id);
					
				}
			})
		}
	})
})

app.get("/register",(req,res)=>{
	res.render("register");
})

app.post("/register",(req,res)=>{
	var newUser= new User({
		username:req.body.username
	})
	User.register(newUser,req.body.password,(err,user)=>{
		if(err){
			console.log(err);
			res.render("register");
		}
		else{
			passport.authenticate("local")(req,res,()=>{
	res.redirect("/campgrounds");
			})
		}
		
	})})

app.get("/login",(req,res)=>{
	res.render("login");
})

app.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),(req,res)=>{
})
	
app.get("/logout",(req,res)=>{
	req.logout();
	res.redirect("/campgrounds");
})

function isLoggedIn(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect("/login");
}

app.listen(3000,()=>{
	console.log("SERVER STARTED");
})