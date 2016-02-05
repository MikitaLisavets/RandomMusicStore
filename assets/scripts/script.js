'use strict';
(function() {
  var body = document.getElementById('body'),
      loader = document.getElementById('loader'),
      search = document.getElementById('search'),
      music = document.getElementById('music'),
      card = document.getElementById('card'),
      download = document.getElementById('downloads'),
      tags = document.getElementById('tags'),
      player = document.getElementById('player');


  search.addEventListener('click', searchFunc);

  var i = new Image();
  i.src = 'assets/images/background.jpg';
  i.onload = function() {
    body.classList.remove('body_preload');
  }

  function searchFunc() {
    var config = {
      lic: 'by'
    };

    getRequest(config, function(data) {
      var dataFiles = data[0].files,
          downloadsList = '';

      player.innerHTML = '';
      download.innerHTML = '';
      for (var i = 0; i < dataFiles.length; i++) {
        downloadsList += '<li class="downloads__item"> \
                            <div class="downloads__text"> \
                              <span class="downloads__text-title">'+ dataFiles[i].file_name +'</span> \
                              <span class="downloads__text-size">'+ dataFiles[i].file_filesize +'</span> \
                            </div> \
                            <div class="downloads__controls">';
        if (dataFiles[i].file_format_info['default-ext'] ===  "mp3") {
          downloadsList += '<button class="downloads__play" data-src="'+ dataFiles[i].download_url +'" data-type="'+ dataFiles[i].file_format_info.mime_type +'">Player</button>'
        }
        downloadsList += '<a class="downloads__link" download href="'+ dataFiles[i].download_url +'">Download</a>\
                            </div> \
                          </li>';
      }
      download.innerHTML = downloadsList;

      downloadsList = download.querySelectorAll('.downloads__play');

      for (var i = 0; i < downloadsList.length; i++) {
        downloadsList[i].addEventListener('click', playFunc);
      }

      music.href = data[0].file_page_url;
      music.innerHTML = '<span class="music__author">'+ data[0].user_name +' -</span> <span class="music__song">'+ data[0].upload_name +'</span>';

      getVinil(function() {
        card.classList.add('card_active');
        body.classList.remove('body_loading');
        vinil.classList.add('vinil_show');
        body.classList.add('body_loaded');
      });

    });
  }

  function getVinil(cb) {
    var nocache = new Date().getTime();
    vinil.innerHTML = '' +
    '<input class="vinil__trigger" type="checkbox">' +
    '<div class="vinil__cover" style="background-image: url(https://unsplash.it/300/300/?random&nocache='+ nocache +')"></div>' +
    '<div class="vinil__disk"><span class="vinil__disk-pic" style="background-image: url(https://unsplash.it/300/300/?random&nocache='+ nocache +')"></span></div>';

    var i = new Image();
    i.src = 'https://unsplash.it/300/300/?random&nocache='+ nocache +')';
    i.onload = function() {
      cb()
    }

  }


  function playFunc(e) {
    var target = e.target || e.srcElement,
        src = target.getAttribute('data-src'),
        type = target.getAttribute('data-type');
    createPlayer(src, type);
  }

  function createPlayer(src, type) {
    var audio = document.createElement("audio");
    body.classList.add('body_playing');
    player.innerHTML = '';
    audio.className = 'player__inner';
    audio.setAttribute("controls", "controls");
    audio.setAttribute("autoplay", "autoplay");
    audio.innerHTML = '<source id="player-source" class="player__source" src="' + src + '" type="' + type + '">'
    player.appendChild(audio);
  }


  function getRequest(config, cb) {
    var xmlhttp = getXmlHttp(),
        request = 'http://ccmixter.org/api/query?f=js&rand=1&limit=1&lic='+ config.lic +'&nocache=' + (new Date().getTime());
    xmlhttp.open('GET', request, true);
    xmlhttp.send(null);
    vinil.classList.remove('vinil_show');
    body.classList.add('body_loading');
    body.classList.remove('body_loaded');
    body.classList.remove('body_initial');
    body.classList.remove('body_playing');
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
