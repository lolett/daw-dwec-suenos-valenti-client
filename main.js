
// Módulo principal: importa funciones, maneja botones de navegación, carga sesiones, 
// actualiza contador del carrito y cambia renders.

// imports de funciones.

// Carga de sesiones desde JSON (fetch).
import { cargarSesiones } from "./modules/api.js";

// Funciones de interfaz: renderizan las pantallas en el DOM de las sesiones, carrito y preferencias.
import {
  renderSesiones,
  renderCarrito,
  renderPreferencias
} from "./modules/ui.js";

// Funciones del carrito: leer, añadir, eliminar y vaciar (localStorage).
import {
  leerCarrito,
  agregarAlCarrito,
  eliminarDelCarritoPorIndex,
  vaciarCarrito
} from "./modules/carrito.js";

// Funciones para formatear json.
import { loadJSON, saveJSON } from "./modules/utils.js";


const app = document.getElementById("app"); // container para los renders de las pantallas.
const badge = document.getElementById("badge"); // contador del carrito en el botón.

// Clave de localStorage para preferencias
const KEY_PREFS = "prefs_dreams";

// obtiene preferencias desde localStorage. Si no existen, devuelve {} para evitar errores.
function leerPrefs() {
  return loadJSON(KEY_PREFS, {});
}

// Guarda todas las preferencias en localStorage.
function guardarPrefs(prefs) {
  saveJSON(KEY_PREFS, prefs);
}

// Actualiza la cantidad de elementos en el carrito.
function actualizarBadge() {
  badge.textContent = leerCarrito().length;
}

// Cache de sesiones creado para no hacer fetch cada vez que se accede a "Sesiones".
let sesionesCache = [];

// Render de las sesiones. Si se pulsa  "Añadir al carrito",
// se llama al callback y se actualiza el badge.
function irASesiones() {
  renderSesiones(app, sesionesCache, (sesion) => {
    agregarAlCarrito(sesion);
    actualizarBadge();
  });
}

// Renderiza el carrito. Hace posible eliminar elemntos por índice del carrito.
function irACarrito() {
  const carrito = leerCarrito();

  renderCarrito(app, carrito,
    (index) => {
      eliminarDelCarritoPorIndex(index);
      actualizarBadge();
      irACarrito(); // actualiza render del carrito.
    },
    () => {
      vaciarCarrito();
      actualizarBadge();
      irACarrito();
    }
  );
}

// Render de preferencias.
function irAPreferencias() {
  const prefs = leerPrefs();
  renderPreferencias(app, prefs, (nuevasPrefs) => {
    guardarPrefs(nuevasPrefs);
    // Mensaje para confirmar guardado.
    app.insertAdjacentHTML("beforeend", "<p><strong>Preferencias guardadas.</strong></p>");
  });
}

// Botones con sus eventos para cambiar vistas.
document.getElementById("btnSesiones").addEventListener("click", irASesiones);
document.getElementById("btnCarrito").addEventListener("click", irACarrito);
document.getElementById("btnPrefs").addEventListener("click", irAPreferencias);

// Inicio de la aplicación.
(async function init() {
  try {
    sesionesCache = await cargarSesiones();
    actualizarBadge();
    irASesiones(); // pantalla inicial
  } catch (e) {
    // Si falla la carga (fetch/rutas) se muestra el error en el main container.
    app.textContent = "Error: " + e.message;
  }
})();
