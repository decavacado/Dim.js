# Dim JS

#### What is this?

Dim JS is a little project I did inspired by SPF.js

#### What does SPF do?

Well SPF.js allows for Dynamic navigation. What this means is document fragments are sent on navigation between pages and SPF only renders new Fragments. You can go to the [SPF.js](http://youtube.github.io/spfjs/) site for more.

## Using Dim.js

To use Dim.js you need to dim.js file which you can get from the src folder.
Once you get the file and its loaded into your html you need to set up a server (Look in es.js to an example of an express configuration)

### Adding routes
To add routes you make a normal anchor tag 
```html
        <a href="http://localhost:10000/document">Home</a>
				<a href="http://localhost:10000/document1">About</a>
				<a href="http://localhost:10000/document2">Contact</a>
				<a href="http://localhost:10000/document3">Projects</a>
```
Now the hrefs need to be configured on your server to serve JSON in a specific schema 

Example
```json
  "{"head":"<link  rel='stylesheet' href='rex.css'>","content":"<p class='yu'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> <p>THIS IS SOME TEXT</p>","replaces":[{"id":"Title","content":"<h1 id='Title' class='Title dim_ex'>Paragraph 1<h1>"},{"id":"Page","content":"<title class='dim_ex' id='Page'>Paragraph 1</title>"}]}"
```
The head property contains html that will added to the head on navigation, the content property contains content that will added to the body (this can include script tags and css) the replaces array replaces the specified id with the content example you could have one h1 tag that replaces on every navigation to a different page.

### Adding elements

```html
<html>
	<head>
		<link class="dim_ex" rel="stylesheet" href="test.css">
		<title class="dim_ex" id="Page"></title>
	</head>
	<body>
		<div class="dim_ex app">
			<div class="dim_ex">
				<a href="http://localhost:10000/document" class="linke dim_link dim_linkex" linket="doc1?e=9">Home</a>
				<a href="http://localhost:10000/document1" class="linke dim_link dim_linkex" linket="doc2">About</a>
				<a href="http://localhost:10000/document2" class="linke dim_link dim_linkex" linket="doc3">Contact</a>
				<a href="http://localhost:10000/document3" class="linke dim_link dim_linkex" linket="doc4">Projects</a>
			</div>
			<button id="button"  b-on:click="hello">Hit</button>
			<h1 class="dim_ex" id="op"></h1>
			<h1 id="Title" class="dim_ex">Home</h1>
			<div class="dim_ex">
				<p>Hello</p>
				<div class="dim_ex">
					<p class="dim_ex">Heiiii</p>
					<p>Not hello</p>
				</div>
			</div>
		</div>
		<div class="footer dim_ex">
			<p class="dim_ex">Made with love by me</p>
		</div>
		<script class="dim_ex" src="dim.js"></script>
		<script class="dim_ex" src="test.js"></script>
	</body>
</html>
````
So far this is what our html file looks like (ignore the b-on attributes its a library) as you can see some elements have the dim_ex class on them this class is very important the reason is when a user clicks on an anchor tag to navigate All elements are removed so to keep an element for the next page you use dim_ex and if that element has children put dim_ex on the children you want to keep (If a parent element does not have dim_ex but its children do the parent element will be deleted including the children elements, you also wanna put this on scripts or they will be deleted). Now you also notice our anchor tag we made earlier has a dim_link class and a dim_linkex class first of the dim_link class tells Dim this is a dim link and should not be treated like a normal link also remember when I said everything gets deleted this include dim_links if you dont want it to be deleted you add the dim_linkex class to it. Also you might have noticed the linket attribute this attribute tells Dim what the name of the route is(More work is going into this to allow dynamic routing).

### All together

First thing is you need a seperate script

```js
let dim =  new Dim("enter","leave")

console.log(dim)

dim.dim_load()

window.addEventListener("route_change", function(obj){
    console.log(obj.detail.route)
})
```
Now that we got a seperate script with some code in it lets explain it first thing we do is make a new dim instance and put two paremeters into it an enter class and a leave class these classes will be added when an element is added and when an element is leaving(To add some nice animations)

Second thing you see is a console.log this is just for me to fix bugs 😶

and then you see we are calling a method called dim_load() this method is crucial if you dont call this nothing will work right this method is what hooks new behaviors to the anchor tags.

Next thing you see is an event listener this event is fired everytime a the user navigates and you can use this to do certain stuff on route changes (More on this in the future trying to make it better)

Thats all you need to start will be adding more in the furture.

