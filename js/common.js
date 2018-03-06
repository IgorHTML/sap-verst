$(function() {

 // Carousels
 $('.carousel').owlCarousel({
    loop: false,
    items: 2,
    margin: 70,
    nav: true,
    smartSpeed: 700,
    navText: ['<img src="img/next.png" alt="alt" />','<img src="img/next2.png" alt="alt" />'],
    responsive: {
      0: {
        items: 1,
      },
      850: {
        items: 1
      },
      1150: {
        items: 2
      },
    },
  });

 $('.carousel-press').owlCarousel({
    loop: false,
    items: 1,
    margin: 70,
    nav: true,
    mouseDrag: false,
    smartSpeed: 700,
    navText: ['<img src="img/next.png" alt="alt" />','<img src="img/next2.png" alt="alt" />'],
    animateIn: 'flipInX',
    responsive: {
      0: {
        items: 1,
      },
      850: {
        items: 1
      },
      1150: {
        items: 1
      },
    },
  });

  // tabs
  $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
    $(this)
    .addClass('active').siblings().removeClass('active')
    .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
  });

	// maskedinput
  $('[name=phone]').inputmask({
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false,
    showMaskOnFocus: true,
  });

  // img not drag
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

$(window).on('load', function() {

  window.onresize = function() {
    onResize();
  };

  function onResize() {
    $('.sec-5 .tabs__content .sec-5-img-wrap .sec-5-text-wrap').equalHeights();
  }onResize();

});

$(document).ready(function() {
  /*
   * Эта функция отправляет заполненную форму PHP-скрипту mail.php
   * mail.php отправит заявку на нужную почту
   *
   * Так же тут есть валидация обязательного заполнения формы.
   * Обязательные поля должны иметь атрибут required
   * Если заполнены не все обязательные поля, то форма не отправится,
   * а незаполненные обязательные поля получат класс .error (что бы
   * можно было их специально стилизовать в CSS).
   * Если браузер не поддерживает HTML5 валидацию, то сработает наша
   */
  $(".form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      $(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
      setTimeout(function() {
        $(th).find('.success').removeClass('active').fadeOut();
        th.trigger("reset");
        $.fancybox.close();
      }, 2000);
    });
    return false;
  });

  /*
   * Эта функция определяет с какого поисковика пришел человек
   * Результаты подставляются в значения атрибута value для
   * всех input[name="search"] и input[name="referrer"] соответственно
   */
   function referrer() {
    var srch = [
    [/^https:\/\/(?:\w+\.)?google\.[a-z]+/, /q=([^&]+)/],
    [/^http:\/\/(?:\w+\.)?yahoo\.[a-z]+/, /p=([^&]+)/],
    [/^http:\/\/(?:\w+\.)?yandex\.[a-z]+/, /text=([^&]+)/],
    [/^http:\/\/(?:\w+\.)?rambler\.[a-z]+/, /query=([^&]+)/]
    ]
    
    var tem;
    for (var key in srch) {
      tem = srch[key];
      if (document.referrer.match(tem[0])){
        var ref = document.referrer.match(tem[1]);
        return decodeURIComponent(ref.length ? ref[1] : 'Пришли по ссылке. Или через неизвестный поисковик.');
      }
    }
    return 'Пришли не с поисковика';
  }
  $('input[name="search"]').val(referrer());
  $('input[name="referrer"]').val(document.referrer ? document.referrer : 'Пришли сразу на сайт');
});

// map
google.maps.event.addDomListener(window, 'load', init);
var map, markersArray = [];

