const URL_CATEGORIAS = "https://www.themealdb.com/api/json/v1/1/categories.php";
const URL_COMIDAS = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

const selectCategorias = document.getElementById("categorias");
const contenedorComidas = document.getElementById("contenedor-comidas");

// Función para obtener y mostrar las categorías en el select
function obtenerCategorias() {
    fetch(URL_CATEGORIAS)
        .then(respuesta => respuesta.json())
        .then(datos => {
            selectCategorias.innerHTML = "<option value=''>Seleccione una categoría</option>";
            datos.categories.forEach(categoria => {
                const opcion = document.createElement("option");
                opcion.value = categoria.strCategory;
                opcion.textContent = categoria.strCategory;
                selectCategorias.appendChild(opcion);
            });
        })
        .catch(error => console.error("Error al obtener categorías:", error));
}

// Función para obtener y mostrar comidas según la categoría seleccionada
function obtenerComidas(categoria) {
    fetch(URL_COMIDAS + categoria)
        .then(respuesta => respuesta.json())
        .then(datos => {
            contenedorComidas.innerHTML = "";
            datos.meals.forEach(comida => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta-comida");

                tarjeta.innerHTML = `
                    <img src="${comida.strMealThumb}" alt="${comida.strMeal}">
                    <h3>${comida.strMeal}</h3>
                `;

                contenedorComidas.appendChild(tarjeta);
            });
        })
        .catch(error => console.error("Error al obtener comidas:", error));
}

// Detectar cambios en el select y mostrar las comidas correspondientes
selectCategorias.addEventListener("change", function () {
    if (this.value) {
        obtenerComidas(this.value);
    } else {
        contenedorComidas.innerHTML = "";
    }
});

obtenerCategorias();
