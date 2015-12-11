(function() {
  var loader = document.getElementById('loader');



  // ***********************//
  //       Functions.       //
  //***********************//
  function getXmlHttp(){
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  }
  function getRequest(config) {
    var xmlhttp = getXmlHttp(),
        request = 'http://ccmixter.org/api/query?f=js';
    xmlhttp.open('GET', request, true);
    xmlhttp.send(null);
    if(xmlhttp.status == 200) {
      console.log(xmlhttp.responseText);
    }

  }

})();
