/**********************************************************************************************************************

	-- NOTES ------------------------------------------------------------------------------

	This isn't only a page with my CV, but also a place where I'll refine the code to test 
	the concepts of NTE (https://github.com/zonafets/NTE)

	I know, this is not the better code. DRY principle can be applied more.

	-- SCOPE ------------------------------------------------------------------------------

	Render content of JSON(cv-data.js) using an experimental template technique that I'am
	calling/define as NTE (Natural Template Engine) or TBE (template by example).


***********************************************************************************************************************/
// "use strict"

// ----------------------------------------------------------------------------------------------------------------

app.init = function() {

	// select data source based on language param
    app.lang = nte.cmds.param("lang","it")
    cv = app.cv_data[app.lang] 
    if (!cv) { app.lang="it"; cv = app.cv_data.it }
    app.cv = cv

}

// node constructors ==========================================================================================

app.html.__proto__.lg = function(node) {
	var lg = document.createElement("lg")
	lg.appendChild(node)
	return lg
}

// ----------------------------------------------------------------------------------------------------------------

app.html.companies = function(list) {
		
	var select = nte.select(this)
	var list = select("list")
	nte.emptyNode(list)

	var add = nte.add(list),
		bold = nte.bold, txt = nte.txt , spcIf = nte.spcIf, lnk = nte.lnk
	
	var n = 0, i = 0;

	var exps = cv.experiences
	exps.forEach(
		function(it) { n += it.companies.length }
	)

	exps.forEach(
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
}

// ----------------------------------------------------------------------------------------------------------------

app.html.stacks = function(list) {

	var select = nte.select(this)
	var list = select("list")
	nte.emptyNode(list)

	cv.experiences.forEach(
		function(it,i) {

			var append = nte.append, add = nte.add(list),
				txt = nte.txt , spcIf = nte.spcIf, bold = nte.bold

			var id = String.fromCharCode( 65 + i )
			it.stackId = id
			var text = " ●\u00a0"+id+" "

	    	add( append( lg ( txt(spcIf(i>0)) ), bold( text ) ))

			add( txt( " " + it.stack + " " ) )
    	}
    )
} // stacks-idx

// ----------------------------------------------------------------------------------------------------------------

app.html.competencies = function(list) {

	var select = nte.select(this)
	var list = select("list")
	nte.emptyNode(list)

	cv.competencies.forEach(
		function(it,i) {
	    	var txt = nte.txt, append = nte.append, add = nte.add(list), create = nte.create

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
} // competencies-idx

// ----------------------------------------------------------------------------------------------------------------

app.html.projects = function() {
	var
		elem = nte.elem, append = nte.append, create = nte.create, 
		get = nte.get(this), select = nte.select(this),
		bold = nte.bold, txt = nte.txt , spcIf = nte.spcIf,
		lnk = nte.lnk, trNtd = nte.trNtd, li = nte.li, replyElem = nte.replyElem

	var table = select("table")
	var tbody = select("tbody")
	if (!tbody) tbody = create("tbody")
	nte.emptyNode(tbody)
	var prevComps = ""

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
} // projects

// ----------------------------------------------------------------------------------------------------------------

// <lang>&nbsp;- &nbsp;<a></a></lang>
app.html.lang = function(a) {
	window.scrollTo(0,0)
	var a = this.querySelector("a")
	var txt
	var lnk
	if (app.lang === "it") {
		txt = "ENG"
		lnk = location.pathname+"?lang=en"+location.hash
	} else {
		txt = "ITA"
		lnk = location.pathname+"?lang=it"+location.hash
	}
	a.innerText = txt
	a.href = lnk
}

// ========================================================================================================
// APP Start ==============================================================================================
// ========================================================================================================

app.start = function() {

	var cv = app.cv

	// messages
	var browserLang = navigator.language.substring(0,2)

	var messages = {
		it: {
			notForIe: "Segui l'esempio di Microsoft. Abbandona Internet Explorer per qualcosa di più compatibile.",
			instructions:
				"Questo CV è costituito da una WebApp\n\n"+
				"Cliccare/toccare sull'email per copiarla nella clipboard\n\n"+
				"Cliccare/toccare questo messaggio per chiuderlo\n\n"+
				"Se in 'vista dettagli', cliccare/toccare sulla fotografia per cambiare da elenco progetti a esperienze\n\n",
			emailCopied:"Email copiata nella clipboard.",
			redirect:
				"Questo browser non è completamente compatibile con le funzionalità richieste per le parti dinamiche.\n\n"+
				"Questa app è disegnata per Chrome/Opera attualmente sono i browser più diffusi e veloci.\n\n"+
				"Verrete rediretti alla versione statica."
		},
		
		en: {
			notForIe: "Follow Microsoft's example. Leave Internet Explorer for something more compatible",
			instructions:
				"This CV consists of a WebApp\n\n"+
				"Click / tap on the email to copy it to the clipboard\n\n"+
				"Click / tap this message to close it\n\n"+
				"If in 'details view', click / tap on the photo to change from projects list to experiences\n\n",
			emailCopied: "Email copied into clipboard.",
			redirect:
				"This browser is not fully compatible with the functionality required for dynamic parts.\n\n"+
				"This app is designed for Chrome / Opera currently they are the most widespread and fast browsers.\n\n" +
				"You will be redirected to the static version."
		}
	} // messages

	var msgs = messages[browserLang]

	// ----------------------------------------------------------------------------------------------------------------

	var redirectedPage = "curriculum_static.htm"

	function wasRedirected() {	
		return (window.location.href.substr(-redirectedPage.length)===redirectedPage) ? true : false
	}

	if (wasRedirected()) {
		document.body.style.display = 'block';
		return
	}

	// ----------------------------------------------------------------------------------------------------------------

	function redirectToStaticVersion() {
		console.log("Redirecting to static version")
		alert(msgs.redirect)
		window.location.href = redirectedPage
	}

	if (!isCompatibileBrowser()) 
		redirectToStaticVersion()

	// ----------------------------------------------------------------------------------------------------------------

	// generic utilities ==============================================================================================

	// ----------------------------------------------------------------------------------------------------------------

	app.message = function(textOrClickEvent) {
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

	app.flip = function(ev) {
		var target = ev?ev.currentTarget:null
		var photo = document.querySelector(".flip-container")
		if (target === photo) {
			swapViews()
		}
		else
			photo.click()
	}

	// ----------------------------------------------------------------------------------------------------------------

    app.copyEmail2Clipboard = function() {
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
        app.message(msgs.emailCopied)
    }

	// ----------------------------------------------------------------------------------------------------------------

    /*********************************
    **                              **
    **   Section functions          **
    **                              **
    **********************************/

	function checkIE() 
	{	    
    	if (nte.isIE()) alert(msgs.notForIE)
    }

	function renderNodes() 
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

	} // RenderNodes

	// ----------------------------------------------------------------------------------------------------------------

	function replaceMacrosAndTextNodes() 
	{

	    // todo:180827\s.zaglio: these replacements require generalization
	    // note: https://stackoverflow.com/questions/42040730/faster-way-of-replacing-text-in-all-dom-elements

	    if (location.protocol === "file:")
	    	app.origin = "file:///home/stefano/develop/GitHub/site/pages/curriculum.htm"
	    else
	    	app.origin = location.origin+"/site/pages/curriculum.htm"

	    if (app.lang != "it") app.origin+="?lang="+app.lang

	    var hash = location.hash
	    var projects = "#details#projects"

	    app.origin+=hash

	    var details = app.origin+projects
	    cv.links[details] = details

    	nte.replaceTag("%details%",details)
    	nte.replaceTag("%date%",app.date)

    	if (app.cv_data[app.lang].textNodes !== undefined) {
    		var tn = app.cv_data[app.lang].textNodes
    		// Object.getOwnPropertyNames(tn).forEach( function(key) 
    		for (var key in tn) 
    			if (tn.hasOwnProperty(key)) 
			    	nte.replaceTag(key,tn[key])
	    }

	} // replaceMacrosAndTextNodes

	// ----------------------------------------------------------------------------------------------------------------

	function renderWikiStyleTags(html) 
	{

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

	    html = html.replaceAll("&lt;br/&gt;","<br/>")

	    return html

	} // renderWikiStyleTags

	// ----------------------------------------------------------------------------------------------------------------

	function changeView(ev,transitionDuration) {

		app.html.lang()

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

	function render() {

		checkIE()
		window.onhashchange = changeView;

		renderNodes()
		nte.renderBinds()
	    
		replaceMacrosAndTextNodes()

		var html = document.body.innerHTML

		// todo: require more work because replace §???§ with a <tag>???<tag>
		html = renderWikiStyleTags(html)

		document.body.innerHTML = html

		// the direct change of html requery resync nodes<->fn
		nte.collectTextNodes()
		nte.bindNodes()

		nte.attachEvents()
	}

	// ----------------------------------------------------------------------------------------------------------------
    
    function run()
    {
    	var cmd = nte.cmds.param
	    
	    // if (cmd("anonymouse"))
		
	    if (cmd("print") && cmd("projects")) {
			// setTimeout( flip, 1050)
			changeView()
	    	document.body.className='fade-in';
			app.message(msgs.instructions)
		} else {
	    	document.body.className='fade-in';
			changeView(null,0)
		}

	} // run

	// ----------------------------------------------------------------------------------------------------------------

	var time = new Date().getTime()
	render()
	var elapsed = (new Date().getTime()) - time

	/*
		Timings (chrome 65 - ubuntu mate 16 - i5 - 8GB - radeon - hdd)
		180911\s.zaglio: ~20ms (replacing [%texts%] using body.html)
	*/

	console.log("Rendering time: " + elapsed + "ms")

	run()

}