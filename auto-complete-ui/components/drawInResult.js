/* eslint-disable import/extensions */
import clearDivWithResult, { CLEAR_TO_NOT_MATCHES, CLEAR_ALL_RESULT, CLEAR_TO_INITIAL_STATE } from './clearDivWithResult.js';
import checkInput from './checkInput.js';
import checkScroll from './checkScroll.js';
import compileListOfresultCities from './compileListOfresultCities.js';

function drawInResult(prefixTree, AMOUNT_OF_ELEMENTS_DISPLAYED,
    PX_ELEMENTS_OCCUPYIED, PX_WHEN_LOAD_NEXT, divWithInput, divWithResult) {
    const currentInput = divWithInput.value;

    if (currentInput === '') {
        clearDivWithResult(divWithResult, CLEAR_TO_INITIAL_STATE);
        return;
    }

    const resultCities = checkInput(prefixTree, currentInput);

    if (!resultCities) {
        clearDivWithResult(divWithResult, CLEAR_TO_NOT_MATCHES);
        return;
    }
    clearDivWithResult(divWithResult, CLEAR_ALL_RESULT);
    const newDiv = document.createElement('div');
    const resultCitiesLength = resultCities.length;

    if (resultCitiesLength > AMOUNT_OF_ELEMENTS_DISPLAYED) {
        const start = 0;
        let listOfresultCities = '';
        const currentScroll = window.scrollY;

        // eslint-disable-next-line no-inner-declarations
        function wrapperCheckScroll() {
            return checkScroll(divWithInput, currentInput, start, AMOUNT_OF_ELEMENTS_DISPLAYED,
                listOfresultCities, currentScroll, divWithResult, resultCities, resultCitiesLength,
                newDiv, PX_ELEMENTS_OCCUPYIED, PX_WHEN_LOAD_NEXT, AMOUNT_OF_ELEMENTS_DISPLAYED,
                wrapperCheckScroll);
        }

        window.removeEventListener('scroll', wrapperCheckScroll);


        listOfresultCities = compileListOfresultCities(AMOUNT_OF_ELEMENTS_DISPLAYED,
            resultCities, listOfresultCities);
        newDiv.innerHTML = 'Autocomplete found ' + resultCitiesLength + ' element/s <ol>' + listOfresultCities + '</ol>';
        divWithResult.appendChild(newDiv);


        // add infinite scroll
        window.addEventListener('scroll', wrapperCheckScroll);
    } else {
        const listOfresultCities = resultCities
            .map((element) => '<li>' + element + '</li>\n')
            .join('');
        newDiv.innerHTML = 'Autocomplete found ' + resultCitiesLength + ' element/s <ol>' + listOfresultCities + '</ol>';
        divWithResult.appendChild(newDiv);
    }
}

export default drawInResult;
