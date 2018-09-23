nte.define("app.cv_data")

app.cv_data.en = JSON.parse(JSON.stringify(app.cv_data.it))

app.cv_data.en.briefly = {
	lines: [
        "motivated to problem solving or commercial management, in tune with the company policy and methodologies, in team or autonomy",
        "with balanced attention between costs/benefits and performance",
        "through all aspects of the life cycle, from R&D to post-sales with related tools",
    	"creative solutions through brainstorming, mind maps, //in team or in autonomy//", 
    	"UI/UX care thanks to personal training in cognitive psychology",
        "experience in the fields of [entertainment], [manufacturing], [reception], [office and industrial automation], "+
        "as [technician, developer] junior and senior, systems engineer, [analyst], [trainer], [ICT manager], program and "+
        "[std&qly] manager",
        "specialized in [product traceability], [systems integration], [documentation],"+ 
        "process optimization ([e.g. 1], [e.g. 2], [e.g. 3])",
        "Full-Stack Desktop, Mobile and Web Developer (multi-threading, multi-process and multi-platform)",
    	"availability to support with teleworking, emergency management, transfers, even long-term international ones",
    	"possibility of recruitment within 2 weeks",
    	"future interests: Angular or React on web/desktop, Xamarin on desktop/mobile, Java on server, OpenCV"
    	// "RAL 45K(trattabili)"
	],
	links:{
		"entertainment":						"http://digilander.libero.it/bolido/MGSexyTV.htm",
		"manufacturing": 						"https://www.youtube.com/watch?v=5KzKdfDnq_o",
		"reception": 							"https://www.youtube.com/watch?v=V1gc_mjGH1I",
		"office and industrial automation": 	"https://zonafets.github.io/site/responsabile_it_copan_italia_spa.htm",
		"technician, developer": 				"images/certificates/stefano_referenze_intea.jpg",
		"analyst": 								"http://xoomer.virgilio.it/stezagl/io/ita/esempi_estratti_da_mie_analisi.htm",
		"trainer": 								"images/certificates/stefano_referenze_bpascal.jpg",
		"ICT manager": 							"images/certificates/stefano_referenze_copan.jpg",
		"std&qly":								"software_quality_and_standard.htm",
		"product traceability":					"https://youtu.be/t7-qQL8V-zA",
		"systems integration": 					"https://youtu.be/qMPB_zsRn1s",
		"documentation": 						"esempi_estratti_da_mie_analisi.htm",
		"e.g. 1": 								"https://youtu.be/MBP_jCdrCDc?t=4m56s",
		"e.g. 2": 								"https://youtu.be/qMPB_zsRn1s?t=5s",
		"e.g. 3": 								"https://youtu.be/t7-qQL8V-zA?t=5s",
	},

},

