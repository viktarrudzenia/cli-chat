const createAutoComplete = function(data) {
    return function(string) {
        let result = [];
        if (string === undefined || string.length === 0) {
            return result;
        }
        let regExp = new RegExp(`^${string.toLowerCase()}`);

        for (let i = 0; i < data.length; i++) {
            if (regExp.exec(data[i].toLowerCase()) !== null) {
                result.push(data[i]);
            }
        }
        return result;
    };
};

module.exports = { createAutoComplete };
