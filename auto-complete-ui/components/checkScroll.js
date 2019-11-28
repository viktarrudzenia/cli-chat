/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import clearDivWithResult, { CLEAR_ALL_RESULT } from './clearDivWithResult.js';


function checkScroll(input, currentInput, start, counter, listOfresultCities, currentScroll,
    divWithResult, resultCities, resultCitiesLength, newDiv, PX_ELEMENTS_OCCUPYIED,
    PX_WHEN_LOAD_NEXT, AMOUNT_OF_ELEMENTS_DISPLAYED, checkCheckScroll) {
    if (currentInput !== input.value) {
        window.removeEventListener('scroll', checkCheckScroll);
        return;
    }
    if (window.scrollY - currentScroll > PX_ELEMENTS_OCCUPYIED) {
        start += AMOUNT_OF_ELEMENTS_DISPLAYED;
        counter += AMOUNT_OF_ELEMENTS_DISPLAYED;
        currentScroll += PX_WHEN_LOAD_NEXT;
        for (
            let i = start;
            i < counter && i < resultCitiesLength;
            i += 1
        ) {
            listOfresultCities += '<li>' + resultCities[i] + '</li>\n';
        }
        clearDivWithResult(divWithResult, CLEAR_ALL_RESULT);
        newDiv.innerHTML = 'Autocomplete found ' + resultCitiesLength + ' element/s <ol>' + listOfresultCities + '</ol>';
        divWithResult.appendChild(newDiv);
        window.removeEventListener('scroll', checkCheckScroll);

        window.addEventListener('scroll', function nextWrapperCheckScroll() {
            checkScroll(input, currentInput, start, counter, listOfresultCities, currentScroll,
                divWithResult, resultCities, resultCitiesLength, newDiv, PX_ELEMENTS_OCCUPYIED,
                PX_WHEN_LOAD_NEXT, AMOUNT_OF_ELEMENTS_DISPLAYED, nextWrapperCheckScroll);
        });
    }
}

export default checkScroll;
