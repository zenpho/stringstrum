// ///////////////////////////////////////////////////////////////
// log console messages in the page
// handy for smartphone browsers which hide the developer console
(function () {
  var old = console.log;
  var logElem = document.getElementById("log");
  if (!logElem) {
    logElem = document.createElement("pre");
    logElem.setAttribute("id", "log");
    logElem.innerText = "log messages appear here";
    if (document.body) document.body.appendChild(logElem);
  }

  console.log = function () {
    logElem.innerHTML += "\n";
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == "object") {
        logElem.innerHTML +=
          JSON && JSON.stringify
            ? JSON.stringify(arguments[i], undefined, 2)
            : arguments[i];
      } else {
        logElem.innerHTML += arguments[i];
      }
    }
    logElem.scrollTop = logElem.scrollHeight;
  };
  console.error = console.debug = console.info = console.log;
})();