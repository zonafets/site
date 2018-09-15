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

var nte = new (function() {

	var self = this
	var walkTextNodes

    // helpers =======================================================================================================

    self.define = function(varName) {
    	var vars = varName.split(".")
    	if (typeof window[vars[0]] === "undefined") 
    		window[vars[0]] = {}
    	var path = vars[0]
    	for (var i = 1; i<vars.length;i++) {
    		path+="."+vars[i]
    		if (typeof eval(path) === "undefined") eval( path + "={}" )
    	}
    }

	// ----------------------------------------------------------------------------------------------------------------

	self.extend = function(obj1, obj2) {

	  for (var p in obj2) {
	  	if (obj2.hasOwnProperty(p) && (typeof obj1[p] === "undefined"))
		    try {
		      // Property in destination object set; update its value.
		      if ( obj2[p].constructor==Object ) {
		        obj1[p] = self.merge(obj1[p], obj2[p]);

		      } else {
		        obj1[p] = obj2[p];
		      }

		    } catch(e) {
		      // Property in destination object not set; create it and set its value.
		      obj1[p] = obj2[p];

		    }
		  }

	  return obj1;
	}

	// ----------------------------------------------------------------------------------------------------------------

	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	var ARGUMENT_NAMES = /([^\s,]+)/g;
	
	self.getParamNames = function(func) {
	  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
	  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
	  if(result === null)
	     result = [];
	  return result;
	}

	// ----------------------------------------------------------------------------------------------------------------

	self.cmds = new (function() {
    	// url form: protocol:port/path/page?params=val&paramN=valN#hash1#hashN
   
    	var self = this
		self.params = {}

	    var cmds = location.search.substring(1).split("&")
	    cmds.forEach(
	    	function(it) {
	    		var nameAndVal = it.split("=")
	    		self.params[nameAndVal[0]] = (nameAndVal.length>1 ? nameAndVal[1] : null)
	    	}
	    )

	    self.param = function(param) {
			return self.params[param] || null
		}

	})() // cmds

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

   	// ----------------------------------------------------------------------------------------------------------------

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

    self.emptyNode = function(node) {
    	while (node.lastChild) {
   			node.removeChild(node.lastChild);
		}
	}

   	// ----------------------------------------------------------------------------------------------------------------

    var collectTextNodes = self.collectTextNodes = function() {
		// var node
		// var textNodes=[]
		walkTextNodes = document.createTreeWalker(
				document,NodeFilter.SHOW_TEXT,
				{ acceptNode: function(node) 
					{
						if (node.parentNode.nodeName == "SCRIPT")
							return NodeFilter.FILTER_REJECT
						/*
						if (node.textContent.indexOf("%")>-1 ||
							node.textContent.indexOf("[")>-1)
							return NodeFilter.FILTER_ACCEPT
						else
							return NodeFilter.FILTER_SKIP
						*/
						return NodeFilter.FILTER_ACCEPT
					} 
				},
				false);
  		// while(node=walkTextNodes.nextNode()) textNodes.push(node);
    }

   	// ----------------------------------------------------------------------------------------------------------------

   	self.replaceTag = function(tag,value) {
   		var node
   		walkTextNodes.currentNode = walkTextNodes.root
   		while(node=walkTextNodes.nextNode()) {
   			node.textContent = node.textContent.replace(tag,value)
   		}
   		//debugger
   	}

   	// ----------------------------------------------------------------------------------------------------------------

   	self.searchTag = function(tag) {
   		var node
   		walkTextNodes.currentNode = walkTextNodes.root
   		while(node=walkTextNodes.nextNode()) {
   			if (node.textContent.indexOf(tag)>-1) 
   				console.log(node.textContent)
   		}
   	}

	// ----------------------------------------------------------------------------------------------------------------

	self.attachEvents = function() 
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

	self.renderBinds = function()
	{
	    var activeElems = document.querySelectorAll("*[bind]")
	    activeElems.forEach(
	    	function(it) {
	    		if (typeof(it) !== "object") return
	    		var done = false
    			var bind = it.attributes.bind.value
    			var ref = eval("app."+bind)
    			if (ref === undefined) {
    				throw "Wrong bind '"+bind+"' in '"+it.nodeName+"'"
    			} else {
	    			if (typeof(ref) === "function") 
	    				ref(it)
	    			else {
	    				for (var i=0;i<ref.length;i++) {
	    					var item = ref[i]
		    				if (item.hasOwnProperty("hash") && item.hasOwnProperty("content")) {
		    					if (window.location.hash == item.hash) {
		    						replyElem(it,item.content)
		    						done = true
		    					}
		    				}
		    			} // for
	    				if (!done)
	    					replyElem(it,ref)
	    				}
	    		} // test ref
	    	} // forEach
	    )

	    if (activeElems.length>0) collectTextNodes()

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

			collectTextNodes()
		}

	} // renderTemplates


	// ----------------------------------------------------------------------------------------------------------------

	self.start = function() {

		app.init()

		self.renderTemplates()

		// app.html.__proto__.bindNodes = 
		self.bindNodes = function() {
			var select = (tag) => document.querySelector(tag)
		    for (var tag in app.html) {
		    	if (app.html.hasOwnProperty(tag)) {
			    	var node = select(tag)
			    	if (!node) {
			    		console.log("Warning, node '" + tag + "' not found")
			    	} else {
			    		var original = app.html[tag]
			    		if (typeof original === "function") {
				    		if (original.prototype.originalFunction !== undefined)
				    			original = original.prototype.originalFunction
				    		var params = nte.getParamNames(original)
				    		if (params.length>0) console.log("Params of '"+tag+"' are:" + params)
				    		app.html[tag] = original.bind(node)
				    		if (app.html[tag].prototype === undefined) app.html[tag].prototype = {}
				    		app.html[tag].prototype.originalFunction = original
				    		// app.html[tag]() -> nte.renderBindedNodes
				    	} else 
				    		console.log("Warning, node '" + tag + "' not a function")

			    	}
			    } // ownProp
		    } // for
		}

		self.renderBindedNodes = function() {
			var select = (tag) => document.querySelector(tag)
		    for (var tag in app.html) {
		    	if (app.html.hasOwnProperty(tag)) {
			    	var node = select(tag)
			    	if (!node) {
			    		console.log("Warning, node '" + tag + "' not found")
			    	} else {
			    		var original = app.html[tag]
			    		if (typeof original === "function") {
				    		app.html[tag]()
				    	} else 
				    		console.log("Warning, node '" + tag + "' not a function")

			    	}
			    } // ownProp
		    } // for
		}

		self.bindNodes()
		self.renderBindedNodes()

		collectTextNodes()
		app.start()

	} // self.start

})() // nte


document.addEventListener('DOMContentLoaded', function() {
   	window.nte.start()
}, false);

