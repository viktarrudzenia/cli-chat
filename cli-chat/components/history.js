const fs = require('fs');
const path = require('path');

const d = new Date();
const historyFileName = `${[d.getMonth() + 1, d.getDate(), d.getFullYear()].join('-')} ${[d.getHours(), d.getMinutes(), d.getSeconds()].join('-')}`;
const timeOptions = {
    day: '2-digit',
    year: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
};

function logToHistory(data) {
    const message = `${new Date(data.time).toLocaleDateString('en-US', timeOptions)} ${data.from}: ${data.message}\n`;
    fs.appendFileSync(path.join(__dirname, `../history/${historyFileName}.txt`), message);
}

module.exports = logToHistory;
