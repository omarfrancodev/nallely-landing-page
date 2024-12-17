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
    const delay = index * 0.05; // 0.1 segundos entre cada uno

    // Asignar el retraso de la animación de forma dinámica
    divContainerItem.style.animationDelay = `${delay}s`;
  });
}

export function assignWhatsappContent() {
  const whatsappButtons = domElements.whatsappButtons;

  const whatsappURL = getWhatsappURL();
  // Asignar la URL al enlace
  whatsappButtons.forEach((button) => {
    button.href = whatsappURL;
  });
}

function getWhatsappURL() {
  const serviceName = "NOMBRE-DEL-SERVICIO"; // Nombre del servicio (puede ser dinámico)
  const phoneNumber = "529671273320"; // Número de WhatsApp en formato internacional

  // Construir el mensaje
  const message = `Hola buen día.%0AMe gustaría conocer más acerca del siguiente servicio: ${serviceName}.%0AMuchas gracias`;

  // Generar la URL de WhatsApp
  return `https://wa.me/${phoneNumber}?text=${message}`;
}

export function setFloatingButtonBehavior() {
  const { floatingContactButton, landingHeader, contactoContainer } =
    domElements;

  // Obtener las alturas de los elementos relevantes
  const headerHeight = landingHeader ? landingHeader.offsetHeight : 0;
  const contactoTop = contactoContainer
    ? contactoContainer.offsetTop - contactoContainer.offsetHeight
    : 0;

  // Obtener la posición del scroll
  const scrollPosition = window.scrollY; // Distancia desde el tope

  // Verificar si el scroll está en el rango entre el header y el contacto
  if (scrollPosition > headerHeight && scrollPosition < contactoTop) {
    // Si estamos entre el header y el contacto, mostrar el botón
    const whatsappURL = getWhatsappURL();
    floatingContactButton.href = whatsappURL;
    floatingContactButton.classList.add("show");
  } else {
    // Si el scroll ha pasado el contacto o aún no ha pasado el header, ocultar el botón
    floatingContactButton.href = "#";
    floatingContactButton.classList.remove("show");
  }
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
