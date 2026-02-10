// 1. Variables y tipos de datos

// const: variable que no cambia su valor
const nombreQA = "Noelia"; // string (texto)

// let: variable cuyo valor puede cambiar
let edad = 24; // number (número)

// boolean: verdadero o falso
let esTester = true; // boolean

// Mostramos los valores en consola
console.log("Nombre:", nombreQA);
console.log("Edad:", edad);
console.log("¿Es tester?:", esTester);

// 2. Función: suma de dos números

// Función que recibe dos números y devuelve su suma
function sumar(a, b)
{
  return a + b;
}

// Llamamos a la función y guardamos el resultado
const resultado = sumar(5, 7);

// Mostramos el resultado en consola
console.log("Resultado de la suma:", resultado);

// 3. Objeto + array (casos de prueba)

// Array con 3 casos de prueba representados como objetos
const casosDePrueba = [
    {
      id: 1,
      titulo: "Transferencia con alias válido",
      esperado: "La transferencia se realiza correctamente"
    },
    {
      id: 2,
      titulo: "Transferencia con alias inválido",
      esperado: "El sistema muestra un mensaje de error"
    },
    {
      id: 3,
      titulo: "Transferencia sin confirmación previa",
      esperado: "El sistema solicita confirmación antes de enviar"
    }
  ];
  
  // Recorremos el array y mostramos cada caso de prueba
  casosDePrueba.forEach((caso) => {
    console.log("Caso ID:", caso.id);
    console.log("Título:", caso.titulo);
    console.log("Resultado esperado:", caso.esperado);
    console.log("---------------------------");
  });
  

  // 4. (OPCIONAL) Async / Await
  
  // Función que retorna una promesa usando setTimeout
  function esperarUnSegundo() 
  {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("listo");
      }, 1000);
    });
  }
  
  // Función async que espera la promesa
  async function ejecutarAsync() 
  {
    const mensaje = await esperarUnSegundo();
    console.log(mensaje);
  }
  
  // Llamamos a la función async
  ejecutarAsync();
