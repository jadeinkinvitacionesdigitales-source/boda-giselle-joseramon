// Pase personalizado del invitado.
// El enlace de cada invitado lleva ?i=… con su nombre y sus puestos (lo crea generador.html).
// Se guarda en el navegador del invitado para que siga viéndolo al cambiar de página.
(function () {
  const CLAVE = 'invitacion';

  function leer(codigo) {
    try {
      const b64 = codigo.replace(/-/g, '+').replace(/_/g, '/');
      const texto = decodeURIComponent(escape(atob(b64)));
      const [nombre, p] = texto.split('|');
      const puestos = parseInt(p, 10);
      if (!puestos || puestos < 1 || puestos > 20) return null;
      return { nombre: (nombre || '').trim(), puestos };
    } catch (e) {
      return null;
    }
  }

  let inv = null;
  const codigo = new URLSearchParams(location.search).get('i');
  if (codigo) {
    inv = leer(codigo);
    if (inv) {
      try { localStorage.setItem(CLAVE, JSON.stringify(inv)); } catch (e) {}
    }
  }
  if (!inv) {
    try { inv = JSON.parse(localStorage.getItem(CLAVE)); } catch (e) {}
  }
  window.invitacion = inv;
  if (!inv) return;

  const puestosTexto = inv.puestos === 1 ? '1 puesto' : inv.puestos + ' puestos';

  document.querySelectorAll('[data-inv-bloque]').forEach(el => el.hidden = false);
  document.querySelectorAll('[data-inv="nombre"]').forEach(el => {
    el.textContent = inv.nombre;
    if (!inv.nombre) el.hidden = true;
  });
  document.querySelectorAll('[data-inv="puestos"]').forEach(el => el.textContent = puestosTexto);

  // RSVP: nombre ya escrito y el número de personas limitado a sus puestos
  const nombre = document.getElementById('nombre');
  if (nombre && inv.nombre && !nombre.value) nombre.value = inv.nombre;
  const invitados = document.getElementById('invitados');
  if (invitados) {
    invitados.max = inv.puestos;
    invitados.value = inv.puestos;
  }
  const form = document.getElementById('rsvp');
  if (form) {
    const oculto = document.createElement('input');
    oculto.type = 'hidden';
    oculto.name = 'puestos_reservados';
    oculto.value = inv.puestos;
    form.append(oculto);
  }
})();
