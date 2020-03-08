var express = require("express");
var app = express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Camp=require("./models/campground");
var seedDB = require("./seeds");

// seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useUnifiedTopology:true, useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs")


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
	res.render("new");
})

app.get("/campgrounds",(req,res)=>{
	Camp.find({}).then((items)=>{
		res.render("index",{list:items})
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
			console.log(item);
			res.render("show",{camp:item});
		}
	})
	
})

app.listen(3000,()=>{
	console.log("SERVER STARTED");
})