/*

NTE (natural template engine) is a html/js framework that try to reuse your KB 
Copyright (C) 2018  Stefano Zaglio

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
"use strict"

/*
	5.7.2018 first draft

	NTE (in the future ITE (intuitive template engine)) want hide complexity without obly
	the developer to learn ng-* data-* $scope, or other particular names or paradigm.

	Life motive: "deduct the bonds from the names and behavior from the types".

	We like examples as 

		<input value="@myVariableName">.
		<p>My name is @myVariableName</p>.

	But a more complex example require a lebel than can be:

		label:<input....>

	or

		<label><input ...>label</label>

	depending on UI

	So a common tag can be:

		<input value="@myVarName" label="label:">

	that require a input(node) function or a <template name="input">... to be rendered into one or other form.
	Same as <p> require a p(node) to be rendered as <p>My name is <span>@MyVarName</span></p>.

	But when the complexity evolve to 3rd level, things must be grouped and named:
	
	== presentation layer ============================

	<!-- 
		attributes not allowed, because this can be rendered both client or server side
		depending on how we want balance performances
	-->
	
	<person>
		<fName></fname>
		<lName></lname>
		<bDay><bDay>
		<fullName></fullName>
		<splitNames></splitNames>
		<save></save>
	</person>

	<persons></persons>

	<script>
		
		var person = {
			fName: "?",
			lName: "Zaglio",
			bDay: "1972-02-01",
			...
			// functions will wrapped and param names used to link controls to update
			fullName: function(fName,lName) = { return fName+" "+lName},
			splitNames: function(fName,lName) { split into fName,lName },
			save: function() { ajax calls }
		}

		var persons = []

		nte.viewComponents(
			{
				// maybe an external JSON managed by UI console/gui
				person: {
					lName: {
						template: "input",
						label: "Last name"
					},
					save: {
						class:"btn btn-default"
					},
				},

				persons: {
					template: "table"
				}

			}
		)
		
		person.fName="Stefano"
		// person.viewUpdate() -->automatically generated&called 1st time by engine

	</script>


	== local components layer =========================

	<template name="fName>
		<input label="First Name" value="@fName">
	</template>

	<template name="bDay>
		<input label="Birthday" type="date" value="@bDay">
	</template>

	<template name="fullName">
		Full name:@fullName
	</template>

	<template name="save">
		<button></button>
	</template>


	== global component layer =========================

	<template name="input">
		@label:<input value="@value" type="@type|text">
	</template>


	== engine =========================================

	nte.input = function(node,data) {
		...
		node.addEventListener("change",function(ev){
			eval(node.getAttribute("value") +"='" + ev.value + "'")
		}
		...
	}

*/

