/*
-- COPYRIGHT  -------------------------------------------------------------------------

All rights reserved

-- NOTES ------------------------------------------------------------------------------

-- CHANGELOG --------------------------------------------------------------------------

190718\s.zaglio: 1st draft

-- TODO -------------------------------------------------------------------------------

*/

var data = {
	em: ["§eSY306Q@.WXS56PY4S03QU64","§U30U2 ZW9W .6 @Z6b/Z0VW"], 
	ph: ["§+IOQIJMQKOJOQFMI","§U30U2 ZW9W .6 @Z6b/Z0VW"], 
	pi: ["§g695 65 kWT FG GOMH / rW990WV / H UZ03V9W5","§U30U2 ZW9W .6 @Z6b/Z0VW 7W9@65S3 05X6"],
	ad: ["§N.Z x69S.056 x.9WW., JLFJI hS@.0Y3065W&5T@7;i/x (n.S3d)","§U30U2 ZW9W .6 @Z6b/Z0VW SVV9W@@"], 
	gh: ['§<S 5S4W="YZ" U3S@@=".6YY3W Z0VWR9WXW9W5UW@" Z9WX="Z..7@://Y0.Z-TQU64/e65SXW.@">Y0.Z-T/e65SXW.@</S>', "§U30U2 ZW9W .6 @Z6b/Z0VW"],
	recruiter: {
		recruiter:null,
		content:"Click here to <b>hide</b> references before print."
	},
	cv: {
		
		lastExperiences: {
			list:[{
				years:"2014 - 2019",
				summary:["Micro ERP/CRM<br>IOT facility","Docuware connector<br>(webapp)"],
				technologies:"RaspberryPI, ESP8266, C#, KnockoutJS,<br> Bootstrap, Razor/ASP.NET, Sqlite, MySQL,<br> Python, Git"
			},{
				years: "2007 - 2014",
				summary:["SAP Connector<br>(middleware)","Tavolinux<br>(hospitality)"],
				technologies:"Windows CE/NT, Linux, PDA, POS, C#, C++,<br> MSSQL, PostgreSQL, SVN, dotNET"
			}],
			fullList:{
				text:"For a detailed list of projects & companies with videos visit:"+
				     "<b><a href=\"http://%link%\">%link%</a></b>",
				link:"tiny.cc/ylc29y"
			}
		},

		roles: {
			list:[{
				years:"2014 - 2019",
				summary:"consultant, full-stack developer, technical support",
				companies:"ZeroD Srl, SOL Group Spa, Alpac Srl"
			},{
				years:"2007 - 2014",
				summary:"Project Manager, Team Leader, Senior Dev., ETL, Data Analisys&Integrator",
				companies:"Seltris srl: PDA, Motorola, MS-Visio/Project/Word, SharePoint, MSSQL, VB.NET"
			},{
				years:"1998 - 2000",
				summary:"Junior ICT Manager, System Engineer",
				companies:"Copan Italia Spa: HP Proliant, Zyxel, MSAccess"
			},{
				years:"1986 - 1998",
				summary:"Video Game dev., Technician, PLC dev., technical teacher in high school",
				companies:"CompaQ, 3com, Windows NT, Novell, Nixdorf, Zetafax, Intermec, Clipper"
			}],
			fullList:{
				text:"For a detailed list with videos please visit:"+
				     "<b><a href=\"http://%link%\">%link%</a></b>",
				link:"tiny.cc/dpc29y"
			}
		}
	} // cv
} // data

/* for translations */
function tr(txt) {
	return txt;
}

