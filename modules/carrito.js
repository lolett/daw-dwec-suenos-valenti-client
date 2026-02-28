// Módulo gestiona el carrito usando localStorage.

// Importa json functions desde utils.js
import { loadJSON, saveJSON } from "./utils.js";

const KEY_CART = "carrito_dreams";

// Devuelve el carrito guardado enf forma de array o, [] vacío si no existe.
export function leerCarrito() {
  return loadJSON(KEY_CART, []);
}

// Guarda el contenido completo del carrito.
export function guardarCarrito(items) {
  saveJSON(KEY_CART, items);
}

// Añade una sesión al carrito y lo devuelve actualizado.
export function agregarAlCarrito(sesion) {
  const carrito = leerCarrito();
  carrito.push(sesion);
  guardarCarrito(carrito);
  return carrito;
}

// Eliminar elementos del carrito por índice
export function eliminarDelCarritoPorIndex(index) {
  const carrito = leerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  return carrito;
}

// Vacía el carrito de artículos
export function vaciarCarrito() {
  guardarCarrito([]);
  return [];
}

// Calcula el precio total de los artículos que hay en el carrito
export function calcularTotal(items) {
  return items.reduce((acc, s) => acc + s.precio, 0);
}
