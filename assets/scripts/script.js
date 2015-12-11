(function() {
  var loader = document.getElementById('loader'),
      search = document.getElementById('search'),
      title = document.getElementById('title'),
      userName = document.getElementById('user-name'),
      userAlias = document.getElementById('user-alias'),
      url = document.getElementById('url'),
      download = document.getElementById('download'),
      player = document.getElementById('player');


  search.addEventListener('click', searchFunc);

  function searchFunc() {
    var config = {};
    getRequest(config, function(data) {
      console.table(data);
      title.innerHTML = data[0].upload_name;
      userName.innerHTML = data[0].user_real_name;
      userAlias.innerHTML = data[0].user_name === data[0].user_real_name ? '' : data[0].user_name;
      url.href = data[0].file_page_url;
      url.innerHTML = data[0].file_page_url;

      download.href = data[0].files[0].download_url;
      download.innerHTML = data[0].files[0].file_name;

      player.innerHTML = '';
      createPlayer(data[0].files[0].download_url, data[0].files[0].file_format_info.mime_type);

      loader.classList.remove('loader_active');
    });
  }

  function createPlayer(src, type) {
    var audio = document.createElement("audio");
    audio.setAttribute("controls", "");
    audio.innerHTML = '<source id="player-source" src="' + src + '" type="' + type + '">'

    player.appendChild(audio);
  }


  function getRequest(config, cb) {
    var xmlhttp = getXmlHttp(),
        request = 'http://ccmixter.org/api/query?f=js&rand=1&limit=1';
    xmlhttp.open('GET', request, true);
    xmlhttp.send(null);
    loader.classList.add('loader_active');
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
       if(xmlhttp.status == 200) {
          cb(JSON.parse(xmlhttp.responseText))
        }
      }
    }
  }

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
})();
