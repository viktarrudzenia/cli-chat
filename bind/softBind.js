if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (context) {
        if (typeof this !== 'function') {
            throw new TypeError('Not callable');
        }
        const that = this;
        const root = window || global;
        const args = [].slice.call(arguments, 1);
        const func = function () {};
        const result = function () {
            const actualContext = (!this || this === root) ? context : this;
            const allArgs = args.concat([].slice.call(arguments));
            return that.apply(actualContext, allArgs);
        };
        func.prototype = that.prototype;
        result.prototype = new func();
        return result;
    };
}
