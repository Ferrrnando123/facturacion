document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const inventoryBody = document.getElementById('inventoryBody');
  const noResults = document.getElementById('noResults');

  searchInput.addEventListener('input', () => {
    const filtro = searchInput.value.toLowerCase().trim();

    let filas = Array.from(inventoryBody.querySelectorAll('tr'));
    let filasMostradas = 0;

    filas.forEach(fila => {
      // Buscamos texto en toda la fila
      const textoFila = fila.textContent.toLowerCase();

      if (textoFila.includes(filtro)) {
        fila.style.display = ''; // mostrar fila
        filasMostradas++;
      } else {
        fila.style.display = 'none'; // ocultar fila
      }
    });

    // Mostrar u ocultar mensaje "No hay resultados"
    if (filasMostradas === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
  });
});