function bindInfoWindow(marker, map, location) {
  google.maps.event.addListener(marker, 'click', function() {
    function close(location) {
      location.ib.close();
      location.infoWindowVisible = false;
      location.ib = null;
    }

    if (location.infoWindowVisible === true) {
      close(location);
    } else {
      markersArray.forEach(function(loc, index){
        if (loc.ib && loc.ib !== null) {
          close(loc);
        }
      });

      var boxText = document.createElement('div');
      boxText.style.cssText = 'background: #fff;';
      boxText.classList.add('md-whiteframe-2dp');

      function buildPieces(location, el, part, icon) {
        if (location[part] === '') {
          return '';
        } else if (location.iw[part]) {
          switch(el){
            case 'photo':
            if (location.photo){
              return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
            } else {
              return '';
            }
            break;
            case 'iw-toolbar':
            return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
            break;
            case 'div':
            switch(part){
              case 'email':
              return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
              break;
              case 'web':
              return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
              break;
              case 'desc':
              return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
              break;
              default:
              return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
              break;
            }
            break;
            case 'open_hours':
            var items = '';
            if (location.open_hours.length > 0){
              for (var i = 0; i < location.open_hours.length; ++i) {
                if (i !== 0){
                  items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
                }
                var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
              }
              return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
            } else {
              return '';
            }
            break;
          }
        } else {
          return '';
        }
      }

      boxText.innerHTML = 
      buildPieces(location, 'photo', 'photo', '') +
      buildPieces(location, 'iw-toolbar', 'title', '') +
      buildPieces(location, 'div', 'address', 'location_on') +
      buildPieces(location, 'div', 'web', 'public') +
      buildPieces(location, 'div', 'email', 'email') +
      buildPieces(location, 'div', 'tel', 'phone') +
      buildPieces(location, 'div', 'int_tel', 'phone') +
      buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
      buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

      var myOptions = {
        alignBottom: true,
        content: boxText,
        disableAutoPan: true,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-140, -40),
        zIndex: null,
        boxStyle: {
          opacity: 1,
          width: '280px'
        },
        closeBoxMargin: '0px 0px 0px 0px',
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: 'floatPane',
        enableEventPropagation: false
      };

      location.ib = new InfoBox(myOptions);
      location.ib.open(map, marker);
      location.infoWindowVisible = true;
    }
  });
}

function init() {
  var mapOptions = {
    center: new google.maps.LatLng(55.681272,37.59022700000003),
    zoom: 18,
    gestureHandling: 'auto',
    fullscreenControl: false,
    zoomControl: false,
    disableDoubleClickZoom: true,
    mapTypeControl: false,
    scaleControl: false,
    scrollwheel: true,
    streetViewControl: false,
    draggable : true,
    clickableIcons: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType":"all","stylers":[{"saturation":-100},{"gamma":1.5}]}]
  }
  var mapElement = document.getElementById('mapkit-2347');
  var map = new google.maps.Map(mapElement, mapOptions);
  var locations = [
  {"title":"ул. Дмитрия Ульянова, 42","address":"ул. Дмитрия Ульянова, 42, Москва, Россия, 117218","desc":"","tel":"","int_tel":"","email":"","web":"","web_formatted":"","open":"","time":"","lat":55.681272,"lng":37.59022700000003,"vicinity":"Юго-Западный административный округ","open_hours":"","marker":{"url":"https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png","scaledSize":{"width":25,"height":42,"f":"px","b":"px"},"origin":{"x":0,"y":0},"anchor":{"x":12,"y":42}},"iw":{"address":true,"desc":true,"email":true,"enable":true,"int_tel":true,"open":true,"open_hours":true,"photo":true,"tel":true,"title":true,"web":true}}
  ];
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      icon: locations[i].marker,
      position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
      map: map,
      title: locations[i].title,
      address: locations[i].address,
      desc: locations[i].desc,
      tel: locations[i].tel,
      int_tel: locations[i].int_tel,
      vicinity: locations[i].vicinity,
      open: locations[i].open,
      open_hours: locations[i].open_hours,
      photo: locations[i].photo,
      time: locations[i].time,
      email: locations[i].email,
      web: locations[i].web,
      iw: locations[i].iw
    });
    markersArray.push(marker);

    if (locations[i].iw.enable === true){
      bindInfoWindow(marker, map, locations[i]);
    }
  }
}




