(function () {
  var cfg = window.BB1_STUDIO || {};
  var id = (cfg.gaMeasurementId || '').trim();
  if (!id || id === 'G-XXXXXXXXXX') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(s);
})();
