var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");

/*=============
----ROUTES-----
==============*/

app.get("/", function(req, res){
	res.render("search");
});

app.get("/results", function(req, res){
	var query = req.query.search;
	var url = "https://api.magicthegathering.io/v1/cards?name=" + query;
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("results", {data: data, query: query});
		}
	});
});

app.listen("3000", function(){
	console.log("MTG App has started!");
});