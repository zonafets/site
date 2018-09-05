/**********************************************************************************************************************

	-- NOTES ------------------------------------------------------------------------------

	This isn't only a page with my CV, but also a place where I'll refine the code to test 
	the concepts of NTE (https://github.com/zonafets/NTE)

	I know, this is not the better code. DRY principle can be applied more.

	-- SCOPE ------------------------------------------------------------------------------

	Render content of JSON(cv-data.js) using an experimental template technique that I'am
	calling/define as NTE (Natural Template Engine) or TBE (template by example).


	-- CHANGELOG --------------------------------------------------------------------------

	180704\s.zaglio: moving generic DOM fn to nte.js
	180612\s.zaglio: begin of apply Brian W. Kernighan and P. J. Plaugher principle


	-- TODO -------------------------------------------------------------------------------

	180602\s.zaglio: optimize multiple string replace in renderWikiStyleTags()
	180601\s.zaglio: apply DRY principle to code and convert to NTE

***********************************************************************************************************************/
"use strict"

var app = new (function() {

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
			it:"Questo CV è costituito da una WebApp\n\n"
			  +"Cliccare/toccare sull'email per copiarla nella clipboard\n\n"
			  +"Cliccare/toccare questo messaggio per chiuderlo\n\n"
			  +"Se in 'vista dettagli', cliccare/toccare sulla fotografia per cambiare da elenco progetti a esperienze\n\n",
			en:"This CV consists of a WebApp\n\n"
			  +"Click / tap on the email to copy it to the clipboard\n\n"
			  +"Click / tap this message to close it\n\n"
			  +"If in 'details view', click / tap on the photo to change from projects list to experiences\n\n"
		},
		emailCopied:{
			it:"Email copiata nella clipboard.",
			en:"Email copied into clipboard."
		},
		redirect:{
			it:"Questo browser non è completamente compatibile con le funzionalità richieste per le parti dinamiche.\n\n"
			  +"Questa app è disegnata per Chrome/Opera attualmente sono i browser più diffusi e veloci.\n\n"
			  +"Verrete rediretti alla versione statica.",
			en:"This browser is not fully compatible with the functionality required for dynamic parts.\n\n"
			  +"This app is designed for Chrome / Opera currently they are the most widespread and fast browsers.\n\n" 
			  +"You will be redirected to the static version."
		},
	}

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
		alert(msgs.redirect[lang])
		window.location.href = "curriculum_ita_static.htm"
	}

	if (!isCompatibileBrowser()) 
		redirectToStaticVersion()

	// ----------------------------------------------------------------------------------------------------------------

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

	self.html = {

		companies: function(node) {
		
			var elem = nte.elem, append = nte.append, create = nte.create, 
	    		get = nte.get(node), select = nte.select(node), add = nte.add(node),
				bold = nte.bold, txt = nte.txt , spcIf = nte.spcIf, lnk = nte.lnk
			
			var n = 0, i = 0;

			var list = cv.experiences
	    	list.forEach(
	    		function(it) { n += it.companies.length }
	    	)

	    	list.forEach(
	    		function(it) {

			    	add( lg( txt( spcIf(i>0) + it.period ) ) )
			    	
			    	it.companies.forEach(
			    		function(it) {

			    			var id = n - i
			    			it.id = id
			    			i++

			    			add( bold( txt( " ●\u00a0"+id+".\u00a0" ) ) )

		    				add( txt("\u00a0") )
			    			if (it.hasOwnProperty("link") && it.link!="")
			    				add( lnk( it.link, txt(it.name) ) )
			    			else 
			    				add( txt(it.name) )

			    			if (it.prov)
		    					add( txt(" - " + it.prov + " ") )
			    		}
			    	)
		    	}
		    )
		},

	// ----------------------------------------------------------------------------------------------------------------

    	stacks: function(node) {
			cv.experiences.forEach(
	    		function(it,i) {

					var append = nte.append, add = nte.add(node),
						txt = nte.txt , spcIf = nte.spcIf, bold = nte.bold

	    			var id = String.fromCharCode( 65 + i )
	    			it.stackId = id
	    			var text = " ●\u00a0"+id+" "

			    	add( append( lg ( txt(spcIf(i>0)) ), bold( text ) ))

	    			add( txt( " " + it.stack + " " ) )
		    	}
		    )
	    }, // stacks-idx

	// ----------------------------------------------------------------------------------------------------------------

    	competencies: function(node) {
			cv.competencies.forEach(
	    		function(it,i) {

			    	var txt = nte.txt,
			    		elem = nte.elem, append = nte.append, add = nte.add(node), create = nte.create, 
	    				get = nte.get(node), select = nte.select(node)

					var id,dsc,span,img,tn

			    	id = it[0].toLowerCase()
			    	dsc = it[1]

			    	span = create("span")
			    	img = create("img")
	    			img.src = "../images/icons/" + it[0].toLowerCase() + ".png"
	    			append(span,img)

	    			tn = txt(" " + dsc + " ")
	    			append(span,tn)

	    			add(span)

		    	}
		    )
	    }, // competencies-idx

	// ----------------------------------------------------------------------------------------------------------------

    	projects: function(node) {
			var
	    		elem = nte.elem, append = nte.append, create = nte.create, 
	    		get = nte.get(node), select = nte.select(node),
	    		bold = nte.bold, txt = nte.txt , spcIf = nte.spcIf,
	    		lnk = nte.lnk, trNtd = nte.trNtd, li = nte.li, replyElem = nte.replyElem

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
			    						cv.links[alink] = link 
			    					} else {
			    						dsc = name ? name+": "+desc : desc
			    					}

			    					var tn = txt(dsc)
			    					append(tr,td,tn)

			    					// stack
			    					td = create("td")
			    					tn = txt(exp.stackId)
			    					append(tr,td,tn)

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
				    							img.src = "../images/icons/" + it.toLowerCase() + ".png"
				    							append(td,span,img)
				    						}
				    					)
				    					prevComps = comps
				    				}

			    					append(tr,td)

			    					// company
			    					td = create("td")
			    					tn = txt(comp.id)
			    					append(tbody,tr,td,tn)
			    				}
			    			)
	    				}
	    			)
	    		}
	    	)
	    	append(table,tbody)
	    }

	} // html

	// ----------------------------------------------------------------------------------------------------------------

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

	    for (var tag in self.html) {
	    	var node = select(tag)
	    	if (!node) {
	    		console.log("Warning, node '" + tag + "' not found")
	    	} else 
	    		self.html[tag](node)
	    }

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

		function merge_links(obj,collection) {
			if (collection === undefined) collection={}
			for (var k in obj) {
				if (k === "links") {
					var links = obj[k]
					for (var j in links) collection[j]=links[j]
				}
				if (typeof obj[k] === "object")
					merge_links(obj[k], collection)
			}
			return collection
		}

		var links = merge_links(cv)

		// add links from companies
		cv.experiences.forEach( 
			function(it) {
				it.companies.forEach( 
					function(c) {
						links[c.name] = c.link
					}
				)
			}
		)

		// replace [link] with aref
		for (var key in links) {
	        var a = '<a href="' + links[key] + '">' + key + '</a>'
	        var r = "["+key.replace("&","&amp;")+"]"
	        html = html.replaceAll( r, a )
	    }
	

		function collect(obj,separators) {
			var collection = [] 
			var regStr = ""
			if (typeof(separators) === "string") 
				separators = [separators,separators] 

			separators.forEach(
				function(sep) {
					if (regStr != "") regStr+="(.*?)"
					for (var i=0;i<sep.length;i++) regStr+="["+sep.substr(i,1)+"]"
				}
			)

			var regxp = new RegExp(regStr,"g")
			if (collection === undefined) collection = []

			function innerCollect(obj) {
				for (var k in obj) {
					if (k !== "links" && k !== "link" ) {
						var prop = obj[k]
						if (typeof prop === "object")
							innerCollect(obj[k])
						if (typeof prop === "string") {
							collection.push.apply(collection,prop.match(regxp))
						}
					}
				}
			}
			innerCollect(obj)
			return collection
		}

	    // collect and replace //...// with <i>...</i>
		var italics = collect(cv,"//")
	    italics.forEach(
	    	function(it) {
		        var i = '<i>' + it.slice(2,-2) +'</i>'
		        html = html.replaceAll( it, i )
		    }
		)

	    // collect and replace **...** with <b>...</b>
		var bolds = collect(cv,"**")
	    bolds.forEach(
	    	function(it) {
		        var i = '<b>' + it.slice(2,-2) +'</b>'
		        html = html.replaceAll( it, i )
		    }
		)

	    // collect and replace $...$ with <span hidden>...</span>
		var bolds = collect(cv,"§")
	    bolds.forEach(
	    	function(it) {
		        var i = '<span hidden>' + it.slice(1,-1) +'</span>'
		        html = html.replaceAll( it, i )
		    }
		)

	    // collect and replace >>...<< with <center>...</center>
		var bolds = collect(cv,[">>","<<"])
	    bolds.forEach(
	    	function(it) {
		        var i = '<center>' + it.slice(2,-2) +'</center>'
		        it = '&gt;&gt;' + it.slice(2,-2) +'&lt;&lt;'
		        html = html.replaceAll( it, i )
		    }
		)
	    
	    // todo:180827\s.zaglio: these replacements require generalization
	    html = html.replaceAll("&lt;br/&gt;","<br/>")
	    if (location.protocol === "file:")
	    	html = html.replaceAll("%origin%","file:///home/stefano/develop/GitHub")
	    else
	    	html = html.replaceAll("%origin%",location.origin)
	    document.body.innerHTML = html

	} // renderWikiStyleTags

	// ----------------------------------------------------------------------------------------------------------------

	function changeView(ev,transitionDuration) {
		var hashes = document.querySelectorAll("*[hash]")
		var hash = location.hash === "" ? [""] : location.hash.split("#").slice(1)
		
		/* TODO: (or not TODO) hash path verifier
		   Actually the correct hash path (tree) is not verified.
		   But teorically the path is entered by links or preferences, not by hand.
		   So this is not really necessary.
		*/
		hashes.forEach(
			function(it) {
				var h = it.attributes.hash.value.substr(1)
				var val = (hash.indexOf(h)>-1 ? "block" : "none")
				it.style.display = val
			}
		)

		var flipper = document.querySelector(".flip-container")
		var experience_view = document.querySelector("[hash='#experiences']")
		var projects_view = document.querySelector("[hash='#projects']")
		var style = getComputedStyle(document.querySelector(".slider"))
		var time = transitionDuration === undefined? parseInt(style.transitionDuration) * 1000 : 0
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

	var cmds = new (function() {
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

		return self
	})() // cmds

	// ----------------------------------------------------------------------------------------------------------------
    
    function run()
    {
    	var cmd = cmds.param
	    
	    if (cmd("anonymouse")) nte.convertLinksToText()
		
	    if (cmd("print") && cmd("projects")) {
			// setTimeout( flip, 1050)
			changeView()
	    	document.body.className='fade-in';
			self.message(msgs.instructions[lang])
		} else {
	    	document.body.className='fade-in';
			changeView(null,0)
		}

	} // run


	// ----------------------------------------------------------------------------------------------------------------

	function start() {

	    var lang = cmds.param("lang")
	    cv = lang? config.cv_data[lang] : config.cv_data.it

		checkIE()
		window.onhashchange = changeView;
		renderNodes(this)
		// renderWikiStyleTags()
		nte.renderTemplates()
		nte.renderBinds(self)
		renderWikiStyleTags()
		nte.attachEvents(self)
		run()
	}

	start()

})() // app