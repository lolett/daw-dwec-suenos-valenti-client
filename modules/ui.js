// Módulo para renderizar sesiones, carrito, preferencias en el DOM.

// Importa la función euro del archivo utils.js.
import { euro } from "./utils.js";

// renderSesiones() renderiza las sesiones y onAdd(sesion) se llama se pulsa "Añadir al carrito".
export function renderSesiones(app, sesiones, onAdd) {
    // Se elimina el contenido anterior del contenedor.
    app.innerHTML = "";

  // Creamos el título de la sección con DOM (createElement) y lo insertamos.
  const h2 = document.createElement("h2");
  h2.textContent = "Sesiones disponibles";
  app.appendChild(h2);

  // Creamos un input de búsqueda para filtrar sesiones por nombre.
  const input = document.createElement("input");
  input.placeholder = "Buscar por nombre...";
  input.style.display = "block";
  input.style.marginBottom = "10px";
  app.appendChild(input);

  // Creamos un contenedor donde iremos metiendo las "tarjetas" de las sesiones.
  const lista = document.createElement("div");
  app.appendChild(lista);

  // renderizarListadoSesiones() se encarga de actualizar lo que se ve en la lista, 
  // aplicando el filtro de texto (si hay). Previamente se elimina el contenido anterior del contenedor.
  function renderizarListadoSesiones(filtro = "") {
    lista.innerHTML = "";

    // Filtramos el array de sesiones para quedarnos solo con las que contienen el texto buscado.
    const filtradas = sesiones.filter(s =>
      s.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    // If para comprobar si hay sesiones que coincidan, si no, muestra mensaje.
    if (filtradas.length === 0) {
      const p = document.createElement("p");
      p.textContent = "No hay sesiones con ese filtro.";
      lista.appendChild(p);
      return;
    }

    // Bucle forEach que recorre cada sesión filtrada, creando una tarjeta para cada una de ellas.
    filtradas.forEach(s => {
      const card = document.createElement("div");
      // Estilos de tarjeta
      card.style.border = "1px solid #ddd";
      card.style.padding = "10px";
      card.style.marginBottom = "10px";

      const nombre = document.createElement("strong");
      nombre.textContent = s.nombre;

      const precio = document.createElement("div");
      precio.textContent = `Precio: ${euro(s.precio)}`;

      const btn = document.createElement("button");
      btn.textContent = "Añadir al carrito";
      btn.addEventListener("click", () => onAdd(s));

      card.appendChild(nombre);
      card.appendChild(document.createElement("br"));
      card.appendChild(precio);
      card.appendChild(btn);
      lista.appendChild(card);
    });
  }

  // Evento input: cada vez que el usuario escribe en el buscador,
  // se vuelve a llamar a renderizarListadoSesiones() con el texto actual del input.
  input.addEventListener("input", (e) => renderizarListadoSesiones(e.target.value));
  // Se muestran todas las sesiones
  renderizarListadoSesiones();
}

// Render del carrito.
// Función onRemove() elimina un artículo del carrito, onClear() vacía el carrito complemente.
export function renderCarrito(app, carrito, onRemove, onClear) {
  app.innerHTML = "";

  // Título del carrito.
  const h2 = document.createElement("h2");
  h2.textContent = "Tu carrito";
  app.appendChild(h2);

  // If para comprobar si el carrito está vacío, en cuyo caso muestra un mensaje.
  if (carrito.length === 0) {
    const p = document.createElement("p");
    p.textContent = "El carrito está vacío.";
    app.appendChild(p);
    return;
  }

  const ul = document.createElement("ul");
  app.appendChild(ul);

  // Bucle forEach para recorrer el carrito y crear un <li> por cada sesión.
  carrito.forEach((s, index) => {
    const li = document.createElement("li");
    li.style.marginBottom = "8px";

    li.textContent = `${s.nombre} — ${euro(s.precio)}`;

    // Button que ejecuta onRemove(index) para eliminar el artículo seleccionado.
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.style.marginLeft = "10px";
    btn.addEventListener("click", () => onRemove(index));

    li.appendChild(btn);
    ul.appendChild(li);
  });

  // Cálculo del total en euros y se muestra en un párrafo.
  const total = carrito.reduce((acc, s) => acc + s.precio, 0);
  const pTotal = document.createElement("p");
  pTotal.innerHTML = `<strong>Total:</strong> ${euro(total)}`;
  app.appendChild(pTotal);

  // Button que ejecuta onClear() y vacía el carrito.
  const btnVaciar = document.createElement("button");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", () => onClear());
  app.appendChild(btnVaciar);
}

// renderPreferencias() renderiza las preferencias del usuario
export function renderPreferencias(app, prefs, onSave) {
  app.innerHTML = "";

  // Título de la sección
  const h2 = document.createElement("h2");
  h2.textContent = "Preferencias";
  app.appendChild(h2);

  // Etiqueta del input de nombre
  const label = document.createElement("label");
  label.textContent = "Nombre del cliente: ";
  app.appendChild(label);

  // Input donde el usuario escribe su nombre
  const input = document.createElement("input");
  input.value = prefs.nombre ?? "";
  input.placeholder = "Escribe tu nombre...";
  app.appendChild(input);

  // Saltos de línea para separar visualmente
  app.appendChild(document.createElement("br"));
  app.appendChild(document.createElement("br"));

  // Botón para guardar preferencias
  const btn = document.createElement("button");
  btn.textContent = "Guardar preferencias";
  btn.addEventListener("click", () => onSave({ nombre: input.value.trim() }));
  app.appendChild(btn);

  // Párrago con texto informativo para el usuario
  const p = document.createElement("p");
  p.style.marginTop = "10px";
  p.textContent = "Se guardará en localStorage.";
  app.appendChild(p);
}
