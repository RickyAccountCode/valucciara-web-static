// Valucciara — carrusel de colección (Hombre / Mujer), paginado de 4 en 4.
(function () {
  'use strict';

  var PER_PAGE = 4;
  var IMG_BASE = 'imagenesvalucciara/';

  // Completa cada arreglo con los nombres de archivo reales, en orden.
  var CATALOG_PHOTOS = {
    hombre: [],
    mujer: []
  };

  function buildPhotoBox(filename) {
    var box = document.createElement('div');
    box.className = 'cat-photo';
    if (filename) {
      var img = document.createElement('img');
      img.src = IMG_BASE + filename;
      img.alt = '';
      box.appendChild(img);
    }
    return box;
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
      photos.slice(i, i + PER_PAGE).forEach(function (filename) {
        page.appendChild(buildPhotoBox(filename));
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
