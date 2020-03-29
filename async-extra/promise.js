const stack = [];
let isLExecuted = false;

function l(num) {
    if (isLExecuted) {
        stack.push(num);
        return;
    }
    isLExecuted = true;

    Promise.resolve(num)
        .then((res) => {
            if (res <= 0) {
                reject();
            }
            return res;
        })
        .then((res) => {
            setTimeout(() => {
                isLExecuted = false;
                console.log(res);
                l(res - 1);
            }, res * 500);
        })
        .catch((error) => {
            if (stack.length) {
                isLExecuted = false;
                return l(stack.pop());
            }
            isLExecuted = false;
        });
}

l(3);
l(3);
l(3);
l(3);
