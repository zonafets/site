/**********************************************************************************************************************

	-- SCOPE ------------------------------------------------------------------------------

	Check browser compatibility and redirect to static version or go on


	-- CHANGELOG --------------------------------------------------------------------------

	180616\s.zaglio: moved from app


	-- TODO -------------------------------------------------------------------------------


***********************************************************************************************************************/


function isCompatibileBrowser() {
	var element = document.createElement("div")
	console.log("Verifing Compatibility")
	console.log("Array.prototype.forEach......:"+(!Array.prototype.forEach))
	console.log("NodeList.prototype.forEach...:"+(!NodeList.prototype.forEach))
	console.log("document.querySelector.......:"+(typeof(document['querySelector'])!=='function'))
	console.log("document.querySelectorAll....:"+(typeof(document['querySelectorAll'])!=='function'))
	console.log("element.querySelector........:"+(typeof(element['querySelector'])!=='function'))
	console.log("element.querySelectorAll.....:"+(typeof(element['querySelectorAll'])!=='function'))
	console.log("element.firstElementChild......:"+(typeof(element.firstElementChild)!=='object'))

	typeof NodeList.prototype.forEach
	// illegal invocation
	// console.log("window.Element.prototype.firstElementChild...:"+(typeof(window.Element.prototype.firstElementChild)!=='function'))
	if (!Array.prototype.forEach) return false
	if (!NodeList.prototype.forEach) return false
	// if (!Object.prototype.forEach) return false
	if (typeof(document['querySelector'])!=='function' || 
		typeof(document['querySelectorAll'])!=='function' ||
		typeof(element['querySelector'])!=='function' || 
		typeof(element['querySelectorAll'])!=='function' ||
		typeof(element.firstElementChild)!=='object'
		) 
		return false
	console.log("Compatibility verified")
	return true
}

// ----------------------------------------------------------------------------------------------------------------
