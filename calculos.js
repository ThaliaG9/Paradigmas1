/**
 * hace los calculos para sacar los indicadores de las camas hospitalarias
 * @param {{population, totalBeds, publicBeds}} datos necesarios
 * @returns {object} datos originales + indicadores calculados
 * 
 */

function calculateIndicators(datos) {
    // establezco los datos que recibo, asignándoles constantes.
    const {population, totalBeds, publicBeds} = datos;
    // hago los cálculos
    const privateBeds = totalBeds - publicBeds;
    const ratio = totalBeds/population;
    const ratioPercentage = ratio * 100;
    const proportion = publicBeds / totalBeds*100;
    // si no hay camas privadas, el odds no se puede calcular porque sería dividir por cero
    let odds = null;
    if (privateBeds > 0) {
        odds = publicBeds / privateBeds;
    }
    // se devuelve todo junto
    return {
        population, totalBeds, publicBeds, privateBeds, ratio, ratioPercentage, proportion, odds
    }

}

module.exports = { calculateIndicators };