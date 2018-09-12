(function() {
	var scripts
	for (var key in document.scripts) { 
		var src = document.scripts[key].src
		if (src.indexOf("bootLoader.js")>-1) {
			scripts = src.slice(src.indexOf("src=")+4).split("|")
			break
		}
	}
	scripts.forEach(function(it){
		var script = document.createElement('script');
		var fixed = (it.substr(-1) === "!")
		var file = ( fixed ? it.slice(0,-1) : it )
		var src = "../js/" + file + ".js"
		if (!fixed) src+="?dt=" + new Date().toISOString() 
		script.src = src
		script.async = false
		document.body.appendChild(script);
	})
})()