app.cv_data.en.introduction = [
	{
		hash:"",
		content:[
			"<br/>",
  			"Dear Manager,<br/><br/>"+
  			"I would like to put my twenty years of experience at the service of your company,<br/>"+
  			"through the skills acquired in different sectors, roles and ways of working.<br/><br/>"+
			"It has seen the achievement and enduring ten years of the objectives, balancing between management or technical or commercial solution of the problems, between adaptation or innovation, with the aim of cooperating to solve."+
			"<br/>This qualifies me as an analyst programmer with a family of techniques suited to different paradigms, able to anticipate short or long term effects."+
			"<br/>Short experience as a team leader, program manager, coordinator, quality manager and integration, paves the way for a possible role of project manager."+
			"",
			"**Hard skills**",
			"Head technician with information technology specialization, graduated with honors, in the first ten years I alternatively perform activities as a programmer, technician and teacher. By maturing the levels in the various roles, I learn and successfully use the tools required by the company.",
			"The areas range from firmware to the front end, back office, from the micro device to the main frame, also working in environments different from Windows. Sectors range from entertainment / Horeca to manufacturing with solutions for optimizing performance or the work processes themselves.",
			"The **recent knowledge** concern: HTML, Javascript, C#, Razor/Asp.Net, Jquery, KnockoutJS."+
			"<br/>**Short term** interests: Angular o React su web/desktop, Xamarin su desktop/mobile, OpenCV/Python for video/image processing."+
			"<br/>**Future** interests: blockchain per certificazione e uso AI per analisi dati.",
			"",
			"**Soft skills**",
			"In the last ten years I specialize in analysis and development with project management and team management moments, without marginalizing support through helpdesk, remotely or with foreign travel."+
			"A collateral study also sees me personally involved in the difficult art of restructuring, balancing between conservation and innovation. "+
			"<br/>For a **detailed view of the skills**, you can follow my CV online at: [%details%],"+
			" which is an example web app with links to videos of my creations..",
			"<br/>",
			"Confident in positive feedback,",
			"best regards.<br/>",
			"s.z.",
			"<br/>",
			"Castiglione D/S, 24/05/2018<br/>",
			">>(In compliance with the Italian D.L. #196-30/06/2003, I authorize to use my personal details)<<"
		]
	}
]

app.cv_data.en["lasts-kb"] = {
	lines:[
    	["Javascript, HTML, C#/VB/Asp/MVC/Razor, dotNET, KnockoutJS, JQuery, Bootstrap ([e.g. 4], [e.g. 5])",5],
    	["SAP/JDEdwards integration",4],
    	["[MS SQL Server]",7],
    	["[Postgresql], MySQL, Sqlite, Node.js, JQuery",2],
    	["MS Project and Visio",1]
    ],
    links: {
    	"e.g. 4":			"https://www.youtube.com/watch?v=X8Bl7z2anok",
        "e.g. 5":			"https://youtu.be/4UNjBde8e1Q",
        "MS SQL Server": 	"tsql_zaglios_collection.htm",
        "Postgresql":		"https://www.youtube.com/watch?v=B_c3QVeiCDs"
    }
}

