(function() {
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
  
  var xmlhttp = getXmlHttp()
  xmlhttp.open('GET', 'http://ccmixter.org/api/query?f=rss&tags=hip_hop&sort=name&u=teru', false);
  xmlhttp.send(null);
  if(xmlhttp.status == 200) {
    console.log(xmlhttp.responseText);
  }
})();
