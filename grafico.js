/**
 * Dibuja una barra de texto proporcional a los valores que recibirá del resultado.
 *
 * @param {number} value Valor a representar
 * @param {number} max Valor que equivale a la barra llena
 * 
 * @returns {string} x ejemplo: "▓▓▓▓▓▓▓▓▓▓░░░░░░"
 */



function drawGraphic(value, max) {
    const width = 30;
    const full = Math.round(value / max * width);
    const empty = width - full;
    return '▓'.repeat(full) + '░'.repeat(empty);
}

/**
 * Muestra en consola los indicadores con su fórmula y una barra.
 *
 * @param {object} r Resultado de calculateIndicators.
 */
function showResults(r) {
  console.log('');
  console.log('============ RESULTADOS MINSALUD ==========');
  console.log('');

  // Proporción de camas públicas
  console.log('Proporción de camas públicas: ');
  console.log(`  ${r.publicBeds} / ${r.totalBeds} = ${r.proportion.toFixed(1)} %`);
  console.log('');
  console.log(`  ${drawGraphic(r.proportion, 100)} ${r.proportion.toFixed(1)} %`);

  // Razón de camas por habitante
  console.log('Razón de camas por habitante: ');
  console.log(`  (${r.totalBeds} / ${r.population}) * 100 = ${r.ratioPercentage.toFixed(1)} cama(s) por 100 habitantes`);
  console.log('');
  console.log(`  ${drawGraphic(r.ratioPercentage, 100)} ${r.ratioPercentage.toFixed(1)} cama(s) publicas por privada`);

  // Odds de camas públicas vs privadas 
  console.log('Odds de camas publicas a privadas: ');
  console.log(`  ${r.publicBeds} / ${r.privateBeds} = ${r.odds.toFixed(2)} camas públicas por cada privada`);
  console.log('');
  console.log(`  Públicas  ${drawGraphic(r.publicBeds, r.totalBeds)} ${r.publicBeds}`);
  console.log('');
  console.log(`  Privadas  ${drawGraphic(r.privateBeds, r.totalBeds)} ${r.privateBeds}`);
  console.log('');

}

module.exports = { showResults };