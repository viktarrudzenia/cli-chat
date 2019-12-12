/* eslint-disable consistent-return */
// eslint-disable-next-line import/extensions
import isPrefixTreeCanFindInput from './isPrefixTreeCanFindInput.js';

function checkInput(prefixTree, someInput) {
    if (someInput === '') {
        return;
    }
    if (!isPrefixTreeCanFindInput(prefixTree, someInput)) {
        return false;
    }
    return isPrefixTreeCanFindInput(prefixTree, someInput);
}

export default checkInput;
