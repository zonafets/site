/*
-- COPYRIGHT  -------------------------------------------------------------------------

All rights reserved

-- NOTES ------------------------------------------------------------------------------

-- CHANGELOG --------------------------------------------------------------------------

201115\s.zaglio: model review
190718\s.zaglio: 1st draft

-- TODO -------------------------------------------------------------------------------

*/

var data ={}

function browser_language() {
	return (navigator.language || navigator.browserLanguage).split('-')[0]
}

var Convert18 = function (txt) {
  var AII = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.-<>";
  var C18 = "STUVWXYZ0123456789@.-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQR§ç";
  var decode = (txt.substr(0,1)=="§") 
  if (decode) {
  	alphabet = C18
  	substitution = AII
  	txt = txt.substring(1)
  } else {
  	alphabet = AII
  	substitution = C18
  }

  return (decode?"":"§") + txt.split("").map(function (c) {
    if (alphabet.indexOf(c) != -1) { return substitution.charAt(alphabet.indexOf(c)); }
      else { return c; }
  }).join("");
};

function getDifference(a, b)
{
    var i = 0;
    var j = 0;
    var result = "";

    while (j < b.length)
    {
        if (a[i] != b[j] || i == a.length)
            result += b[j];
        else
            i++;
        j++;
    }
    return result;
}

// collect text nodes excluding empty strings
function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) {
  	var txt = n.data.trim().replace(/\s\s+/g, ' ')
  	if (txt=="" || txt=="\n") continue;
  	// console.log(txt)
  	// if (txt.startsWith("Briefly")) debugger;
  	a.push(n);
	}
  return a;
}

var makeCRCTable = function(){
    var c;
    var crcTable = [];
    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
}

var crc32 = function(str) {
    var crcTable = window.crcTable || (window.crcTable = makeCRCTable());
    var crc = 0 ^ (-1);

    for (var i = 0; i < str.length; i++ ) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
};

function Normalize18(elem) {
	if (elem.innerHTML.substr(0,1)=="§")
		elem.innerHTML = Convert18(elem.innerHTML)
}

function toggle(sender) {
	if (sender===undefined) sender=this
	var element = sender.currentTarget 
    var name = element.attributes.name!==undefined?element.attributes.name.value:null 
	var id = element.id || name // || element.tagName
	var spec = ""
	switch (id) {

		case 'photo':
			element.classList.add("hidden")
			sequence = parseInt(element.dataset.bind)
			sequence = ++sequence > 4 ? 1 : sequence
			document.querySelector("[name='photo'][data-bind='@sequence']".replace("@sequence",sequence)).classList.remove("hidden")
			break

		case 'recruiter':
			var elements = document.querySelectorAll(".hide-references")
			var show = undefined
			for (var i=0;i<elements.length;i++) {
				var element = elements[i]
				if (show === undefined) {
					if (element.classList.contains("hidden")) show = true; else show=false
				}
				if (show) element.classList.remove("hidden")
				else element.classList.add("hidden")
			}
			break
			
		case 'lang':
		    change_lang()
			break

		default:
			if (element.tagNAME="SWITCH") {
				var on = element.querySelector("on")
				var off = element.querySelector("off")
				if (off.style.display == "none") {
					on.style.display = "none"
					off.style.display = "inline-block"
				} else {
					Normalize18(on)
					if (on.childElementCount>0) {
						for (var i = 0; i < on.children.length; i++) {
							var elem = on.children[i]
							Normalize18(elem)
						}
					}
					on.style.display = "inline-block"
					off.style.display = "none"
				}
			}
			else
				debugger
	}
}

function email2clipboard() {
    document.oncopy = function(event) {
        event.clipboardData.setData("Text", Convert18(data.em[0]));
        event.preventDefault();
    }
    document.execCommand("Copy");
    document.oncopy = undefined;
}


function change_lang(language) {

    // toggle or force language

    language = language === undefined ? (data.lang == "en" ? "it" : "en") : language
	var old_language = data.lang === undefined ? (language == "en" ? "it" : "en") : data.lang

    img = document.getElementById("lang")
	img.src = "../images/flag_" + language + ".png"
	
    data.lang = language

	if (data.lang_sheet === undefined) {
		data.lang_sheet = document.createElement('style')
		document.body.appendChild(data.lang_sheet);	
	}

	var lngTpl = "@ln {display: @display;font-size: inherit;}@ln > * {font-size: inherit;}"
	var lngCss = lngTpl.replace("@ln",language).replace("@display","block-inline")
			   + lngTpl.replace("@ln",old_language).replace("@display","none")

	data.lang_sheet.innerHTML = lngCss

}


function activeElements() {
	var elements = document.querySelectorAll(".hide-references.toggle")
	for (var i=0;i<elements.length;i++) {
		var element = elements[i]
		element.innerText = Convert18(data[element.attributes.name.value][1])
		element.style.cursor = "pointer"
	}

	var activeElements = document.querySelectorAll(".toggle")
	for (var i=0;i<activeElements.length;i++) {
		var element = activeElements[i]
		element.style.cursor = "pointer"
		element.addEventListener("click",toggle)
	}
	
	var activeElements = document.querySelectorAll("switch")
	for (var i=0;i<activeElements.length;i++) {
		var element = activeElements[i]
		element.style.cursor = "pointer"
		element.addEventListener("click",toggle)
		
		var off = document.createElement("off")
		off.innerHTML = "<en>Click here to show</en><it>Cliccare qui per mostrare</it>"
		element.appendChild(off)
	}
}


function main() {
	
	change_lang(browser_language())
	
	activeElements()

	document.body.className = 'fade-in'
}