app.cv_data.en.experiences = [
	{
		// ================================================================================================================
		period: "2014 - today",
		// ================================================================================================================
		comp: 	"IT Consultant, Senior Analyst & Developer",
		competencies: ["ITC","SAD"],
		task: 
			"consultant, analysis and development web/webapp/mobile/server ([Docuware connector], [MicroERP] for RaspberryPI) ● "+
			"personal insights on Blockchain, AI, smart learning, meta-analisi",
		companies:[
    		{
    			name:"C.Anspi S.L.G.",	prov:"MN", 
    			projects:[
    				{ name:"MicroERP", desc:"after-school services management, cloud services, Q&A", link:"https://youtu.be/4UNjBde8e1Q" }
    			]
    		},{
    			name:"Alpac Srl", prov:"VI", link:"http://www.alpac.it",
    			projects:[
    				{ desc:"business consultancy for technical office", link:"https://zonafets.github.io/site/esempi_estratti_da_mie_analisi.htm#Analysis_for_optimization_of_technical_office_processes_(2017)_" },
    			]
    		},{
    			name:"SOL Group Spa", prov:"MO", link:"http://www.solgroup.com",
    			projects:[
    				{ desc:"workshop for SAP connector", link:"https://zonafets.github.io/site/esempi_estratti_da_mie_analisi.htm#Mini_HOWTO_about_SAP_Connector_RFCs/IDOCs_and_porting_to_other_system_"},
    			]
    		},{
				name:"3DS Team Srl", prov:"BS", link:"http://www.3ds.team/it/",
				projects:[
					{ name:"Docuware connector", desc:"Docuware interface -> legally compliant archiving", link:"https://www.youtube.com/watch?v=X8Bl7z2anok"},
				]
			},{
				name:"Video*CV",
				projects:[
					{ desc:"Blur of random logos in video", link:"https://github.com/zonafets/VideoBlurring" }
				]
			}	
		],
		stack: 	"Razor, Mvc.Net, C#, KnockoutJS, JQuery, Bootstrap, Sqlite, MSSql, Git, Libreoffice, G.SketchUp, OpenCV, Linux",
	},{
		// ================================================================================================================
		period: "2007 - 2014",
		// ================================================================================================================
		comp: 	"Senior Analyst &Developer, Program Manager, Data Integrator, Quality &Standard manager",
		competencies: ["SAD","PM","DI","QSM"],
		task:
			"direction, analysis and development web/webapp/mobile/server for traceability, [batch records] management," +
			" warehouse and data integration EDI, XML, CSV, IDOCs, RFC (JD Edward/SAP/ACG) ([SAP connector])",
		companies: [
			{ 
				name:"Seltris Srl", prov:"MN", link:"http://www.seltris.eu",
				projects:[
					{name:"deploy optimization", desc:"reduction of organization time and complexity", link:"https://www.youtube.com/edit?o=U&video_id=MBP_jCdrCDc"},
					{name:"adaption sw PDA", desc:"from Motorola to Intermec with bluet. thermal printer, from SqlCe to Sqlite"},
					{desc:"obsolete data partitioning (storing millions of records)"},
					{name:"SAP connector", desc:"management sw integration with SAP", link:"https://www.youtube.com/watch?v=qMPB_zsRn1s?t=5s"},
					{name:"Import/Export", desc:"EDI/CSV/FTP Nutricia/Nestlé/Beghelli/TNT Traco", link:"https://www.youtube.com/edit?o=U&video_id=hCIbzP47_0c"},
					{name:"batch records", desc:"quality certification management of technical, pure and medical gases", link:"https://www.youtube.com/watch?v=t7-qQL8V-zA"},
					{desc:"central warehouse management", link:"esempi_estratti_da_mie_analisi.htm#User_and_Developer_guide_(2009)_"},
					{desc:"international integration", link:"esempi_estratti_da_mie_analisi.htm#Developer_Guide_(2009)"},
					{desc:"collected and renovated 200+ utilities TSQL", link:"https://youtu.be/D2u5Hn83Uuc"},
					{desc:"international data base synchronization"},
					{desc:"analysis of data structure conversion from single to multi items"},
				]
			}
		],
		stack: 	"ASP.Net, VB.Net, MSSql, SqlCE, SQLite, Svn, MS-Visio, MS-Project, WindowsCe, Windows NT, Motorola, Intermec, Zebra",
	},{
		// ================================================================================================================
		period: "2000 - 2006",
		// ================================================================================================================
		comp: 	"Senior Analyst / Developer\nTrainer &IT consultant",
		competencies: ["SAD","TRN","ITC"],
		task:
			"desktop analysis / development (graphical front-end [Tavolinux]);" +
			"ECDL courses teacher, MS Office, FSE (B.Pascal and C.F.P.);" +
			"MS Office course and ABC of IT (ITC Don Milani of Montichiari);" +
			"analysis /application development for [optimization of delivery and billing]" +
			"(Nestlé for fusion between Friskies S.p.A. and Purina Pet Care);" +
			"installation and maintenance of the intranet Win.NT4/MSSQL (Entreprise s.r.l.)",
		companies: [
			{
				name:"Trend Servizi Srl", prov:"MN", link:"http://www.trendservizi.it",
				projects:[
					{name:"Tavolinux", desc:"desktop interface catering management",link:"https://www.youtube.com/watch?v=V1gc_mjGH1I"},
					{name:"RenCar",desc:"vehicle rental management",link:"https://www.youtube.com/watch?v=-rfhieKOvR8"},
				]
			},{
				name:"I.T.I. B.Pascal e C.F.P.", prov: "MN", link:"",
				projects:[
					{desc:"ECDL courses teacher, MS Office, FSE"}
				]
			},{
				name:"ITC Don Milani", prov:"BS", link:"",
				projects:[
					{desc:"IT courses teacher"}
				]
			},{
				name:"Marmi Ghirardi Spa", prov:"BS", link:"http://www.ghirardi.it",
				projects: [
					{name:"GMarmo", desc:"marble processing and packaging management", link:"https://www.youtube.com/watch?v=5KzKdfDnq_o"}
				]
			},{
				name:"Friskies Italia Spa", prov:"MN", link:"",
				projects: [
					{name:"TPFE",desc:"traceability and optimization of distribution and billing",link:"https://www.youtube.com/watch?v=6d7gQ3yM9sk"}
				]
			},{
				name:"Enterprise Srl", prov:"MN", link:"",
				projects: [
					{name:"SuperRicettario", desc:"network administration and site development support"}
				]
			}
		],
		stack: 	"C++, QT Libraries, [Postgresql], CVS, MS-Access, Linux, Windows NT/TE, HP Proliant"
	},{
		// ================================================================================================================
		period: "1997 - 1999",
		// ================================================================================================================
		comp: 	"Junior ICT Manager",
		competencies: ["JIT"],
		task: 
			"Purchase management, support on AS400, development of CRM applications, ERP ● [Backoffice and production automation]" +
			"● robot programming ● Wifi network and RF terminals ● support for research and development",
		links: {
			"Backoffice and production automation":"responsabile_it_copan_italia_spa.htm"
		},
		companies: [
			{
				name: "Copan Italia Spa", prov: "BS", link:"http://copanitalia.com",
				projects: [
					{desc:"Automation confirms orders via email, fax; unpaid management, costs, MRP, label printing; robot progr.", link:"responsabile_it_copan_italia_spa.htm"},
					{desc:"Purchase / preparation / maintenance of the corporate network infrastructure", link:"responsabile_it_copan_italia_spa.htm#Risultati"},							
				]
			},
		],

		stack: "MS-Access, MSSql, IBM Acg, Zetafax, Autocad, PDFCreator, OS/400, Windows NT, AS/400, Intermec and Zebra printers"
	},{
		// ================================================================================================================
		period: "1990 - 1997",
		// ================================================================================================================
		comp: 	"Practical technical tutor, technician - programmer",
		competencies: ["DTP","TP"],
		task: 
			"B.Pascal (daytime and evening): practical technical teacher, laboratory technician and Novell network manager (hw&sw),"+
			" corsi Autocad, MSOffice, Dos, Windows;\n"+ 
			"Intea Snc (afternoon): development with Clipper / MSAccess / PLC / RPG-IV, Novell servers installations;\n"+
			"Simulmondo/Dynabyte: [video games] developer with asm x86 / C",
		companies: [
			{
				name: "I.T.I. Blaise Pascal", prov: "MN", link:"http://www.fondazionecasadelgiovane.it/",
				projects: [
					{desc: "practical technical teacher, workshop maintenance and Novell network manager (hw&sw)",link:"images/certificates/stefano_referenze_bpascal.jpg"},
				]
			},{
				name: "Intea Snc", prov: "MN", link:"https://www.inteaonline.it/",
				projects: [
					{desc: "data collection with PLC, filters and statistics, management for shoes factories"},
					{desc: "PC/Network technician, installation of production lines with Novell servers"},
					{desc: "application development for RFID terminal for AS400"}, 
				]
			},{
				name: "Dynabyte Snc", prov: "GE", link: "https://it.wikipedia.org/wiki/Dynabyte",
				projects: [
					{name:"Late Night Sexy TV Show", desc:"video game lead programmer ", link:"http://digilander.libero.it/bolido/MGSexyTV.htm"}
				]
			},{
				name: "Simulmondo Srl", prov: "BO", link: "https://it.wikipedia.org/wiki/Simulmondo",
				projects: [
					{desc:"Scene editor for newsstand video games DylanDog, Spiderman"}
				]
			}
		],
		stack: "Pascal, C, ASMx86, Ventura Publisher, Coreldraw, Autocad, MSOffice, Dos, Novell, Windows"
	},{
		// ================================================================================================================
		period: "1994 - 1997",
		// ================================================================================================================
		comp: 	"Student, self-taught, technician - programmer",
		competencies: ["TP"],
		task: 
			"Self-taught: PC assembly, Dos, Autocad, BBS (Fidonet Node 207), Assembler Z80/X86, C/C++, Object Pascal/Turbo Vision\n"+
			"Autocad technical designer (Marchon), Ventura Desktop Publisher (Rapetti), sw for transmission of chambered visure (EDP Iannella - CO)",
		companies: [
			{
				name: "Marchon", prov: "MN",
				projects: [
					{desc: "Autocad technical designer"},
				]
			},{
				name: "Rapetti", prov: "MN", 
				projects: [
					{desc: "Desktop Publishing"}, 
				]
			},{
				name: "Iannella EDP", prov: "CO", 
				projects: [
					{desc:"sw development for transmission of chambered visure"}
				]
			},{
				name: "Privatelly",  
				projects: [
					{desc:"Provider BBS Fidonet Node 207"}
				]
			}
		],
		stack: "Turbo Pascal, Page Maker, Ventura Publisher, MSWord(Dos), Dos, CP/M, asmZ80, Windows"
	},
] // experiences

