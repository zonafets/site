/**********************************************************************************************************************

	-- SCOPE ------------------------------------------------------------------------------

	Check browser compatibility and redirect to static version or go on


	-- CHANGELOG --------------------------------------------------------------------------

	180616\s.zaglio: moved from app


	-- TODO -------------------------------------------------------------------------------


***********************************************************************************************************************/


function isCompatibileBrowser() {

	// TODO: convert into chek of array elems
	
	var element = document.createElement("div")
	console.log("Verifing Compatibility")
	console.log("Array.prototype.forEach......:"+(Array.prototype.forEach?true:false))
	console.log("NodeList.prototype.forEach...:"+(NodeList.prototype.forEach?true:false))
	console.log("document.querySelector.......:"+(typeof(document['querySelector'])=='function'))
	console.log("document.querySelectorAll....:"+(typeof(document['querySelectorAll'])=='function'))
	console.log("element.querySelector........:"+(typeof(element['querySelector'])=='function'))
	console.log("element.querySelectorAll.....:"+(typeof(element['querySelectorAll'])=='function'))
	console.log("element.firstElementChild....:"+(typeof(element.firstElementChild)=='object'))
	// console.log("import of link...............:"+('import' in document.createElement('link')))

	// typeof NodeList.prototype.forEach
	// illegal invocation
	// console.log("window.Element.prototype.firstElementChild...:"+(typeof(window.Element.prototype.firstElementChild)!=='function'))
	var b = true
	if (b) b = Array.prototype.forEach?true:false
	if (b) b = NodeList.prototype.forEach? true:false
	if (!b) return b
	// if (!Object.prototype.forEach) return false
	if (typeof(document['querySelector'])!=='function' || 
		typeof(document['querySelectorAll'])!=='function' ||
		typeof(element['querySelector'])!=='function' || 
		typeof(element['querySelectorAll'])!=='function' ||
		typeof(element.firstElementChild)!=='object'
		) 
		return false

    // if (!('import' in document.createElement('link'))) return false;  // !Firefox

	console.log("Browser compatibility verified")
	return true
}

// ----------------------------------------------------------------------------------------------------------------
