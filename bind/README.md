# Soft bind implementation

## Example how use softBind

```javascript
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

this.x = 'global value';

const firstObj = {
    x: 'local value of first obj',
    getX() { return this.x; },
};
const secondObj = {
    x: 'local value of second obj',
};
const thirdObj = {
    x: 'local value of third obj',
};
const fourthObj = {
    x: 'local value of fourth obj',
};

const a = firstObj.getX.softBind(secondObj);
console.log(`result of softBind to secondObj is: "${a()}"`);
const b = a.softBind(thirdObj);
console.log(`result of softBind to thirdObj is: "${b()}"`);
const c = a.softBind(fourthObj);
console.log(`result of softBind to fourthObj is: "${c()}"`);
```

Output in console:

```javascript
// result of softBind to secondObj is: "local value of second obj"
// result of softBind to thirdObj is: "local value of third obj"
// result of softBind to fourthObj is: "local value of fourth obj"
```
