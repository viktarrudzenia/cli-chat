const stack = [];
let isLExecuted = false;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function l(num) {
    if (isLExecuted) {
        stack.push(num);
        return;
    }
    isLExecuted = true;

    for (let i = num; i > 0; i -= 1) {
        await delay(i * 300);
        console.log(i);
    }
    isLExecuted = false;

    if (stack.length) {
        return l(stack.pop());
    }
}

l(3);
l(3);
l(3);
l(3);
