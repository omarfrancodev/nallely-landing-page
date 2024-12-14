import servicesData from "./scripts/data.js";
import { domElements } from "./scripts/Variables-dom.js";
import {
  assignModalEvents,
  assignServiceSelectorEvent,
  assignServiceOptionsEvent,
} from "./scripts/Eventos.js";

document.addEventListener("DOMContentLoaded", () => {
  // Cargar servicios en el contenedor
  servicesData.services.forEach((service, index) => {
    const divContainerItem = document.createElement("div");
    divContainerItem.className = "landing-content__items-item services-content";
    divContainerItem.innerHTML = `${service}`;
    domElements.contentItemsServices.appendChild(divContainerItem);

    // Calcular el retraso dinámicamente basado en el índice
    const delay = index * 0.1; // 0.1 segundos entre cada uno

    // Asignar el retraso de la animación de forma dinámica
    divContainerItem.style.animationDelay = `${delay}s`;
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
