const readline = require('readline');
const { fromEvent, map, filter, tap, take, toArray } = require('rxjs');

//______________Carpeta de Validaciones_________-
/**
 * Validates if the input is a positive integer (> 0).
 * @param {number} num 
 * @returns {boolean}
 */
function isPositiveInteger(num) {
  return !isNaN(num) && Number.isInteger(num) && num > 0;
}

/**
 * Validates the business rule: public beds cannot exceed total beds.
 * @param {number} publicBeds 
 * @param {number} totalBeds 
 */
function validateBedsRule(publicBeds, totalBeds) {
  if (publicBeds > totalBeds) {
    throw new Error(`Las camas publicas (${publicBeds}) No pueden exceder el maximo de camas (${totalBeds}).`);
  }
}

//_________Carpeta de interfaz______________

const text = [
  'Ingrese los habitantes de la poblacion ',
  'Ingrese el total de camas ',
  'Ingrese el total de camas publicas '
];

function notifyInputError(currentext) {
  console.error('Entre un entero valido mayor a 0');
  console.log(currentext);
}

//__________Carpeta de control_______________-

function captureInputData$() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  //Contador que permite que el texto vaya cambiando
  let counter = 0;

  console.log('DATOS DE MINISALUD');
  console.log(text[counter]);

  const lines$ = fromEvent(rl, 'line');
  //La tuberia que permite que el "Flujo" pase
  return lines$.pipe(
  
    map((line) => Number(line)),
    filter((num) => {
      const isValid = isPositiveInteger(num);
      if (!isValid) {
        notifyInputError(text[counter]);
      }
      return isValid;
    }),

    //Hace que avance a la siguiente pregunta cuando filter=true
    tap(() => {
      counter++;
      if (counter < text.length) {
        console.log(text[counter]);
      }
    }),

    //Coge las respuestas permitidas y las mete a un arraylist
    take(text.length),
    toArray(),

   //Crea el objeto con 
    map(([population, totalBeds, publicBeds]) => {
      rl.close();

      validateBedsRule(publicBeds, totalBeds);

      return {
        population,
        totalBeds,
        publicBeds,
      };
    })
  );
}

//lo cambie porque me faltaba el module.exports y ese bloque preguntaba 2 veces en el main

module.exports = { captureInputData$ };