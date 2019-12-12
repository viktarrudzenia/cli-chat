const isPrefixTreeCanFindInput = (prefixTree, input) => {
    try {
        return prefixTree(input);
    } catch (error) {
        return false;
    }
};

export default isPrefixTreeCanFindInput;
