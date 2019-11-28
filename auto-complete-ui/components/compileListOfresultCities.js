function compileListOfresultCities(AMOUNT_OF_ELEMENTS_DISPLAYED,
    resultCities, listOfresultCities) {
    let resultList = listOfresultCities;
    for (let i = 0; i < AMOUNT_OF_ELEMENTS_DISPLAYED; i += 1) {
        resultList += '<li>' + resultCities[i] + '</li>\n';
    }
    return resultList;
}

export default compileListOfresultCities;
