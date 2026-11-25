// JavaScript básico: variables, funciones y arreglos
const nombre = "Sofía";
let puntos = 0;

function sumarPuntos(cantidad) {
  puntos += cantidad;
  return puntos;
}

sumarPuntos(10);
sumarPuntos(5);
console.log(`${nombre} tiene ${puntos} puntos`);

const notas = [7, 9, 5, 8];
const aprobadas = notas.filter(n => n >= 6);
const promedio = notas.reduce((a, b) => a + b, 0) / notas.length;
console.log("Aprobadas:", aprobadas, "Promedio:", promedio.toFixed(2));
