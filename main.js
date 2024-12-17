import { loadEvents, handleFloatingButtonVisibility } from "./scripts/Eventos.js";
import {
  showServices,
  assignWhatsappContent,
} from "./scripts/Funciones-desarrollo.js";

(function () {
  function init() {
    // Cargar servicios en el contenedor
    assignWhatsappContent();
    showServices();
    handleFloatingButtonVisibility()
    // loadEvents();
  }

  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
})();
