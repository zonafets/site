/*

-- NOTES ------------------------------------------------------------------------------

-- CHANGELOG --------------------------------------------------------------------------

190718\s.zaglio: 1st draft

-- TODO -------------------------------------------------------------------------------

*/
function toggle(sender) {
	switch (sender.id) {
		case "faces":
			var faces = document.querySelector("faces")
			var products = document.querySelector("products")
			if (sender.checked) {
				products.style.display="none"
				faces.style.display="inline-block"
			} else {
				products.style.display="inline-block"
				faces.style.display="none"				
			}
			break
		case "private-info":
			var info = document.querySelector("private-info")
			if (sender.checked)
				info.style.display = "block"
			else
				info.style.display = "none"
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