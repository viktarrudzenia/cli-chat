const createAutoComplete = function(data) {
    if (data.length < 150) {
        return function(string) {
            let result = [];
            if (string === undefined || string.length === 0) {
                return result;
            }
            let regExp = new RegExp(`^${string.toLowerCase()}`);
            // console.log("I`m in const func");

            for (let i = 0; i < data.length; i++) {
                if (regExp.exec(data[i].toLowerCase()) !== null) {
                    result.push(data[i]);
                }
            }
            return result;
        };
    } else {
        // create class PrefixTree
        class PrefixTree {
            constructor(letter) {
                this.value = letter || "";
                // state for repeat count how many times repeats word
                this.repeat = 0;
                this.children = {};
                this.isWord = false;
            }

            add(word, node = this) {
                for (const letter of word) {
                    if (node.children[letter]) {
                        node = node.children[letter];
                    } else {
                        const newNode = new PrefixTree(letter);

                        node.children[letter] = newNode;
                        node = newNode;
                    }
                }

                node.isWord = true;
                node.repeat += 1;
            }

            find(word, node = this) {
                let value = "";

                for (const letter of word) {
                    if (node.children[letter]) {
                        node = node.children[letter];
                        value += letter;
                    }
                }
                return value === word ? node : null;
            }

            findWords(value = "", node = this.find(value), words = [], isInitString = true) {
                // check initString for results
                if (isInitString) {
                    for (let i = 0; i < node.repeat; i++) {
                        words.push(value);
                        isInitString = false;
                    }
                }

                Object.values(node.children).forEach(child => {
                    if (child.isWord) {
                        // check child, if repeat > 0 ---> do few times more
                        if (child.repeat > 0) {
                            let howMuchTimes = 0;
                            howMuchTimes += child.repeat;
                            for (let i = 0; i < howMuchTimes; i++) {
                                words.push(value + child.value);
                            }
                        } else {
                            words.push(value + child.value);
                        }
                    }
                    child.findWords(value + child.value, child, words, false);
                });

                return words;
            }
        }

        // init and fill our prefTree
        let prefTree = new PrefixTree();
        for (let i in data) {
            prefTree.add(data[i]);
        }

        return function(string) {
            return prefTree.findWords(string);
        };
    }
};

module.exports = { createAutoComplete };
