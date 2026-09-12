// Valucciara — carrusel de colección (Hombre / Mujer), paginado de 4 en 4.
(function () {
  'use strict';

  var PER_PAGE = 4;
  var IMG_BASE = 'imagenesvalucciara/';

  // Completa cada prenda con su archivo, nombre y precio (name/price vacíos muestran un placeholder).
  function photo(file, name, price) {
    return { file: file, name: name || '', price: price || '' };
  }
  var CATALOG_PHOTOS = {
    hombre: [
      photo('30.jpg', 'Abrigo JADEN', '$3,599.00'),
      photo('31.jpg', 'Abrigo BASTIAN', '$3,799.00'),
      photo('32.jpg', 'Abrigo ARTHUR', '$4,799.00'),
      photo('33.jpg', 'Abrigo SALVATORE', '$4,599.00'),
      photo('34.jpg', 'Abrigo MASSIMO', '$4,999.00'),
      photo('35.jpg', 'Abrigo VINCENT', '$4,799.00'),
      photo('36.jpg', 'Abrigo ENZO', '$4,199.00'),
      photo('37.jpg', 'Abrigo LAURENT', '$4,599.00')
    ],
    mujer: [
      photo('1.jpg', 'Abrigo VIVIANNE', '$3,999.00'),
      photo('2.jpg', 'Abrigo MAEVA', '$3,599.00'),
      photo('3.jpg', 'Abrigo APRIL', '$2,999.00'),
      photo('4.jpg', 'Abrigo LUNA', '$3,499.00'),
      photo('5.jpg', 'Abrigo BIANCA', '$4,999.00'),
      photo('6.jpg', 'Abrigo ELEONORA', '$4,499.00'),
      photo('7.jpg', 'Abrigo ASANI', '$3,299.00'),
      photo('8.jpg', 'Abrigo ALESSIA', '$4,799.00'),
      photo('9.jpg', 'Abrigo ARIADNE', '$4,399.00'),
      photo('10.jpg', 'Abrigo ANTONELLA', '$4,999.00'),
      photo('11.jpg', 'Abrigo JULIET', '$4,999.00'),
      photo('12.jpg', 'Abrigo SERENA', '$4,299.00'),
      photo('13.jpg', 'Abrigo KATE', '$3,399.00'),
      photo('14.jpg', 'Abrigo ARYA', '$4,799.00'),
      photo('15.jpg', 'Abrigo ROSALIE', '$4,999.00'),
      photo('16.jpg', 'Abrigo SCARLET', '$4,899.00'),
      photo('17.jpg', 'Abrigo FLORENCE', '$3,799.00'),
      photo('18.jpg', 'Abrigo GEMMA', '$4,899.00'),
      photo('19.jpg', 'Abrigo ANALISSE', '$4,699.00'),
      photo('20.jpg', 'Abrigo TYLA', '$4,999.00'),
      photo('21.jpg', 'Abrigo CIRCE', '$4,799.00'),
      photo('22.jpg', 'Abrigo KENDALL', '$4,999.00'),
      photo('23.jpg', 'Capa CATALINA', '$2,999.00'),
      photo('24.jpg', 'Capa KLOE', '$3,099.00'),
      photo('25.jpg', 'Capa CAMILLE', '$2,999.00'),
      photo('26.jpg', 'Capa ELOISE', '$3,199.00'),
      photo('27.jpg', 'Capa CALIPSO', '$3,299.00'),
      photo('28.jpg', 'Capa MIRANDA', '$3,399.00'),
      photo('29.jpg', 'Capa FRANCESCA', '$3,999.00')
    ]
  };

  function buildPhotoBox(item) {
    var wrap = document.createElement('div');
    wrap.className = 'cat-item';

    var box = document.createElement('div');
    box.className = 'cat-photo';
    if (item && item.file) {
      var img = document.createElement('img');
      img.src = IMG_BASE + item.file;
      img.alt = '';
      box.appendChild(img);
    }
    wrap.appendChild(box);

    var caption = document.createElement('div');
    caption.className = 'cat-caption';
    var name = document.createElement('p');
    name.className = 'cat-name';
    name.textContent = (item && item.name) ? item.name : '[ Nombre de la prenda ]';
    var price = document.createElement('p');
    price.className = 'cat-price';
    price.textContent = '(' + ((item && item.price) ? item.price : 'Precio') + ')';
    caption.appendChild(name);
    caption.appendChild(price);
    wrap.appendChild(caption);

    return wrap;
  }

  function setState(carousel, index) {
    var track = carousel.querySelector('.cat-track');
    if (!track) return;
    var pageCount = track.children.length;
    if (pageCount === 0) return;
    index = Math.max(0, Math.min(index, pageCount - 1));
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    var prevBtn = carousel.querySelector('.cat-arrow[data-dir="-1"]');
    var nextBtn = carousel.querySelector('.cat-arrow[data-dir="1"]');
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === pageCount - 1;
  }

  function currentIndex(track) {
    var m = /translateX\(-([0-9.]+)%\)/.exec(track.style.transform || '');
    return m ? Math.round(parseFloat(m[1]) / 100) : 0;
  }

  document.querySelectorAll('.cat-carousel').forEach(function (carousel) {
    var photos = CATALOG_PHOTOS[carousel.getAttribute('data-photos')] || [];
    var track = carousel.querySelector('.cat-track');
    if (!track) return;
    for (var i = 0; i < photos.length; i += PER_PAGE) {
      var page = document.createElement('div');
      page.className = 'cat-page';
      photos.slice(i, i + PER_PAGE).forEach(function (item) {
        page.appendChild(buildPhotoBox(item));
      });
      track.appendChild(page);
    }
    setState(carousel, 0);

    carousel.querySelectorAll('.cat-arrow').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = parseInt(btn.getAttribute('data-dir'), 10);
        setState(carousel, currentIndex(track) + dir);
      });
    });
  });
})();
