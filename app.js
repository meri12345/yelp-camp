var express = require("express");
var app = express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs")

var list =[
	{name:"Great Smokey Mountain",image:"https://pixabay.com/get/52e8d4444255ae14f6da8c7dda793f7f1636dfe2564c704c7d2c7fd1944ac751_340.jpg"},
	{name:"Yosemite National Park",image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2c7fd1944ac751_340.jpg"},
	{name:"Acadia National Park",image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2c7fd1944ac751_340.jpg"},
	{name:"Hot Springs National Park",image:"https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c7d2c7fd1944ac751_340.jpg"},
	{name:"Biscayne National Park",image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e507441762b7ed7904fcc_340.jpg"},
	{name:"Great Smokey Mountain",image:"https://pixabay.com/get/52e8d4444255ae14f6da8c7dda793f7f1636dfe2564c704c7d2c7fd1944ac751_340.jpg"},
	{name:"Yosemite National Park",image:"https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2c7fd1944ac751_340.jpg"},
	{name:"Acadia National Park",image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2c7fd1944ac751_340.jpg"},
	{name:"Hot Springs National Park",image:"https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c7d2c7fd1944ac751_340.jpg"},
	{name:"Biscayne National Park",image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e507441762b7ed7904fcc_340.jpg"}
]

app.get("/",(req,res)=>{
	res.render("landing");
})

app.post("/campgrounds",(req,res)=>{
	var name = req.body.name;
	var image = req.body.image;
	list.push({name:name,image:image})
	res.redirect("/campgrounds");
})

app.get("/campgrounds/new",(req,res)=>{
	res.render("new");
})

app.get("/campgrounds",(req,res)=>{
	
	res.render("campgrounds",{list:list});
})

app.listen(3000,()=>{
	console.log("SERVER STARTED");
})