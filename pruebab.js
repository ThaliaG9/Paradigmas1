const { of, map } = require('rxjs');
const { calculateIndicators } = require('./calculos');
const { showResults } = require('./grafico');

of({ population: 20000, totalBeds: 300, publicBeds: 250 }).pipe(
  map(calculateIndicators)
).subscribe(showResults);