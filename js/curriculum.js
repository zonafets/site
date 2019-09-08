/*
-- COPYRIGHT  -------------------------------------------------------------------------

All rights reserved

-- NOTES ------------------------------------------------------------------------------

-- CHANGELOG --------------------------------------------------------------------------

190718\s.zaglio: 1st draft

-- TODO -------------------------------------------------------------------------------

*/
function toggle(sender) {
	switch (sender.id || sender.name) {
		case "show-photo":
			var photo = document.querySelector("photo")
			var products = document.querySelector("products")
			if (sender.checked) {
				products.style.display="none"
				photo.style.display="inline-block"
			} else {
				products.style.display="inline-block"
				photo.style.display="none"				
			}
			break
		case "private-info":
			var info = document.querySelector("private-info")
			if (sender.checked)
				info.style.display = "block"
			else
				info.style.display = "none"
			break
		case "faces":
			var game_dev = document.querySelector("#game-developer")
			var technician = document.querySelector("#technician")
			var manager = document.querySelector("#manager")
			var show = "inline-block" 
			var hide = "none"
			game_dev.style.display = hide
			technician.style.display = hide
			manager.style.display = hide
			switch (sender.value) {
				case "1":
					game_dev.style.display = show
					break
				case "2":
					technician.style.display = show
					break
				case "3":
					manager.style.display = show
					break
			}
			break
		case "hide-references":
			var hidepi=document.querySelectorAll('[name="hide-references"]')
			for (var i=0;i<hidepi.length;i++)
				if (sender.checked)
					hidepi[i].style.display="none"
				else
					hidepi[i].style.display=""
			break
	}
}

function email2clipboard() {
    document.oncopy = function(event) {
        var a = [
        	"z", "a", "g", "l", "i", "o", ".", "s", "t", "e", "f", "a", "n", "o", 
        	"@", "g", "m", "a", "i", "l", ".", "c", "o", "m"
        ]
        event.clipboardData.setData("Text", a.join(''));
        event.preventDefault();
    }
    document.execCommand("Copy");
    document.oncopy = undefined;
}