var nte = new (function() {

	var self = this

    // DOM helpers ====================================================================================================

    /*
    	copy&paste this to simplify the development:

    	var 
    		elem = nte.elem, append = nte.append, bold = nte.bold, txt = nte.txt , spcIf = nte.spcIf,
    		lnk = nte.lnk, trNtd = nte.trNtd, li = nte.li, replyElem = nte.replyElem,
    		create = (tag)=>document.createElement(tag), get = (id)=>document.getElementById(id), 
			select = (qry)=>document.querySelector(qry)


    */

    self.elem = function(id) {
    	return document.getElementById(id)
    }

    self.get = function(node) {
    	return function(id) {return node.getElementById(id)}
    }

    self.select = function(node) {
    	return function(id) {return node.querySelector(id)}
    }

    self.create = function(tag) {
    	return document.createElement(tag)
    }

    self.append = function() {
		switch (arguments.length) {

			case 0:

			throw "Wrong init, use only 'var append=nte.append'."

			case 1:

			throw "Maybe you would use nte.add method."
	
			case 2:

			arguments[0].appendChild(arguments[1])
			return arguments[0]

			case 3: 

			arguments[1].appendChild(arguments[2])
			arguments[0].appendChild(arguments[1])
			return arguments[0]

			case 4: 

			arguments[2].appendChild(arguments[3])
			arguments[1].appendChild(arguments[2])
			arguments[0].appendChild(arguments[1])
			return arguments[0]
		}
	}

	self.add = function(parent) {
		return function(node) {
			parent.appendChild(node);
			return parent
		}
    }

    self.spcIf = function(condition) {
    	return condition? " ":""
    }

    self.txt = function(text) {
    	return document.createTextNode(text)
    }

    self.bold = function(nodeOrText) {
    	var b = document.createElement("b")
    	if (typeof nodeOrText === "string") {
    		nodeOrText = document.createTextNode( nodeOrText )
    	}
    	b.appendChild(nodeOrText)
    	return b
    }

    self.lnk = function( href, node ) {
		var a = document.createElement("a")
		a.href = href
		a.appendChild( node )
		return a
	}

    self.trNtd = function() 
    {
    	var tr = document.createElement("tr")
    	for (var i=0;i<arguments.length;i++) {
    		var td = document.createElement("td")
    		var strings = arguments[i].split("\n")
    		for (var j=0; j<strings.length; j++) {
    			var tn = document.createTextNode(strings[j])
	    		td.appendChild(tn)
    			if (j!=strings.length-1)
    			td.appendChild(document.createElement("br"))
    		}
    		tr.appendChild(td)
    	}
    	return tr
    }

    self.li = function(txt)
    {
		var li = document.createElement("li")
		var tn = document.createTextNode(txt)
		li.appendChild(tn)
		return li
    }

    var replyElem = function(elem,data) {
    	var parent = elem.parentElement
    	var clone = elem.cloneNode()
    	clone.removeAttribute("bind")
    	for (var i=0; i<data.length;i++) {
	    	var p,tn
	    	if (i===0) p=elem; else p=clone.cloneNode()
	    	tn = document.createTextNode(data[i])
	    	p.appendChild(tn)
	    	if (i>0) parent.appendChild(p)
    	}
    }

   	// ----------------------------------------------------------------------------------------------------------------

	self.isIE = function() {
		var div = document.createElement("div")
		div.innerHTML = "<!--[if IE]><i></i><![endif]-->"
		var b = (div.getElementsByTagName("i").length == 1)
		if (b) return b
		if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
   			return true // MSIE
		}
		return false
	}

	// ----------------------------------------------------------------------------------------------------------------

	self.attachEvents = function(app) 
	{
	    var activeElems = document.querySelectorAll("*[click]")
	    activeElems.forEach(
	    	function(it) {
	    		if (typeof(it) !== "object") return
    			var listener = app[it.attributes.click.value]
    			it.addEventListener("click",listener)
	    	}
	    )
	}

	// ----------------------------------------------------------------------------------------------------------------

	self.renderBinds = function(app)
	{
	    var activeElems = document.querySelectorAll("*[bind]")
	    activeElems.forEach(
	    	function(it) {
	    		if (typeof(it) !== "object") return
	    		// var app1 = app
    			var bind = it.attributes.bind.value
    			var rif = eval(bind)
    			if (rif === undefined) {
    				throw "Wrong bind '"+bind+"' in '"+it.nodeName+"'"
    			} else {
	    			// var rif = app[bind]
	    			if (typeof(rif) === "function") 
	    				rif(it)
	    			else
	    				replyElem(it,rif) 
	    		}
	    	}
	    )
	} // RenderBinds

	// ----------------------------------------------------------------------------------------------------------------

    self.renderTemplates = function() 
    {
    	
	    var templates = document.getElementsByTagName("template")

	    if (templates.length > 0) {

		    	function replaceTpl(tpl) {

			    	if (typeof(tpl) !== "object") return

		    		var style = tpl.querySelector("style")

		    		if (style) {	// todo: if plural? 
			    		var css = document.createElement("style")
			    		css.innerText = style.innerText
			    		document.head.appendChild(css)
			    	}

		    		var name = tpl.attributes.name.value

		    		// search tags an replace content
		    		var tags = document.getElementsByTagName(name)
		    		for (var j=0;j<tags.length;j++) {
			    		var tag = tags[j]
			    		// TODO: for now we suppose that template is made by single tag
			    		var clone = tpl.content.firstElementChild.cloneNode(true)
			    		clone.id = name + (j===0?"":j)
			    		// TODO: for now we suppose to replace the tag (duty for bootstrap)
						tag.replaceWith(clone)
					}	
		    	} // fn
			for (var i=0;i<templates.length;i++) replaceTpl(templates[i])
		}

	} // renderTemplates

	// ----------------------------------------------------------------------------------------------------------------

    self.convertLinksToText = function() 
    {

    	// convert links to text
        var l = document.getElementsByTagName("a")
        while (l.length > 0) {
            for (var i = 0; i < l.length; i++) {
                var mySpan = document.createElement("span")
                mySpan.innerText = l[i].innerText
                l[i].replaceWith(mySpan)
            }
            l = document.getElementsByTagName("a")
        }
        var css = document.createElement("STYLE")
        css.innerText = ".anonymouse{display:none;}"
        document.head.append(css)
	    
	} // convertLinksToText

	// ----------------------------------------------------------------------------------------------------------------

	self.start = function() { /*
		var reserved = ["template","templates","script"]
		var bodyBind = document.body.getAttributes("bind")
		if (bodyBind) {
			console.log("Starting application")

			// if a html.node has a app.node, run app.node(node)
			// if a html.node as a html.template, replace html.node with content of html.template
			// if html.template o its content has a bind/if-parent/click/hash/template attribute, manage it

			// renderTemplates()

			debugger

			var app = window[bodyBind.value]
			var hashes = []	// associates elements to hash
			
			function renderElem(elem,data,level) {
				var tag = elem.tagName
				// console.log(" ".repeat(level)+tag + ":" + id )

				if (reserved.indexOf(tag)>-1) continue

				var hash = elem.getAttribute("hash")
				if (hash) hashes.push({elem:elem, hash: hash})

				var bind = elem.getAttributes(bind)
				if (data.hasOwnProperty(bind)) data = data[bind]

				if (elem.childElementCount > 0) forElem(elem.children,data,level+1)

				if (app.hasOwnProperty(tag)) 
					// if exists app.tag(), render by fn
					app[tag](elem)
				else {
					// if exists a template with same id, replace content
					var tpl = document.querySelector("template[name='"+tag+"']")
					if (tpl !== null) {
						elem.appendChild(tpl.cloneNode(true))
						// expand content
						renderElem(elem,data,level)
					}
				} else {
					if (bind !== null) {
						if (data.constructor === Array) {
							data.forEach(
								function(it,i) {
									switch (tag) {
										// special rendering
										case "UL": // repeat LI
											var li = document.createElement("li")
											var tn = document.createTextNode(it)
											li.appendChild(tn)
											elem.appendChild(li)
											break
										case "TABLE": // repeat 
											break
										default:
											if (i===0) elem.innerText = it
											else {
												var tn = document.createTextNode(it)
												var el = document.createElement(tag)
												el.appendChild(tn)
												elem.parent.appendChild(el)
											}
									}
								}
							)
						}
					}
				}
			}

			// traverse all DOM elements
			function forElem(elems, data, level) {

				if (level === undefined) level = 0
				
				for (var i=0; i<elems.length; i++) 
					renderElem(elems[i],data,level)
			}

			forElem(document.body.children)

			app.start()
		} else {
			console.log("Try to understand inner code without generate extra variables")
			// <input id="name"><p>Yout name is: @name</p>
		}
	*/ }

})() // nte


document.addEventListener('DOMContentLoaded', function() {
   	window.nte.start()
}, false);

