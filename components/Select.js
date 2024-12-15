class CustomSelector extends HTMLElement {
  constructor() {
    super();

    // Crear el shadow DOM
    this.shadow = this.attachShadow({ mode: "open" });

    // Referencias internas
    this._container = null;
    this._labelNode = null;
    this._dropdown = null;
    this._button = null;
    this._list = null;

    // Valor seleccionado
    this._selectedValue = null;
  }

  connectedCallback() {
    this.render();
    this.updateLabel();
    this.updateOptions();
    this.updatePlaceholder();

    document.addEventListener("click", this._handleDocumentClick.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener("click", this._handleDocumentClick.bind(this));
  }

  static get observedAttributes() {
    return ["label", "options", "placeholder"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "label":
        this.updateLabel();
        break;
      case "options":
        this.updateOptions();
        break;
      case "placeholder":
        this.updatePlaceholder();
        break;
    }
  }

  render() {
    this._container = document.createElement("div");
    this._container.className = "custom-selector";

    this._labelNode = document.createElement("label");

    this._dropdown = document.createElement("div");
    this._dropdown.className = "dropdown";

    this._button = document.createElement("button");
    this._button.className = "selector-button";
    this._button.type = "button";

    this._list = document.createElement("ul");
    this._list.className = "options hidden";

    this._button.addEventListener("click", (event) => {
      event.stopPropagation();
      this._list.classList.toggle("hidden");
    });

    this._dropdown.appendChild(this._button);
    this._dropdown.appendChild(this._list);
    this._container.appendChild(this._labelNode);
    this._container.appendChild(this._dropdown);

    const style = document.createElement("style");
    style.textContent = `
          .custom-selector {
              display: flex;
              flex-direction: column;
              font-family: Arial, sans-serif;
          }
          label {
              margin-bottom: 8px;
              font-weight: bold;
              font-size: larger;
          }
          .dropdown {
              position: relative;
          }
          .selector-button {
              width: 100%;
              padding: 8px;
              font-size: 16px;
              text-align: left;
              background-color: #fff;
              border: 1px solid #ccc;
              border-radius: 4px;
              cursor: pointer;
          }
          .selector-button:after {
              content: "▼";
              float: right;
              margin-left: 8px;
              font-size: 12px;
              line-height: 1;
          }
          .options {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background-color: #fff;
              border: 1px solid #ccc;
              border-radius: 4px;
              margin: 0;
              padding: 0;
              list-style: none;
              max-height: 200px;
              overflow-y: auto;
              z-index: 1000;
          }
          .options.hidden {
              display: none;
          }
          .option {
              padding: 8px;
              cursor: pointer;
              transition: background-color 0.15s;
          }
          .option:hover {
              background-color: #0083ca;
              color: #fff;
          }
      `;

    this.shadow.innerHTML = "";
    this.shadow.appendChild(style);
    this.shadow.appendChild(this._container);
  }

  updateLabel() {
    if (this._labelNode) {
      this._labelNode.textContent = this.getAttribute("label") || "Seleccione:";
    }
  }

  updatePlaceholder() {
    if (this._button) {
      this._button.textContent =
        this.getAttribute("placeholder") || "Seleccione una opción";
    }
  }

  updateOptions() {
    if (!this._list) return;

    const rawOptions = JSON.parse(this.getAttribute("options") || "[]");
    this._list.innerHTML = "";

    const options = rawOptions.map((option) => {
      if (typeof option === "string") {
        return { value: option, text: option };
      }
      return option;
    });

    options.forEach((option) => {
      const { value, text } = option;

      const item = document.createElement("li");
      item.className = "option";
      item.textContent = text || value || "";
      item.dataset.value = value;

      item.addEventListener("click", () => {
        this._button.textContent = text || value || "";
        this._selectedValue = value; // Actualiza el valor seleccionado
        this.dispatchEvent(new CustomEvent("change", { detail: { value } }));
        this._list.classList.add("hidden");
      });

      this._list.appendChild(item);
    });
  }

  _handleDocumentClick(event) {
    if (
      !this._list.classList.contains("hidden") &&
      !this._list.contains(event.target) &&
      event.target !== this._button
    ) {
      this._list.classList.add("hidden");
    }
  }

  // Getter para obtener el valor seleccionado
  get selectedValue() {
    return this._selectedValue;
  }

  // Getters y Setters para atributos
  set options(value) {
    this.setAttribute("options", JSON.stringify(value));
  }

  get options() {
    return JSON.parse(this.getAttribute("options") || "[]");
  }

  set label(value) {
    this.setAttribute("label", value);
  }

  get label() {
    return this.getAttribute("label");
  }

  set placeholder(value) {
    this.setAttribute("placeholder", value);
  }

  get placeholder() {
    return this.getAttribute("placeholder");
  }
}

customElements.define("custom-selector", CustomSelector);
