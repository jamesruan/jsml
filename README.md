jsml
====

Javascript object to DOM translator, inspired by https://github.com/caldwell/JSML

This code is used with node.js.
Use browserified jquery as library.

'broweserify -r jquery -o bundle.js'

usage
-----

JSON to HTML translating rule:

	[[something]] -> [something]
	[tag, {attr}, [something]] -> "<tag attr>"[something]"</tag>"
	[tag, {attr}, something] -> "<tag attr>something</tag>"

e.g.

	["html",
		["head", ["meta", {"http-equiv":"content-type", "content":"text/html;charset=utf-8"}]
				 ["title", "Example Page"]]
		["body", ["div", {"id":"content"}, ["p", "An example page"]]]]
	->
	<html>
		<head>
			<meta http-equiv="content-type" content="text/html;charset=utf-8">
			<title>Example Page</title>
		</head>
		<body>
			<div id="content">
				<p>An example page"</p>
			</div>
		</body>
	</html>

usage:

	OBJ.jsml(json_string);

'OBJ' is a jquery DOM object.