var Convert18 = function (txt) {
  var AII = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.-";
  var C18 = "STUVWXYZ0123456789@.-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQR";
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

function toggle(sender) {
	if (sender===undefined) sender=this
	var element = sender.currentTarget 
    var name = element.attributes.name!==undefined?element.attributes.name.value:null 
	var id = element.id || name // || element.tagName
	var spec = ""
	switch (id) {

		case 'ad': 
		case 'pi': 
		case 'em':
		case 'ph':
		case 'gh':
			var txt = Convert18(data[id][1])
			element.innerHTML = (element.innerText == txt ? Convert18(data[id][0]) : txt)
			break

		case 'photo':
			element.classList.add("hidden")
			sequence = parseInt(element.dataset.bind)
			sequence = ++sequence > 4 ? 1 : sequence
			document.querySelector("[name='photo'][data-bind='@sequence']".replace("@sequence",sequence)).classList.remove("hidden")
			break

		case 'recruiter':
			var elements = document.querySelectorAll(".hide-references")
			var show = updateRecruiter()
			for (var i=0;i<elements.length;i++) {
				var element = elements[i]
				if (show) element.classList.remove("hidden")
				else element.classList.add("hidden")
			}
			break

		default:
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

function updateRecruiter() {
	var show = true
	var showhide = [tr("show") , tr("hide")]
	if (data.recruiter.element == null)
		data.recruiter.element=document.querySelector("#recruiter span")
	else {
		show = data.recruiter.content.indexOf(showhide[0])>-1
		current = show ? showhide[0] : showhide[1] 
		target = show ? showhide[1] : showhide[0]
		data.recruiter.content = data.recruiter.content.replace(current,target)
	}
	data.recruiter.element.innerHTML = data.recruiter.content
	return show
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
}

function span(content,className)
{
	return '<span class="'+className+'"">'+content+'</span>'
}

function buildFullList(body,fullList,colSpan) {
	var tr
	var td
	tr = document.createElement("TR")
	tr.className = "full-list"
	td = document.createElement("TD")
	td.colSpan = colSpan
	var html = fullList.text.replace("%link%",fullList.link)
	html = html.replace("%link%",fullList.link)
	td.innerHTML = html
	tr.appendChild(td)
    body.insertBefore(tr,null)
}

function buildExperiences() {
	var body = document.querySelector("experiences table[class='normal-screen'] tbody")
	var last = body.lastElementChild
	var tr
	var td
	for (var i=0;i<data.cv.lastExperiences.list.length;i++) {
		var exp = data.cv.lastExperiences.list[i]
		tr = document.createElement("TR")
		tr.className = "bbottom"
		td = document.createElement("TD")
		td.innerHTML = exp.years
		tr.appendChild(td)
		for (var j=0;j<exp.summary.length;j++) {
			var sum = exp.summary[j]
			td = document.createElement("TD")
			td.innerHTML = sum
			tr.appendChild(td)
		}
		td = document.createElement("TD")
		td.innerHTML = exp.technologies
		td.className = "tright"
		td.colSpan="3"
		tr.appendChild(td)
		body.insertBefore(tr,null)
	}

	body = document.querySelector("experiences table[class='xs-screen'] tbody")
	last = body.lastElementChild
	for (var i=0;i<data.cv.lastExperiences.list.length;i++) {
		var exp = data.cv.lastExperiences.list[i]

		tr = document.createElement("TR")
		tr.className = "bbottom"
		td = document.createElement("TD")
		td.innerHTML = span(exp.years,"bglegend")
		td.colSpan = "6"
		tr.appendChild(td)
		body.insertBefore(tr,null)

		tr = document.createElement("TR")
		for (var j=0;j<exp.summary.length;j++) {
			var sum = exp.summary[j]
			td = document.createElement("TD")
			td.innerHTML = sum
			tr.appendChild(td)
		}
		td = document.createElement("TD")
		td.innerHTML = exp.technologies
		td.className = "tright"
		td.colSpan="3"
		tr.appendChild(td)
		body.insertBefore(tr,null)
	}

	buildFullList(body,data.cv.lastExperiences.fullList,"6")
}

function buildRoles() {
	/*
		<tr class="bbottom">
			<td>2014 - 2019</td>
			<td>consultant, full-stack developer, technical support</td>
			<td class="tright">ZeroD Srl, SOL Group Spa, Alpac Srl</td>
		</tr>
	*/
	var body = document.querySelector("roles table[class='normal-screen'] tbody")
	var last = body.lastElementChild
	var tr
	var td 
	for (var i=0;i<data.cv.roles.list.length;i++) {
		var exp = data.cv.roles.list[i]
		tr = document.createElement("TR")
		tr.className = "bbottom"

		td = document.createElement("TD")
		td.innerHTML = exp.years
		tr.appendChild(td)

		td = document.createElement("TD")
		td.innerHTML = exp.summary
		td.className = "tleft"
		tr.appendChild(td)

		td = document.createElement("TD")
		td.innerHTML = exp.companies
		td.className = "tright"
		tr.appendChild(td)

		body.insertBefore(tr,null)
	}
	buildFullList(body,data.cv.roles.fullList,"3")

	body = document.querySelector("roles table[class='xs-screen'] tbody")
	last = body.lastElementChild
	for (var i=0;i<data.cv.roles.list.length;i++) {
		
		var exp = data.cv.roles.list[i]
		
		var td = function(field,value,trClass) {
			var td
    		tr = document.createElement("TR")
			tr.className = trClass
			td = document.createElement("TD")
			if (field == "Years") {
	     		td.colSpan="2"
				td.innerHTML = value // span(value,"bglegend")
				td.className="tleft"
			} else {
    			td.className = "tleft"
				td.innerHTML = field
				tr.appendChild(td)
				td = document.createElement("TD")
				td.className = "tright"
				td.innerHTML = value
			}
			tr.appendChild(td)
			body.insertBefore(tr,null)
		}

		td("Years",span(exp.years,"bold"),"bbottom")
		td("Roles",exp.summary)
		td("Companies, HW, SW",exp.companies)
	}
	buildFullList(body,data.cv.roles.fullList,"3")

}

// generate translation array if not defined or translate text nodes
function translate(language) {

	if (language == "en") return

    var nodes = textNodesUnder(document.body)

    var txtDistinct=[]
    for(var i=0;i<nodes.length;i++) {
    	var txt = nodes[i].data.trim()
		txt = txt.replace(/\t+/g, ' ')
		txt = txt.replace(/  +/g, ' ')
		var found = false
		if (window.translations === undefined) {
			for (var j=0;j<txtDistinct.length;j++)
				if (txtDistinct[j]===txt) {
					found = true
					break
				}
			if (!found) txtDistinct.push(txt)
		} else {
			var txts = txt.split("\n")
			for (var k=0;k<txts.length;k++) {
				var txt = txts[k].trim()
				var id = crc32(txt)
				for (var j=0;j<translations.length;j++) {
					var tid = translations[j].id
					if (tid === id) {
						trs = translations[j][language]
						nodes[i].data = nodes[i].data.replace(txt,trs)
						break
					}
				}
			}
		}
    }
	if (window.translations !== undefined) return

    var txtDistinct = txtDistinct.sort()

	var js = "var translations=["
	for (var i=0;i<txtDistinct.length;i++) {
		txts = txtDistinct[i].split("\n")
		for (var j=0;j<txts.length;j++) {
			var txt = txts[j].trim()
			var id = crc32(txt)
			var it = ""
			for (var k=0;k<dictionary.length;k++) 
				if (txt===dictionary[k][0]) {
					it = dictionary[k][1]
					break
				}
			if (it === "") it=txt
			js+="// "+txt+"\n"
			js+='{id:'+id+',it:"'+it+'"},\n'
		}
	}
	js+=']'
	console.log(js)
}


function test(){
	/*
		this are some examples and tests about a more simple way to 
		build documents as this.
	*/

	/*
		<roles>
			<table class="xs-screen">
				<tbody>
					<years></years>
					<summary></summary>
					<company></company>
					<details></details>
				</tbody>
			</table>
		</roles>
	*/

	var roles_html_bind = {
		"roles table[class='xs-screen']":{
			tbody:{
				_:data.cv.roles.list,
				details:data.cv.roles.fullList.text.split("%link%").join(data.cv.roles.fullList.link)
			}
		}
	}

	var roles = {
		xs_screen: {
			tag:"table",
			className:"xs-screen",
			roles: {
				tag:"tbody",
				rows: {
					_each: data.cv.roles.list,		
					years:{						// tag:"tr" implicit
						colSpan:"2",
						td:{innerHTML:"{years}"}
					},
					summary:{
						td:[
							{innerHTML:"Role"},
							{innerHTML:"{summary}", className:"tright"}
						]
					},
					company:{
						td:[
							{innerHTML:"Companies, HW, SH", className:"tleft"},
							{innerHTML:"{company}", className:"tleft"}
						]
					},
				},
				summary:{
					td:{
						innerHTML:"For a detailed list with videos please visit:tiny.cc/dpc29y",
						colSpan:"2"
					}
				}
			}
		},
		wide_screen: {
			tag:"table",
			className:"wide-screen",
			roles: {
				tag:"tbody",
				header:{		
					td:[{innertHTML:"Roles"},{innerHTML:"Companies, HW, SW",colSpan:"2"}]
				},
				rows:{
					_each: data.cv.roles.list,
					td:[{innertHTML:"{years}"},{innerHTML:"{summary}"},{innerHTML:"{companies}"}],
				}

			}
		}
	} // roles
}

function main() {
	var language = (navigator.language || navigator.browserLanguage).split('-')[0]
	if (language != "it" && language!="en") language = "en"

	test()

	activeElements()

	updateRecruiter()

	buildExperiences()

	buildRoles()

	translate(language)

	document.body.className = 'fade-in'
}
