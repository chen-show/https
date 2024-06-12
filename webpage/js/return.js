window.onload = function () {
	document.oncontextmenu = () => { return false }
	window.onkeydown = window.onkeyup = window.onkeypress = function () {
	  let e = event || window.event || arguments.callee.caller.arguments[0]
	  if (e && e.keyCode == 123) {
	    e.returnValue = false
	    return false
	  }
	}
}