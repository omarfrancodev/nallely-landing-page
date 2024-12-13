// import servicesData from "./data.js";

// document.addEventListener("DOMContentLoaded", () => {
//   const contentItemsServices = document.querySelector(
//     ".landing-content__items"
//   );

//   servicesData.services.forEach((service) => {
//     const divContainerItem = document.createElement("div");
//     divContainerItem.className = "landing-content__items-item services-content";
//     divContainerItem.innerHTML = `${service}`;
//     contentItemsServices.appendChild(divContainerItem);
//   });

//   // Referencias a los elementos HTML
//   const modal = document.getElementById("cotizadorModal");
//   const openModalButton = document.querySelector(
//     ".landing-content__header-button"
//   );
//   const closeButton = document.querySelector(".close-btn");
//   const serviceSelector = document.getElementById("serviceSelector");
//   const serviceOptionsContainer = document.getElementById(
//     "serviceOptionsContainer"
//   );
//   const serviceOptionsList = document.getElementById("serviceOptionsList");
//   const totalPriceElement = document.getElementById("totalPrice");

//   // Abrir modal
//   openModalButton.addEventListener("click", () => {
//     modal.style.display = "block"; // Mostrar el modal
//   });

//   // Cerrar modal
//   closeButton.addEventListener("click", () => {
//     modal.style.display = "none"; // Ocultar el modal
//   });

//   // Cerrar modal al hacer clic fuera del contenido
//   window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none"; // Ocultar el modal si se hace clic fuera de él
//     }
//   });

//   // Llenar el selector con los servicios disponibles
//   servicesData.services.forEach((service) => {
//     const option = document.createElement("option");
//     option.value = service;
//     option.textContent = service;
//     serviceSelector.appendChild(option);
//   });

//   // Manejar el cambio de servicio seleccionado
//   serviceSelector.addEventListener("change", (e) => {
//     const selectedService = e.target.value;
//     if (selectedService) {
//       // Mostrar opciones extras y calcular el precio
//       displayServiceOptions(selectedService);
//       updateTotalPrice(selectedService, []);
//     } else {
//       serviceOptionsContainer.style.display = "none";
//       totalPriceElement.textContent = "0";
//     }
//   });

//   // Mostrar opciones extras para el servicio seleccionado
//   function displayServiceOptions(service) {
//     const options = servicesData.serviceOptions[service];
//     serviceOptionsList.innerHTML = ""; // Limpiar opciones anteriores
//     options.forEach((option) => {
//       const checkboxContainer = document.createElement("div");
//       checkboxContainer.classList.add("checkbox-container");

//       const checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.value = option;
//       checkbox.id = option;

//       const label = document.createElement("label");
//       label.htmlFor = option;
//       label.textContent = option;

//       checkboxContainer.appendChild(checkbox);
//       checkboxContainer.appendChild(label);
//       serviceOptionsList.appendChild(checkboxContainer);
//     });

//     serviceOptionsContainer.style.display = "block"; // Mostrar las opciones extras
//   }

//   // Actualizar el precio total basado en el servicio y las opciones seleccionadas
//   function updateTotalPrice(service, selectedOptions) {
//     const servicePrice = servicesData.servicePrices[service];
//     let total = servicePrice;

//     selectedOptions.forEach((option) => {
//       total += servicesData.optionPrices[option];
//     });

//     totalPriceElement.textContent = total;
//   }

//   // Escuchar cambios en los checkboxes y actualizar el precio
//   serviceOptionsList.addEventListener("change", () => {
//     const selectedOptions = [];
//     const checkboxes = document.querySelectorAll(
//       ".checkbox-container input:checked"
//     );
//     checkboxes.forEach((checkbox) => {
//       selectedOptions.push(checkbox.value);
//     });

//     const selectedService = serviceSelector.value;
//     updateTotalPrice(selectedService, selectedOptions);
//   });
// });

// main.js

import servicesData from "./data.js";
import { domElements } from "./Variables-dom.js";
import {
  assignModalEvents,
  assignServiceSelectorEvent,
  assignServiceOptionsEvent,
} from "./Eventos.js";

document.addEventListener("DOMContentLoaded", () => {
  // Cargar servicios en el contenedor
  servicesData.services.forEach((service) => {
    const divContainerItem = document.createElement("div");
    divContainerItem.className = "landing-content__items-item services-content";
    divContainerItem.innerHTML = `${service}`;
    domElements.contentItemsServices.appendChild(divContainerItem);
  });

  // Cargar el selector de servicios con las opciones
  servicesData.services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service;
    option.textContent = service;
    domElements.serviceSelector.appendChild(option);
  });

  // Asignar eventos
  assignModalEvents(
    domElements.modal,
    domElements.openModalButton,
    domElements.closeButton
  );
  assignServiceSelectorEvent(
    domElements.serviceSelector,
    domElements.serviceOptionsContainer,
    domElements.totalPriceElement,
    servicesData,
    domElements.serviceOptionsList
  );
  assignServiceOptionsEvent(
    domElements.serviceOptionsList,
    domElements.serviceSelector,
    domElements.totalPriceElement,
    servicesData
  );
});
