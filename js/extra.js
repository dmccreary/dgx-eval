// Resize an embedded MicroSim iframe to the height the sim reports.
// The infographic overlay sims (docs/sims/shared-libs/) scale their image with
// the iframe width, so their height is not fixed. Each one posts a
// 'microsim-resize' message with its content height. The height attribute in
// the markdown stays as the fallback shown while the sim loads.
window.addEventListener('message', function (event) {
  if (!event.data || event.data.type !== 'microsim-resize') return;
  var iframes = document.querySelectorAll('iframe');
  for (var i = 0; i < iframes.length; i++) {
    if (iframes[i].contentWindow === event.source) {
      iframes[i].style.height = event.data.height + 'px';
      break;
    }
  }
});
