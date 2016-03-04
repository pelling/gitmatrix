
var consoleLog = function (message) {
  var d = new Date();
  var n = d.getTime();
  fetch('consoleLog?message=' + n + ' ' + message);
}

export default consoleLog;
