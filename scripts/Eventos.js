// Eventos.js

import {
  displayServiceOptions,
  updateTotalPrice,
} from "./Funciones-desarrollo.js";

export function assignModalEvents(modal, openModalButton, closeButton) {
  // Abrir modal
  openModalButton.addEventListener("click", () => {
    modal.style.display = "flex"; // Mostrar el modal
  });

  // Cerrar modal
  closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // Ocultar el modal
  });

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"; // Ocultar el modal si se hace clic fuera de él
    }
  });
}

export function assignServiceSelectorEvent(
  serviceSelector,
  serviceOptionsContainer,
  totalPriceElement,
  servicesData,
  serviceOptionsList
) {
  // Manejar el cambio de servicio seleccionado
  serviceSelector.addEventListener("change", (e) => {
    const selectedService = e.target.value;
    if (selectedService) {
      // Mostrar opciones extras y calcular el precio
      displayServiceOptions(
        selectedService,
        servicesData,
        serviceOptionsList,
        serviceOptionsContainer
      );
      updateTotalPrice(selectedService, [], servicesData, totalPriceElement);
    } else {
      serviceOptionsContainer.style.display = "none";
      totalPriceElement.textContent = "0";
    }
  });
}

export function assignServiceOptionsEvent(
  serviceOptionsList,
  serviceSelector,
  totalPriceElement,
  servicesData
) {
  // Escuchar cambios en los checkboxes y actualizar el precio
  serviceOptionsList.addEventListener("change", () => {
    const selectedOptions = [];
    const checkboxes = document.querySelectorAll(
      ".checkbox-container input:checked"
    );
    checkboxes.forEach((checkbox) => {
      selectedOptions.push(checkbox.value);
    });

    const selectedService = serviceSelector.value;
    updateTotalPrice(
      selectedService,
      selectedOptions,
      servicesData,
      totalPriceElement
    );
  });
}
