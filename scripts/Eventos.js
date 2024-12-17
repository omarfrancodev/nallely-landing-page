import {
  displayServiceOptions,
  updateTotalPrice,
  loadServiceOptions,
  getSelectedOptions,
  toggleHairOptions,
  setFloatingButtonBehavior,
} from "./Funciones-desarrollo.js";
import { domElements } from "./Variables-dom.js";

export function loadEvents() {
  assignModalEvents();
  assignServiceSelectorEvent();
  assignServiceOptionsEvent();
}

export function handleFloatingButtonVisibility() {
  // Mostrar el botón si se scrollea hacia abajo, ocultarlo si está arriba
  window.addEventListener("scroll", () => {
    setFloatingButtonBehavior();
  });
}

export function assignModalEvents() {
  const { modal, openModalButton, closeButton } = domElements;

  // Abrir modal
  openModalButton.addEventListener("click", () => {
    loadServiceOptions();
    modal.style.display = "flex"; // Mostrar el modal
    document.body.style.overflow = "hidden"; // Evita el desplazamiento del fondo
  });

  // Cerrar modal
  closeButton.addEventListener("click", () => {
    hideModal(modal);
  });

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      hideModal(modal);
    }
  });
}

function hideModal(modal) {
  modal.style.display = "none"; // Ocultar el modal si se hace clic fuera de él
  document.body.style.overflow = "auto"; // Restaura el desplazamiento
}

export function assignServiceSelectorEvent() {
  const { serviceSelector, serviceOptionsContainer, totalPriceElement } =
    domElements;

  // Manejar el cambio de servicio seleccionado
  serviceSelector.addEventListener("change", (e) => {
    const selectedService = serviceSelector.selectedValue;

    if (selectedService) {
      // Mostrar opciones extras y calcular el precio
      displayServiceOptions(selectedService);

      // Ocultar/mostrar largo y cantidad según el tipo de servicio
      toggleHairOptions(selectedService);

      // Calcular el precio inicial (sin servicios adicionales)
      updateTotalPrice(selectedService, []);
    } else {
      serviceOptionsContainer.style.display = "none";
      totalPriceElement.textContent = "0";
    }
  });
}

export function assignServiceOptionsEvent() {
  const { serviceOptionsList, serviceSelector, hairLength, hairAmount } =
    domElements;

  // Escuchar cambios en los checkboxes y recalcular el precio
  serviceOptionsList.addEventListener("change", () => {
    const selectedOptions = getSelectedOptions();
    const selectedService = serviceSelector.selectedValue;
    updateTotalPrice(selectedService, selectedOptions);
  });

  // Escuchar cambios en los selectores de largo y cantidad
  hairLength.addEventListener("change", () => {
    const selectedOptions = getSelectedOptions();
    const selectedService = serviceSelector.selectedValue;
    updateTotalPrice(selectedService, selectedOptions);
  });

  hairAmount.addEventListener("change", () => {
    const selectedOptions = getSelectedOptions();
    const selectedService = serviceSelector.selectedValue;
    updateTotalPrice(selectedService, selectedOptions);
  });
}
