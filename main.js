/**
 * Programa principal: lee los datos por teclado, calcula los
 * indicadores de camas hospitalarias y muestra los resultadoss
 */
const { map } = require('rxjs');
const { captureInputData$ } = require('./Lector');
const { calculateIndicators } = require('./calculos');
const { showResults } = require('./grafico');

captureInputData$().pipe(
  map(calculateIndicators)
).subscribe({
  next: showResults,
  error: (err) => console.error(`\nHubo un error: ${err.message}`),
});