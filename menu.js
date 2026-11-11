// Menú hamburguesa para celular: abre y cierra la lista de páginas
(function () {
  const boton = document.querySelector('.menu-boton');
  const menu = document.getElementById('menu');
  if (!boton || !menu) return;

  function cambiar(abrir) {
    menu.classList.toggle('abierto', abrir);
    boton.classList.toggle('abierto', abrir);
    boton.setAttribute('aria-expanded', abrir);
    boton.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  }

  boton.addEventListener('click', () => cambiar(!menu.classList.contains('abierto')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cambiar(false); });
})();
