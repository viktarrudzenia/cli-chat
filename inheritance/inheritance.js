function Builder(state) {
    this.setState(state);
    this.clearQueue();
}

Builder.random = function(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
};

Builder.prototype._plus = function(array) {
    this.state += array.reduce((accamulator, currentValue) => {
        return accamulator + currentValue;
    });
};

Builder.prototype.plus = function() {
    this.addQueue(this._plus, Array.from(arguments));
    return this;
};

Builder.prototype.addQueue = function(deferCalcFunc, deferCalcValues) {
    this.queue.push([deferCalcFunc, deferCalcValues]);
};

Builder.prototype.setState = function(state) {
    this.state = state;
};

Builder.prototype.clearQueue = function() {
    this.queue = [];
};

Builder.prototype.get = function() {
    this.queue.forEach(calculation => {
        calculation[0].call(this, calculation[1]);
    });
    return this.state;
};

// INTEGER

class IntBuilder extends Builder {
    constructor(state = 0) {
        super(state);
    }

    _minus(numbers) {
        this.state -= numbers.reduce((accamulator, currentValue) => {
            return accamulator + currentValue;
        });
    }

    minus(...numbers) {
        this.addQueue(this._minus, numbers);

        return this;
    }

    _multiply(number) {
        this.state *= number;
    }

    multiply(number) {
        this.addQueue(this._multiply, number);
        return this;
    }

    _divide(number) {
        this.state /= number;
    }

    divide(number) {
        this.addQueue(this._divide, number);
        return this;
    }

    _mod(number) {
        this.state %= number;
    }

    mod(number) {
        this.addQueue(this._mod, number);

        return this;
    }
}

// STRING

function StringBuilder(state = "") {
    Builder.call(this, state);
}

StringBuilder.prototype = Object.create(Builder.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype._minus = function(number) {
    this.state = this.state.slice(0, number);
};

StringBuilder.prototype.minus = function(number) {
    this.addQueue(this._minus, number);
    return this;
};

StringBuilder.prototype._multiply = function(number) {
    this.state = this.state.repeat(number);
};

StringBuilder.prototype.multiply = function(number) {
    this.addQueue(this._multiply, number);
    return this;
};

StringBuilder.prototype._divide = function(number) {
    let numberOfLetters = Math.floor(this.state.length / number);
    this.state = this.state.slice(0, numberOfLetters);
};

StringBuilder.prototype.divide = function(number) {
    this.addQueue(this._divide, number);
    return this;
};

StringBuilder.prototype._remove = function(string) {
    let arrayWithLettersOfString = Array.from(this.state);
    this.state = arrayWithLettersOfString
        .filter(letter => letter !== string)
        .join("");
};

StringBuilder.prototype.remove = function(string) {
    this.addQueue(this._remove, string);
    return this;
};

StringBuilder.prototype._sub = function(array) {
    if (array[1] === undefined) array[1] = 0;
    this.state = this.state.slice(array[0], array[0] + array[1]);
};

StringBuilder.prototype.sub = function(from, length = 0) {
    this.addQueue(this._sub, [from, length]);
    return this;
};
