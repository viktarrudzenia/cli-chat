/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import createAutoComplete from '../auto-complete/main.js';
import { cities } from './cities.js';
import drawInResult from './components/drawInResult.js';


const prefixTree = createAutoComplete(cities);

function addAllElements() {
    const divWithInput = document.createElement('input');
    const divWithHello = document.createElement('div');
    const divWithResult = document.createElement('div');

    divWithInput.className = 'input';
    divWithInput.placeholder = 'Type here';
    divWithHello.className = 'divWithHello';
    divWithResult.className = 'divWithResult';

    divWithHello.innerHTML = '<h1>Hello Stranger! Try find city of your dream here :) Exact string</h1>';
    divWithResult.innerHTML = 'Result will be here';

    document.body.appendChild(divWithHello);
    document.body.appendChild(divWithInput);
    document.body.appendChild(divWithResult);

    // elements displayed must > 30
    const AMOUNT_OF_ELEMENTS_DISPLAYED = 50;

    const PX_ONE_ELEMENT_OCCUPY = 25;
    const PX_FOR_ONE_ELEMENT_WHEN_LOAD_NEXT = 12;

    const PX_WHEN_LOAD_NEXT = AMOUNT_OF_ELEMENTS_DISPLAYED * PX_FOR_ONE_ELEMENT_WHEN_LOAD_NEXT;
    const PX_ELEMENTS_OCCUPYIED = AMOUNT_OF_ELEMENTS_DISPLAYED * PX_ONE_ELEMENT_OCCUPY;
    function wrapperDrawInResult() {
        return drawInResult(prefixTree, AMOUNT_OF_ELEMENTS_DISPLAYED, PX_WHEN_LOAD_NEXT,
            PX_ELEMENTS_OCCUPYIED, divWithInput, divWithResult);
    }
    // Track what in input and append in result
    divWithInput.oninput = wrapperDrawInResult;
}

document.body.onload = addAllElements;
