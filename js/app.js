/**********************************************************************************************************************

	-- NOTES ------------------------------------------------------------------------------

	This isn't only a page with my CV, but also a place where I'll refine the code to test 
	the concepts of NTE (https://github.com/zonafets/NTE)

	I know, this is not the better code. DRY principle can be applied more.

	-- SCOPE ------------------------------------------------------------------------------

	Render content of JSON(cv-data.js) using an experimental template technique that I'am
	calling/define as NTE (Natural Template Engine) or TBE (template by example).


	-- CHANGELOG --------------------------------------------------------------------------

	180612\s.zaglio: begin of apply Brian W. Kernighan and P. J. Plaugher principle


	-- TODO -------------------------------------------------------------------------------

	180602\s.zaglio: optimize multiple string replace in renderWikiStyleTags()
	180601\s.zaglio: apply DRY principle to code and convert to NTE

***********************************************************************************************************************/

var app = new (function() {

	// ----------------------------------------------------------------------------------------------------------------

	var redirect = "curriculum_ita_static.htm"

	function wasRedirected() {	
		return (window.location.href.substr(-redirect.length)===redirect) ? true : false
	}

	if (wasRedirected()) {
		document.body.style.display = 'block';
		return
	}

	// ----------------------------------------------------------------------------------------------------------------

	function redirectToStaticVersion() {
		console.log("Redirecting to static version")
		window.location.href = "curriculum_ita_static.htm"
	}

	if (!isCompatibileBrowser()) 
		redirectToStaticVersion()

	// ----------------------------------------------------------------------------------------------------------------

	var self = this

	// messages
	var lang = navigator.language.substring(0,2)

	var msgs = {
		notForIe: {
			it:"Segui l'esempio di Microsoft. Abbandona Internet Explorer per qualcosa di più compatibile.",
			en:"Follow Microsoft's example. Leave Internet Explorer for something more compatible",
		},
		instructions:{
			it:"Cliccare/toccare sulla fotografia per cambiare vista da elenco progetti a esperienze\n\n"
			  +"Cliccare/toccare sull'email per copiarla nella clipboard\n\n"
			  +"Cliccare/toccare questo messaggio per chiuderlo",
			en:"Click / tap on the photo to change view from project list to experiences\n\n"
			  +"Click / tap on the email to copy it to the clipboard\n\n"
			  +"Click / tap this message to close it"
		}
	}

	// generic utilities ==============================================================================================

	function competence_dsc(id) {
		var dsc = ""
		cv.competencies.some(
			function(it) {
				var b = (it[0] === id)
				if (b) dsc = it[1]
				return b
			}
		)
		return dsc
	}

	// ----------------------------------------------------------------------------------------------------------------

	function message(textOrClickEvent) {
		var bar = document.getElementById("notifyBar")
		if (typeof textOrClickEvent === "string") {
			var msg = bar.firstElementChild.firstElementChild // span.p
			msg.innerText = textOrClickEvent
			bar.style.display = "block"
		} else
			bar.style.display = "none"
	}


	// behaviours =====================================================================================================

	function swapViews() {
		var flipper = document.querySelector(".flip-container")
		var experience_view = document.getElementById("view_by_experiences")
		var projects_view = document.getElementById("view_by_projects")
		var style = getComputedStyle(document.querySelector(".slider"))
		var time = parseInt(style.transitionDuration) * 1000
		var css = "opened"

		if (flipper.classList.contains("flip")) {
			experience_view.classList.remove(css)
			setTimeout(function(){projects_view.classList.add(css)}, time)
		} else {
			projects_view.classList.remove(css)
			setTimeout(function(){experience_view.classList.add(css)}, time)
		}
	}

	// ----------------------------------------------------------------------------------------------------------------

	function flip(ev) {
		var target = ev?ev.currentTarget:null
		var photo = document.querySelector(".flip-container")
		if (target === photo) {
			target.classList.toggle('flip')
			swapViews()
		}
		else
			photo.click()
	}

	// ----------------------------------------------------------------------------------------------------------------

    function copyEmail2Clipboard() {
        document.oncopy = function(event) {
            var a = [
            	"z", "a", "g", "l", "i", "o", ".", "s", "t", "e", "f", "a", "n", "o", 
            	"@", "g", "m", "a", "i", "l", ".", "c", "o", "m"
            ]
            event.clipboardData.setData("Text", a.join(''));
            event.preventDefault();
        }
        ;
        document.execCommand("Copy");
        document.oncopy = undefined;
        message("Email copiata nella clipboard.")
    }


    // DOM helpers ====================================================================================================

    function elem(id) {
    	return document.getElementById(id)
    }

    function append( parent, node ) {
    	parent.appendChild(node)
    	return parent
    }

    function spcIf(condition) {
    	return condition? " ":""
    }

    function txt(text) {
    	return document.createTextNode(text)
    }

    function bold(nodeOrText) {
    	var b = document.createElement("b")
    	if (typeof nodeOrText === "string") {
    		nodeOrText = document.createTextNode( nodeOrText )
    	}
    	b.appendChild(nodeOrText)
    	return b
    }

    function lnk( href, node ) {
		var a = document.createElement("a")
		a.href = href
		a.appendChild( node )
		return a
	}

    function lg(node) {
    	var lg = document.createElement("lg")
    	lg.appendChild(node)
    	return lg
    }

    function trNtd() 
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

    function li(txt)
    {
		var li = document.createElement("li")
		var tn = document.createTextNode(txt)
		li.appendChild(tn)
		return li
    }

    // NTE node constructors ==========================================================================================

	this["companies-idx"] = function() {
		node = elem("companies-idx")
		var n = 0, i = 0;

		var list = cv.experiences
    	list.forEach(
    		function(it) { n += it.companies.length }
    	)

    	list.forEach(
    		function(it) {

		    	append( node, lg( txt( spcIf(i>0) + it.period ) ) )
		    	
		    	it.companies.forEach(
		    		function(it) {

		    			var id = n - i
		    			it.id = id
		    			i++

		    			append( node, bold( txt( " ●\u00a0"+id+".\u00a0" ) ) )

	    				append( node, txt("\u00a0") )
		    			if (it.hasOwnProperty("link") && it.link!="") {
		    				append( node, lnk( it.link, txt(it.name) ) )
		    			} else {
		    				append( node, txt(it.name) )
		    			}
		    			if (it.prov)
	    					append( node, txt(" - " + it.prov + " ") )
		    		}
		    	)
	    	}
	    )
	}

	// ----------------------------------------------------------------------------------------------------------------

    this["stacks-idx"] = function() {
		node = elem("stacks-idx")
		cv.experiences.forEach(
    		function(it,i) {

		    	
    			
    			var id = String.fromCharCode( 65 + i )
    			it.stackId = id
    			var text = " ●\u00a0"+id+" "

    			/*
    			// without helpers
		    	var lg = document.createElement("lg")
		    	if (i>0) lg.appendChild(document.createTextNode(" "))
    			var tn = document.createTextNode(text)
    			var b = document.createElement("b")
    			b.appendChild(tn)
    			lg.appendChild(b)
		    	node.appendChild(lg)
		    	*/

		    	// node.appendChild( lg ( txt(spcIf(i>0)) ).appendChild( bold( text ) ).parentElement )

		    	append( node, append( lg ( txt(spcIf(i>0)) ), bold( text ) ))

    			append( node, txt( " " + it.stack + " " ) )
	    	}
	    )
    } // stacks-idx

	// ----------------------------------------------------------------------------------------------------------------

    this["competencies-idx"] = function(node) {
		node = document.getElementById("competencies-idx")
		cv.competencies.forEach(
    		function(it,i) {

		    	var id = it[0].toLowerCase()
		    	var dsc = it[1]

		    	var span = document.createElement("span")
		    	var img = document.createElement("img")
    			img.src = "images/icons/" + it[0].toLowerCase() + ".png"
    			span.appendChild(img)

    			tn = document.createTextNode(" " + dsc + " ")
    			span.appendChild(tn)

    			node.appendChild(span)

	    	}
	    )
    } // competencies-idx

	// ----------------------------------------------------------------------------------------------------------------

    this["projects"] = function(node) {
    	node = document.getElementById("projects")
    	var tbody = document.createElement("tbody")
		var prevComps = ""
    	cv.experiences.forEach(
    		function(exp) {
    			exp.companies.forEach(
    				function(comp) {
    					comp.projects.forEach(
    						function(prj) {

    							var name = prj.hasOwnProperty("name") ? prj.name : ""
    							var desc = prj.hasOwnProperty("desc") ? prj.desc : ""
    							var link = prj.hasOwnProperty("link") ? prj.link : ""

				    			var tr = document.createElement("tr")

    							// project
		    					var td = document.createElement("td")
		    					var dsc

		    					if (link !== "") {
		    						var alink

		    						if (name !== "") {
		    							alink = name
		    							dsc = "[" + alink + "]: " + desc
		    						} else {
		    							alink = desc
		    							dsc = "[" + alink +"]"
									}
		    						cv.links.push( [ alink, link ] )
		    					} else {
		    						dsc = name ? name+": "+desc : desc
		    					}

		    					var tn = document.createTextNode(dsc)
		    					td.appendChild(tn)
		    					tr.appendChild(td)

		    					// stack
		    					td = document.createElement("td")
		    					tn = document.createTextNode(exp.stackId)
		    					td.appendChild(tn)
		    					tr.appendChild(td)

		    					// competencies
		    					td = document.createElement("td")

		    					var comps = exp.competencies.join(",")
		    					if (prevComps == comps) 
	    							td.appendChild(document.createTextNode("\""))
		    					else {
			    					exp.competencies.forEach(
			    						function(it) {
			    							var span = document.createElement("span") 
			    							span.title = competence_dsc(it)
			    							span.className = "tip" 
			    							var img = document.createElement("img")
			    							img.src = "images/icons/" + it.toLowerCase() + ".png"
			    							span.appendChild(img)
			    							td.appendChild(span)
			    						}
			    					)
			    					prevComps = comps
			    				}

		    					/*
		    					tn = document.createTextNode(exp.competencies.join(", "))
		    					td.appendChild(tn)
		    					*/
		    					tr.appendChild(td)

		    					// company
		    					td = document.createElement("td")
		    					tn = document.createTextNode(comp.id)
		    					td.appendChild(tn)
		    					tr.appendChild(td)
    							tbody.appendChild(tr)
		    				}
		    			)
    				}
    			)
    		}
    	)
    	node.appendChild(tbody)
    }

	// ----------------------------------------------------------------------------------------------------------------

	function isIE() {
		var div = document.createElement("div")
		div.innerHTML = "<!--[if IE]><i></i><![endif]-->"
		var b = (div.getElementsByTagName("i").length == 1)
		if (b) return b
		if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
   			return true // MSIE
		}
		return false
	}

    /*********************************
    **                              **
    **   Section functions          **
    **                              **
    **********************************/

	function checkIE() 
	{	    
    	if (isIE()) alert(msgs.notForIE[lang])
    }

	function renderNodes(app) 
	{
	    parent = document.getElementById("self-nomination")
	    parent.innerHTML = cv["self-nomination"].replace(/\n/g,"<br>")

	    parent = document.querySelector("#briefly ul")
	    cv.briefly.lines.forEach(
	    	function(it) {
	    		if (cv.hidden.indexOf(it) == -1)
					parent.appendChild(li(it))
			}
		)

	    parent = document.getElementById("lasts-kb")
	    tbody = document.createElement("tbody")
		parent.appendChild(tbody)
	    cv["lasts-kb"].lines.forEach(
	    	function(it) {
				tbody.appendChild(trNtd(it[0], it[1]+''))
			}
		)

	    parent = document.querySelector("#previous-kb table")
	    tbody = document.createElement("tbody")
	    parent.appendChild(tbody)
	    cv["previous-kb"].items.forEach(
	    	function(it) {
				parent.appendChild(trNtd(it[0],it[1],it[2]+''))
			}
		)

	    // render("experiences", function(it) {...})
	    parent = document.querySelector("#experiences table")
	    tbody = document.createElement("tbody")
	    parent.appendChild(tbody)
	    cv.experiences.forEach(
	    	function(it) {
	    		var company = ""
	    		it.companies.forEach(
	    			function (c) {
	    				var name = c.name
	    				if (c.hasOwnProperty("link") && c.link!="") 
	    					name = "["+name+"]"
	    				company += name + (c.prov?" (" + c.prov + ")":"")+"\n"
	    			}
	    		)
	    		var tr = trNtd(it.period+"\n"+it.comp, it.task, company)
				tbody.appendChild(tr)
			}
		)

	    parent = document.querySelector("#extra-info table")
	    tbody = document.createElement("tbody")
	    parent.appendChild(tbody)
	    cv["extra-info"].items.forEach( 
	    	function(it) {
	    		tbody.appendChild(trNtd( it[0], it[1] ))
	    	}
	    )

	    parent = document.getElementById("extra-courses")
	    tbody = document.createElement("tbody")
	    parent.appendChild(tbody)
	    cv["extra-courses"].items.forEach( 
	    	function(it) {
	    		tbody.appendChild(trNtd( it[0], it[1] ))
	    	}
	    )

	    self["companies-idx"]()
	    self["stacks-idx"]()
	    self["competencies-idx"]()
	    self["projects"]()
	} // RenderNodes

	// ----------------------------------------------------------------------------------------------------------------

	function renderWikiStyleTags() 
	{

	    var html = document.body.innerHTML

	    cv.anonymouse.forEach(
	    	function(it) {
		        var span = '<span class="anonymouse">' + it + '</span>'
		        html = html.replaceAll( it, span )
		    }
		)

	    cv.anonymouse.forEach(
	    	function(it) {
		        var span = '<span class="anonymouse">' + it + '</span>'
		        html = html.replaceAll( it, span )
		    }
		)

		function collect_links(obj, collection) {
			if (collection === undefined) collection=[]
			for (var k in obj) {
				if (k === "links")
					// obj[k].forEach( function (it) {collection.push.apply(it)} )
					collection.push.apply(collection,obj.links)
				if (typeof obj[k] === "object")
					collect_links(obj[k], collection)
			}
			return collection
		}

		var links = cv.links
		links.push.apply(links, collect_links(cv))

		// add links from companies
		cv.experiences.forEach( 
			function(it) {
				it.companies.forEach( 
					function(c) {
						links.push([c.name,c.link])
					}
				)
			}
		)

		// replace [link] with aref
	    links.forEach(
	    	function(it) {
		        var a = '<a href="' + it[1]+'">' + it[0] + '</a>'
		        var r = "["+it[0].replace("&","&amp;")+"]"
		        html = html.replaceAll( r, a )
		    }
		)

	    // collect and replace //...// with <i>...</i>
		function collect_italics(obj, collection) {
			if (collection === undefined) collection = []
			for (var k in obj) {
				if (k !== "links" && k !== "link" ) {
					var prop = obj[k]
					if (typeof prop === "object")
						collect_italics(obj[k], collection)
					if (typeof prop === "string") {
						collection.push.apply(collection,prop.match(/[/][/].*[/][/]/g))
					}
				}
			}
			return collection
		}

		var italics = collect_italics(cv)

	    italics.forEach(
	    	function(it) {
		        var i = '<i>' + it.slice(2,-2) +'</i>'
		        html = html.replaceAll( it, i )
		    }
		)
	    
	    document.body.innerHTML = html

	} // RenderWikiStyleLinks

	// ----------------------------------------------------------------------------------------------------------------

    function renderTemplates() 
    {
    	
	    var templates = document.querySelectorAll("*[template]")

	    templates.forEach(
	    	function(tpl) {

		    	if (typeof(tpl) !== "object") return

	    		var style = tpl.querySelector("style")

	    		if (style) {	// todo: if plural? 
		    		var css = document.createElement("style")
		    		css.innerText = style.innerText
		    		document.head.appendChild(css)
		    	}

	    		var name = tpl.attributes.template.value
		    	// the 1st template become active
		    	tpl.id = name

	    		// search tags an replace content
	    		var tags = document.getElementsByTagName(name)
	    		for (var j=0;j<tags.length;j++) {
		    		tag = tags[j]
		    		var clone = tpl.content.querySelector("div").cloneNode(true)
		    		clone.id = name + (j===0?"":j)
					tag.replaceWith(clone)
				}	
	    	}
		)    

	    // add events
	    var activeElems = document.querySelectorAll("*[click]")
	    activeElems.forEach(
	    	function(it) {
	    		if (typeof(it) !== "object") return
    			var listener = eval(it.attributes.click.value)
    			it.addEventListener("click",listener)
	    	}
	    )

	} // RenderTemplates

	// ----------------------------------------------------------------------------------------------------------------

    function convertLinksToText() 
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
    
    function run(cmds)
    {
	    var cmds = location.search.substring(1).split("&")
	    
	    if (cmds.indexOf("anonymouse")>-1) convertLinksToText()

	    document.body.className='fade-in';
		
	    if (cmds.indexOf("print") == -1 && cmds.indexOf("projects") == -1) {
			setTimeout( flip, 1050)
			message(msgs.instructions[lang])
		}
	} // run


	// ----------------------------------------------------------------------------------------------------------------

	function start() {
		checkIE()
		renderNodes(this)
		renderWikiStyleTags()
		renderTemplates()
		run()
	}

	start()

})() // app