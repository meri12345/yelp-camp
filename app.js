var express = require("express");
var app = express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Camp=require("./models/campground");
var seedDB = require("./seeds");
var Comment=require("./models/comment");


// seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useUnifiedTopology:true, useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

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
		res.render("campgrounds/index",{list:items})
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

app.get("/campgrounds/:id/comments/new",(req,res)=>{
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

app.listen(3000,()=>{
	console.log("SERVER STARTED");
})