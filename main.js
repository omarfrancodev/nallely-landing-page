import { loadEvents } from "./scripts/Eventos.js";
import { showServices } from "./scripts/Funciones-desarrollo.js";

(function () {
  function init() {
    // Cargar servicios en el contenedor
    showServices();

    loadEvents();
  }

  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
})();