app.cv_data.en["projectsTable"] = {
	theads: ["Main projects and activities","Stack","Skills","Co."],
}

app.cv_data.en["previous-kb"] = {
	items:[
        ["Server development",		"RPG-IV/ABAP, Ibm AS400 [ACG integration]", 1],
		["Desktop development",		"C / C++ (QT Libraries 3.5) / OPascal", 6],	
		["",						"Microsoft Access ([e.g. 6]) ([e.g. 7]) ([e.g. 8]) ([e.g. 9], [10], [11], [12])", 10],
		["",						"VM Ware/VirtualBox", 3],
		["Source Control Manager",	"GIT / SVN", 5],
		["Help Desk",				"Teamviewer/SSH/RemoteDesktop/Ticketing systems", 5],
		["",						"Software Open Source e Free multipiattaforma", 10],
		["Training",				"Metodologie/Strumenti Test software/hardware", 10],
		["",						"Documentazione Hardware/Software", 10],
		["Operatin Systems",		"DOS, Windows 3.x/9x/2k/XP/TE/7/CE/Mobile/Tablet", 12],
		["",						"Linux (slackware:1, redhat:1, ubuntu:3)", 5],
		["",						"OS/2 e OS/400", 1],
		["Applications",			"Autocad, Google Sketchup", 3],
		["",						"MS Office / LibreOffice", "10 / 2"],
		["",						"Coreldraw/SharePoint/Zetafax", 1],
		["Hardware",				"RaspberryPi, Arduino, Motorola MC75, Intermec CN70, Zebra RW420, Intermec PW50, HP Proliant",4],
 		["",						"PLC Siemens, PIC18F2420, x86, Z80","1"]	
    ],

    links: {
    	"e.g. 6": "https://youtu.be/5KzKdfDnq_o",
    	"e.g. 7": "https://youtu.be/6d7gQ3yM9sk",
    	"e.g. 8": "https://youtu.be/-rfhieKOvR8",
    	"e.g. 9": "responsabile_it_copan_italia_spa.htm#Ciclo_conferme_ordini:_ACG_",
    	"10": "responsabile_it_copan_italia_spa.htm#Ciclo_conferme_ordini:_ACG_",
    	"11": "responsabile_it_copan_italia_spa.htm#Ciclo_conferme_ordini:_ACG_",
    	"12": "responsabile_it_copan_italia_spa.htm#Ciclo_conferme_ordini:_ACG_",
    	"ACG integration": "https://zonafets.github.io/site/responsabile_it_copan_italia_spa.htm#Ciclo_conferme_ordini:_ACG_"
    }
}

