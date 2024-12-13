// Funciones-desarrollo.js

export function displayServiceOptions(
  service,
  serviceData,
  serviceOptionsList,
  serviceOptionsContainer
) {
  const options = serviceData.serviceOptions[service];
  serviceOptionsList.innerHTML = ""; // Limpiar opciones anteriores
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

  serviceOptionsContainer.style.display = "block"; // Mostrar las opciones extras
}

export function updateTotalPrice(
  service,
  selectedOptions,
  servicesData,
  totalPriceElement
) {
  const servicePrice = servicesData.servicePrices[service];
  let total = servicePrice;

  selectedOptions.forEach((option) => {
    total += servicesData.optionPrices[option];
  });

  totalPriceElement.textContent = total;
}
