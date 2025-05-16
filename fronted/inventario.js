document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const inventoryBody = document.getElementById('inventoryBody');
  const noResults = document.getElementById('noResults');

  searchInput.addEventListener('input', () => {
    const filtro = searchInput.value.toLowerCase().trim();
    const filas = Array.from(inventoryBody.querySelectorAll('tr'));
    let filasMostradas = 0;

    filas.forEach(fila => {
      const textoFila = fila.textContent.toLowerCase();
      if (textoFila.includes(filtro)) {
        fila.style.display = '';
        filasMostradas++;
      } else {
        fila.style.display = 'none';
      }
    });

    noResults.style.display = (filasMostradas === 0) ? 'block' : 'none';
  });
});
