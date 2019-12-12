/* eslint-disable no-param-reassign */
export const CLEAR_TO_NOT_MATCHES = 'not matches';
export const CLEAR_ALL_RESULT = 'all';
export const CLEAR_TO_INITIAL_STATE = 'init';

const clearDivWithResult = (someDiv, instructions) => {
    switch (instructions) {
        case ('not matches'): {
            someDiv.innerText = 'No matches. Try find something else';
            break;
        }
        case ('all'): {
            someDiv.innerText = '';
            break;
        } case ('init'): {
            someDiv.innerText = 'Result will be here';
            break;
        } default: {
            throw new Error('Unexpected value');
        }
    }
};

export default clearDivWithResult;
