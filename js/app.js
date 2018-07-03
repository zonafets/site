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
"use strict"

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
	var app = this

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
		},
		emailCopied:{
			it:"Email copiata nella clipboard.",
			en:"Email copied into clipboard."
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

	self.message = function(textOrClickEvent) {
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
		if (location.hash === "#details#experiences" || location.hash === "") location.hash = "#details#projects"
		else
			if (location.hash === "#details#projects") location.hash = "#details#experiences"
	}

	// ----------------------------------------------------------------------------------------------------------------

	self.flip = function(ev) {
		var target = ev?ev.currentTarget:null
		var photo = document.querySelector(".flip-container")
		if (target === photo) {
			swapViews()
		}
		else
			photo.click()
	}

	// ----------------------------------------------------------------------------------------------------------------

    self.copyEmail2Clipboard = function() {
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
        self.message(msgs.emailCopied[lang])
    }


    // node constructors ==========================================================================================

    function lg(node) {
    	var lg = document.createElement("lg")
    	lg.appendChild(node)
    	return lg
    }

	// ----------------------------------------------------------------------------------------------------------------

	this["companies"] = function(node) {
		
		var elem = nte.elem, append = nte.append, bold = nte.bold, txt = nte.txt , spcIf = nte.spcIf, node, lnk = nte.lnk
		
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

    this["stacks"] = function(node) {
		cv.experiences.forEach(
    		function(it,i) {

    	    	var append = nte.append, bold = nte.bold, txt = nte.txt , spcIf = nte.spcIf
    			
    			var id = String.fromCharCode( 65 + i )
    			it.stackId = id
    			var text = " ●\u00a0"+id+" "

		    	append( node, append( lg ( txt(spcIf(i>0)) ), bold( text ) ))

    			append( node, txt( " " + it.stack + " " ) )
	    	}
	    )
    } // stacks-idx

	// ----------------------------------------------------------------------------------------------------------------

    this["competencies"] = function(node) {
		cv.competencies.forEach(
    		function(it,i) {

		    	var append = nte.append, txt = nte.txt, 
    	    		create = (tag)=>document.createElement(tag), get = (id)=>document.getElementById(id), 
					select = (qry)=>document.querySelector(qry)

				var id,dsc,span,img,tn

		    	id = it[0].toLowerCase()
		    	dsc = it[1]

		    	span = create("span")
		    	img = create("img")
    			img.src = "images/icons/" + it[0].toLowerCase() + ".png"
    			append(span,img)

    			tn = txt(" " + dsc + " ")
    			append(span,tn)

    			append(node,span)

	    	}
	    )
    } // competencies-idx

	// ----------------------------------------------------------------------------------------------------------------

    this["projects"] = function(node) {
		var
    		elem = nte.elem, append = nte.append, bold = nte.bold, txt = nte.txt , spcIf = nte.spcIf,
    		lnk = nte.lnk, trNtd = nte.trNtd, li = nte.li, replyElem = nte.replyElem, 
    		create = (tag)=>document.createElement(tag), get = (id)=>node.getElementById(id), 
			select = (qry)=>node.querySelector(qry)

    	var table = select("table")
    	var tbody = create("tbody")
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

				    			var tr = create("tr")

    							// project
		    					var td = create("td")
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

		    					var tn = txt(dsc)
		    					append(td,tn)
		    					append(tr,td)

		    					// stack
		    					td = create("td")
		    					tn = txt(exp.stackId)
		    					append(td,tn)
		    					append(tr,td)

		    					// competencies
		    					td = create("td")

		    					var comps = exp.competencies.join(",")
		    					if (prevComps == comps) 
	    							append(td,txt("\""))
		    					else {
			    					exp.competencies.forEach(
			    						function(it) {
			    							var span = create("span") 
			    							span.title = competence_dsc(it)
			    							span.className = "tip" 
			    							var img = create("img")
			    							img.src = "images/icons/" + it.toLowerCase() + ".png"
			    							append(span,img)
			    							append(td,span)
			    						}
			    					)
			    					prevComps = comps
			    				}

		    					append(tr,td)

		    					// company
		    					td = create("td")
		    					tn = txt(comp.id)
		    					append(td,tn)
		    					append(tr,td)
		    					append(tbody,tr)
		    				}
		    			)
    				}
    			)
    		}
    	)
    	append(table,tbody)
    }



    /*********************************
    **                              **
    **   Section functions          **
    **                              **
    **********************************/

	function checkIE() 
	{	    
    	if (nte.isIE()) alert(msgs.notForIE[lang])
    }

	function renderNodes(app) 
	{
		var li = nte.li, lnk = nte.lnk, append = nte.append, trNtd = nte.trNtd,
			create = (tag)=>document.createElement(tag), get = (id)=>document.getElementById(id), 
			select = (qry)=>document.querySelector(qry)

		var  parent,tbody

	    parent = get("self-nomination")
	    if (parent)
	    	parent.innerHTML = cv["self-nomination"].replace(/\n/g,"<br>")

	    /*
	    parent = select("briefly ul")
	    cv.briefly.lines.forEach(
	    	function(it) {
	    		if (cv.hidden.indexOf(it) == -1) append(parent,li(it))
			}
		)
		*/

	    parent = get("lasts-kb")
	    tbody = create("tbody")
		append(parent,tbody)
	    cv["lasts-kb"].lines.forEach(
	    	function(it) {
				append(tbody,trNtd(it[0], it[1]+''))
			}
		)

	    parent = select("#previous-kb table")
	    tbody = create("tbody")
	    append(parent,tbody)
	    cv["previous-kb"].items.forEach(
	    	function(it) {
				append(parent,trNtd(it[0],it[1],it[2]+''))
			}
		)

	    // render("experiences", function(it) {...})
	    parent = select("#experiences table")
	    tbody = create("tbody")
	    append(parent,tbody)
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
				append(tbody,tr)
			}
		)

	    parent = select("#extra-info table")
	    tbody = create("tbody")
	    append(parent,tbody)
	    cv["extra-info"].items.forEach( 
	    	function(it) {
	    		append(tbody,trNtd( it[0], it[1] ))
	    	}
	    )

	    parent = get("extra-courses")
	    tbody = create("tbody")
	    append(parent,tbody)
	    cv["extra-courses"].items.forEach( 
	    	function(it) {
	    		append(tbody,trNtd( it[0], it[1] ))
	    	}
	    )

	    self["companies"](select("companies"))
	    self["stacks"](select("stacks"))
	    self["competencies"](select("competencies"))
	    self["projects"](select("projects"))
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

	    // collect and replace **...** with <b>...</b>
		function collect_bolds(obj, collection) {
			if (collection === undefined) collection = []
			for (var k in obj) {
				if (k !== "links" && k !== "link" ) {
					var prop = obj[k]
					if (typeof prop === "object")
						collect_bolds(obj[k], collection)
					if (typeof prop === "string") {
						collection.push.apply(collection,prop.match(/[*][*].*[*][*]/g))
					}
				}
			}
			return collection
		}

		var bolds = collect_bolds(cv)

	    bolds.forEach(
	    	function(it) {
		        var i = '<b>' + it.slice(2,-2) +'</b>'
		        html = html.replaceAll( it, i )
		    }
		)
	    
	    document.body.innerHTML = html

	} // renderWikiStyleTags

	// ----------------------------------------------------------------------------------------------------------------

    function renderTemplates() 
    {
    	
	    var templates = document.getElementsByTagName("template")

	    if (templates.length > 0) {

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
		}

	} // renderTemplates


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

	function changeView() {
		var hashes = document.querySelectorAll("*[hash]")
		var hash = location.hash === "" ? [""] : location.hash.split("#").slice(1)
		hashes.forEach(
			function(it) {
				var h = it.attributes.hash.value.substr(1)
				var val = (hash.indexOf(h)>-1 ? "block":"none") 
				it.style.display = val
			}
		)

		var flipper = document.querySelector(".flip-container")
		var experience_view = document.querySelector("[hash='#experiences']")
		var projects_view = document.querySelector("[hash='#projects']")
		var style = getComputedStyle(document.querySelector(".slider"))
		var time = parseInt(style.transitionDuration) * 1000
		var css = "opened"
		var last = hash[hash.length-1]

		var opened = document.getElementsByClassName("opened")
		for (var i=0;i<opened.length;i++)
			opened[i].classList.remove(css)

		if (last == "experiences" || last == "") {
			flipper.classList.remove("flip")
			projects_view.classList.remove(css)
			setTimeout(function(){experience_view.classList.add(css)}, time)
		}
		if (last == "projects") {
			flipper.classList.add("flip")
			experience_view.classList.remove(css)
			setTimeout(function(){projects_view.classList.add(css)}, time)
		}

	}

	// ----------------------------------------------------------------------------------------------------------------
    
    function run(cmds)
    {
	    var cmds = location.search.substring(1).split("&")
	    
	    if (cmds.indexOf("anonymouse")>-1) convertLinksToText()

	    changeView()

	    document.body.className='fade-in';
		
	    if (cmds.indexOf("print") == -1 && cmds.indexOf("projects") == -1) {
			// setTimeout( flip, 1050)
			self.message(msgs.instructions[lang])
		}
	} // run


	// ----------------------------------------------------------------------------------------------------------------

	function start() {
		checkIE()
		window.onhashchange = changeView;
		renderNodes(this)
		// renderWikiStyleTags()
		renderTemplates()
		nte.renderBinds(self)
		renderWikiStyleTags()
		nte.attachEvents(self)
		run()
	}

	start()

})() // app