// modules/api.js
// Este módulo se encarga de cargar sesiones desde un JSON local con el método fetch()

// Función que devuelve un array de sesiones leyendo desde el path data/sesiones.json
// Se usa async y await para ejecución correcta y en orden.
export async function cargarSesiones() {
  const resp = await fetch("./data/sesiones.json");
  if (!resp.ok) throw new Error("No se pudo cargar sesiones.json");
  return await resp.json();
}