app.cv_data.en["extra-info"] = {
	items: [
		["Education", "1985-89 Graduated - [Head Technician] (spec. computer science) (54/60)"],
        ["Languages", "intermediate english written/spoken, Français élémentaire"],
        ["Last [readings]", "The art of learning"]
    ],
    links: {
    	"Head Technician": "images/certificates/diploma_maturita.jpg",
    	"readings": "bibliografia.htm"
    }
}

app.cv_data.en["extra-courses"] = {
	items: [
		['personal insights',						'smart-learning, meta-analisi, AI, blockchain'],
		['"automated accounting" course',			'budget analysis, b.p.'],
        ['[technician-customer in HP] relationship','objection management'],
        ['objectives and results with PNL',			'goal setting'],
        ['studies on meta-learning',				'strategies for learning and conveying concepts'],

        ['bw photography, comics and drawing',		'aspects of perception, representation'],
        ['presepistica / modeling, cooking, tasting','modeling, execution, quantity ratio'],

        ['brain storming / MindMap',	'development of creative or empirical solutions'],
        ['focus group',					"keep the group's attention focused on the objective / topic"],
        ['[construction coordination]',	'project management with limited budget: quality and skills analysis'],
    ],

    links: {
    	"Extracurricular activities": 	"https://www.youtube.com/watch?v=D48u_Tu-K98",
    	"technician-customer in HP": 	"images/certificates/corso_hp.jpg",
    	"construction coordination":	"esempi_estratti_da_mie_analisi.htm#Documentation_developed_as_site_coordinator_for_property_renovation_(2015)_",
    }
}

