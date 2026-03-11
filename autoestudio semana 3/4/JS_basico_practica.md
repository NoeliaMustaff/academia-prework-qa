# Práctica JavaScript básico para Testing

## 1. Variables (let)

```javascript
let nombre = "Noelia";
console.log(nombre);

//Explicación: let permite declarar variables cuyo valor puede cambiar durante el programa.

const edad = 24;
console.log(edad);

//Explicación: const se usa para variables que no van a cambiar.

let frutas = ["manzana", "banana", "naranja"];
console.log(frutas[0]);

//Explicación: Un array permite guardar varios valores en una sola variable.

let usuario = {
  nombre: "Noelia",
  rol: "tester",
  edad: 24
};

console.log(usuario.nombre);

//Explicación: Un objeto guarda información en formato clave-valor.

function saludar(nombre) {
  return "Hola " + nombre;
}

console.log(saludar("Noelia"));

//Explicación: Una función declarada permite reutilizar código.

const sumar = (a, b) => {
  return a + b;
};

console.log(sumar(2, 3));

// Explicación: Las funciones arrow son una forma más corta de escribir funciones.

let edad = 18;

if (edad >= 18) {
  console.log("Es mayor de edad");
}

// Explicación: if permite ejecutar código solo si se cumple una condición.

let numeros = [1, 2, 3];

let dobles = numeros.map(n => n * 2);

console.log(dobles);

//Explicación: map() crea un nuevo array aplicando una función a cada elemento.

let numeros = [1, 2, 3, 4, 5];

let pares = numeros.filter(n => n % 2 === 0);

console.log(pares);

// Explicación: filter() devuelve un nuevo array con los elementos que cumplen la condición.

async function obtenerMensaje() {
  let mensaje = await Promise.resolve("Hola desde una promesa");
  console.log(mensaje);
}

obtenerMensaje();

// Explicación: await hace que el código espere el resultado de una promesa antes de continuar.

