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
    const PX_ELEMENTS_OCCUPYIED = AMOUNT_OF_ELEMENTS_DISPLAYED * 14;
    const PX_WHEN_LOAD_NEXT = AMOUNT_OF_ELEMENTS_DISPLAYED * 25;
    function wrapperDrawInResult() {
        return drawInResult(prefixTree, AMOUNT_OF_ELEMENTS_DISPLAYED, PX_ELEMENTS_OCCUPYIED,
            PX_WHEN_LOAD_NEXT, divWithInput, divWithResult);
    }
    // Track what in input and append in result
    divWithInput.oninput = wrapperDrawInResult;
}

document.body.onload = addAllElements;
