/*
	180630\s.zaglio: experimental JSON template
*/
app["person-info"] = 
{
	table: {
		class: "anonymouse",
		tbody: {
			tr: {
				td: {
					template: "address"
				},
				photo: {
					tag: "td",
					class: "flip-container flip",
					click: "flip",
					front: {
						class: "flipper",
						div: {
							class:"front",
							img: {
								id: "foto-cravatta",
								src: "images/io/foto-cravatta-tonda.jpg"
							}
						},
					},
					back: {
						class: "back",
						img: {
							id: "foto-barba",
							src: "images/io/foto-tonda.jpg"
						}
					}
				}
			} //tr
		} // tbody
	} // table
} // person-info