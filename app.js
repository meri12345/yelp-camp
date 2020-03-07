var express = require("express");
var app = express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useUnifiedTopology:true, useNewUrlParser:true});

var campSchema = new mongoose.Schema({
	name: String,
	image: String,
	desc: String
});

var Camp = mongoose.model("Camp",campSchema);

// Camp.create({
// 	name:"Great Smokey Mountain",
// 	image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80",
// 	desc:"You shoudl go there"
// },(err,item)=>{
// 	if(err){
// 		console.log("ERROR");
// 	}
// 	else{
// 		console.log("*************SUCCESS************")
// }})

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs")


var list =[
	{name:"Great Smokey Mountain",image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80"},
	{name:"Yosemite National Park",image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80"},
	{name:"Acadia National Park",image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80"},
	{name:"Hot Springs National Park",image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80"},
	{name:"Biscayne National Park",image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80"},
	{name:"Great Smokey Mountain",image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80"},
	{name:"Yosemite National Park",image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80"},
	{name:"Acadia National Park",image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80"},
	{name:"Hot Springs National Park",image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80"},
	{name:"Biscayne National Park",image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80"}
]

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
	Camp.findById(req.params.id,(err,item)=>{
		if(err){
			console.log("ERROR");
		}
		else{
			
			res.render("show",{camp:item});
		}
	})
	
})

app.listen(3000,()=>{
	console.log("SERVER STARTED");
})