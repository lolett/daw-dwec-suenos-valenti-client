// modules/utils.js
// Este módulo contiene funciones que cargan y formatean JSON, así como formateo de precio en euros.

// Lee un JSON de localStorage. Si no existe o está mal, devuelve fallback.
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Guarda enformato JSON en localStorage.
export function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Formatea un número a euros.
export function euro(n) {
  return `${Number(n).toFixed(2)} €`;
}
