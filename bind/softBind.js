if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (context) {
        const that = this;
        const args = [].slice.call(arguments, 1);
        return function () {
            return that.apply((!this || this === (window || global)) ? context : this,
                args.concat([].slice.call(arguments)));
        };
    };
}
