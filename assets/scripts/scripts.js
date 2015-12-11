(function() {
  var loader = document.getElementById('loader');

  getRequest();

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
    loader.classList.add('loader_active');
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
       if(xmlhttp.status == 200) {
         loader.classList.remove('loader_active');
         console.log(JSON.parse(xmlhttp.responseText));
        }
      }
    }
  }
})();