app.cv_data.en.competencies = [
	["ITC",	"IT Consultant"],
	["SAD",	"Senior Analyst & Developer"],
	["PM",	"Program Manager"],
	["DI",	"Data Integrator"],
	["QSM",	"Quality &Standard manager"],
	["TRN", "Trainer"],
	["JIT",	"Junior ICT Manager"],
	["DTP",	"Practical technical teacher"],
	["TP", 	"programmer technician"]
]

app.cv_data.en.links = {
	"Work experience": "https://goo.gl/XnCjuH",
	"video games": "http://digilander.libero.it/bolido/MGSexyTV.htm",
	"optimization of delivery and billing":  "https://www.youtube.com/watch?v=6d7gQ3yM9sk"
}

app.cv_data.en.textNodes = {
	"Curriculum di Stefano Zaglio": "Curriculum of Stefano Zaglio",
	"Brevemente": 					"Briefly",
	"Indice stacks": 				"Stacks index",
	"Indice competenze": 			"Skills index",
	"Indice aziende": 				"Company index",
	"Conoscenze recenti": 			"Recent knowledge",
	"Anni": 						"Years",
	"Esperienze di Lavoro":  		"Work experience",
	"(f/p.time, co.co.pro, p.o.)":  "(f/p.time, by contract)",
	"Periodo/Comp.": 				"Period/Comp.",
	"Attività extracurriculari": 	"Extracurricular activities",
	"Attività": 					"Task",
	"Azienda": 						"Company",
	"Conoscenze pregresse": 		"Previous knowledge",
	"Categoria": 					"Category",
	"Nome": 						"Name",
	"Informazioni aggiuntive": 		"Additional information",
	"Competenze acquisite": 		"Acquired skills",
	"Autorizzo il trattamento dei dati personali ai sensi del\xa0ex D. lgs. 196/2003": "In compliance with the Italian D.L. #196-30/06/2003,\xa0I authorize to use my personal details",
	"Via Soratino, 8": 				"8th Soratino Street",
	"Nato il 01.02.72 / Sposato": 	"Born on Feb 01 1972 / Married",
}

