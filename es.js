var express = require("express")

var app = express()

app.use("/", express.static(__dirname))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/rolo.html")
})

app.get("/document", function(req, res){
    res.set({
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "x-requested-with"
	})
    res.json({head: "<link  rel='stylesheet' href='rex.css'>", content: "<p class='yu'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> <p>THIS IS SOME TEXT</p>", replaces: [{id: "Title", content: "<h1 id='Title' class='Title dim_ex'>Paragraph 1<h1>"},{id: "Page", content:"<title class='dim_ex' id='Page'>Paragraph 1</title>"}]})
})
app.get("/document1", function(req, res){
    res.set({
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "x-requested-with"
	})
    res.json({head: "<link rel='stylesheet' href='rex.css'>", content: "<p class='yu'>Tempus iaculis urna id volutpat lacus. Porttitor rhoncus dolor purus non enim praesent. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Netus et malesuada fames ac. At lectus urna duis convallis convallis. Diam quis enim lobortis scelerisque fermentum dui. Vel pharetra vel turpis nunc. Commodo quis imperdiet massa tincidunt nunc pulvinar. At lectus urna duis convallis. Quis risus sed vulputate odio ut enim. Morbi tristique senectus et netus et malesuada fames ac turpis.</p><script src='jk.js'></script>", replaces: [{id: "Title", content: "<h1 id='Title' class='dim_ex'>Paragraph 2<h1>"},{id: "Page", content:"<title class='dim_ex' id='Page'>Paragraph 2</title>"},{id: "op", content: "<h1 class='dim_ex' id='op'>This kinda cool I guess</h1>"}]})
})
app.get("/document2", function(req, res){
    res.set({
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "x-requested-with"
	})
    res.json({head: "<link  rel='stylesheet' href='rex.css'>", content: "<h1>I like tea<h1>", replaces: [{id: "Title", content: "<h1 id='Title' class='dim_ex'>Paragraph 3<h1>"},{id: "Page", content:"<title class='dim_ex' id='Page'>Paragraph 3</title>"}]})
})
app.get("/document3", function(req, res){
    res.set({
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "x-requested-with"
	})
    res.json({head: "<link  rel='stylesheet' href='rex.css'>", content: "<h1>Sweet<h1>", replaces: [{id: "Title", content: "<h1 id='Title' class='dim_ex'>Paragraph 4<h1>"},{id: "Page", content:"<title class='dim_ex' id='Page'>Paragraph 4</title>"}]})
})
app.use(function(req, res, next) {
    res.sendFile(__dirname + "/rolo.html")
  })


app.listen(10000, function(err){
    if(err){
        console.log(err)
    }else {
        console.log("Success")
    }
})