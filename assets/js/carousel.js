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
      photo('30.jpg', 'Abrigo JADEN'),
      photo('31.jpg', 'Abrigo BASTIAN'),
      photo('32.jpg', 'Abrigo ARTHUR'),
      photo('33.jpg', 'Abrigo SALVATORE'),
      photo('34.jpg', 'Abrigo MASSIMO'),
      photo('35.jpg', 'Abrigo VINCENT'),
      photo('36.jpg', 'Abrigo ENZO'),
      photo('37.jpg', 'Abrigo LAURENT')
    ],
    mujer: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'].map(function (n) { return photo(n + '.jpg'); })
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
