import servicesData from "./data.js";
import { domElements } from "./Variables-dom.js";

export function showServices() {
  const contentItemsServices = domElements.contentItemsServices;

  // Cargar servicios en el contenedor
  servicesData.services.forEach((service, index) => {
    const divContainerItem = document.createElement("div");
    divContainerItem.className =
      "landing-container-content-data__items-item services-content";
    divContainerItem.innerHTML = `${service}`;
    contentItemsServices.appendChild(divContainerItem);

    // Calcular el retraso dinámicamente basado en el índice
    const delay = index * 0.1; // 0.1 segundos entre cada uno

    // Asignar el retraso de la animación de forma dinámica
    divContainerItem.style.animationDelay = `${delay}s`;
  });
}

export function loadServiceOptions() {
  const serviceSelector = domElements.serviceSelector;
  // Cargar el selector de servicios con las opciones
  serviceSelector.label = "Servicio";
  serviceSelector.options = servicesData.services;
  serviceSelector.placeholder = "Seleccione un servicio";
}

export function displayServiceOptions(service) {
  const { serviceOptionsContainer, serviceOptionsList } = domElements;
  const options = servicesData.serviceOptions[service];
  serviceOptionsList.innerHTML = ""; // Limpiar opciones anteriores
  if (options) {
    options.forEach((option) => {
      const checkboxContainer = document.createElement("div");
      checkboxContainer.classList.add("checkbox-container");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = option;
      checkbox.id = option;

      const label = document.createElement("label");
      label.htmlFor = option;
      label.textContent = option;

      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(label);
      serviceOptionsList.appendChild(checkboxContainer);
    });

    serviceOptionsContainer.style.display = "flex"; // Mostrar las opciones extras
  } else {
    serviceOptionsContainer.style.display = "none"; // Mostrar las opciones extras
  }
}

// Función para obtener opciones seleccionadas de los checkboxes
export function getSelectedOptions() {
  const selectedOptions = [];
  const checkboxes = document.querySelectorAll(
    ".checkbox-container input:checked"
  );
  checkboxes.forEach((checkbox) => {
    selectedOptions.push(checkbox.value);
  });
  return selectedOptions;
}

// Mostrar u ocultar las opciones de largo y cantidad según el servicio
export function toggleHairOptions(selectedService) {
  const { hairLength, hairAmount } = domElements;

  if (servicesData.variableCosts[selectedService]) {
    hairLength.style.display = "block";
    hairAmount.style.display = "block";
  } else {
    hairLength.style.display = "none";
    hairAmount.style.display = "none";
  }
}

export function updateTotalPrice(service, selectedOptions) {
  const { variableCosts, servicePrices } = servicesData;
  const { totalPriceElement, hairLength, hairAmount } = domElements;
  let total = 0;

  // Verificar si el servicio tiene costo variable
  if (variableCosts[service]) {
    const length = hairLength.selectedValue || "Corto"; // Valor predeterminado si no se selecciona nada
    const amount = hairAmount.selectedValue || "Poco"; // Valor predeterminado si no se selecciona nada

    // Sumar costos según largo y cantidad
    total += variableCosts[service][length];
    total += variableCosts[service][amount];
  } else {
    total += servicePrices[service] || 0; // Costo fijo
  }

  // Sumar costos de servicios adicionales
  selectedOptions.forEach((option) => {
    total += servicesData.optionPrices[option];
  });

  // Mostrar el total
  totalPriceElement.textContent = total;
}
