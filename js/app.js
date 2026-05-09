window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("page-content").classList.remove("d-none");
  }, 2800);
});

const menuContainer = document.getElementById("menuAccordion");

const renderMenu = (data) => {
  menuContainer.innerHTML = "";

  const categorias = data[0].menu.categorias;

  categorias.forEach((categoria, index) => {
    const accordionItem = document.createElement("div");

    accordionItem.classList.add("accordion-item");

    let itemsHTML = "";

    // items normales
    if (categoria.items) {
      categoria.items.forEach((item) => {
        itemsHTML += `
          <li class="menu-item d-flex justify-content-between">
            <span>${item.nombre}</span>
            <span>
              ${
                typeof item.precio === "number"
                  ? `${item.precio.toFixed(2)}€`
                  : ""
              }
              ${
                typeof item.precio_jarra === "number"
                  ? `Jarra: ${item.precio_jarra.toFixed(2)}€`
                  : ""
              }
              ${
                typeof item.precio_media === "number"
                  ? ` | Média: ${item.precio_media.toFixed(2)}€`
                  : ""
              }
            </span>
          </li>
        `;
      });
    }

    // subcategorías
    if (categoria.subcategorias) {
      categoria.subcategorias.forEach((subcategoria) => {
        itemsHTML += `
          <li class="menu-subtitle mt-3 fw-bold">
            ${subcategoria.nombre}
            -
            ${subcategoria.precio.toFixed(2)}€
          </li>
        `;

        subcategoria.items.forEach((item) => {
          itemsHTML += `
            <li class="menu-item">
              ${item}
            </li>
          `;
        });
      });
    }

    accordionItem.innerHTML = `
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-${index}"
        >
          <img class="me-1" src="${categoria.img}" alt="${categoria.nombre}" />
          ${categoria.nombre}
        </button>
      </h2>

      <div
        id="collapse-${index}"
        class="accordion-collapse collapse"
        data-bs-parent="#menuAccordion"
      >
        <div class="accordion-body">
          <ul class="list-unstyled">
            ${itemsHTML}
          </ul>
        </div>
      </div>
    `;

    menuContainer.appendChild(accordionItem);
  });
};

fetch("./db/db.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar JSON");
    }

    return response.json();
  })
  .then((data) => {
    renderMenu(data);
  })
  .catch((error) => {
    console.error(error);
  });

{
  /* 
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#agua">
            <img class="me-1" src="./assets/icons/agua-mineral.png" alt="garrafa de água" />
            Águas | Waters
          </button>
        </h2>
        <div id="agua" class="accordion-collapse collapse show" data-bs-parent="#menuAccordion">
          <div class="accordion-body">
            <ul class="menu-list">
              <li class="menu-item">Água 0,5L Natural | Water – 3,00€</li>
              <li class="menu-item">Água c/gás (0,33L) | Sparkling water – 2,70€</li>
            </ul>
          </div>
        </div>
      </div>


*/
}
