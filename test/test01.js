const { getWorkdays, getWorkdaysBetween } = require('../dist/cn-workday');

// console.log(getWorkdays('2022-02-33'));
// console.log(getWorkdays('2022-10-01'));
// console.log(getWorkdays('2022-02-01', 'm'));
// console.log(getWorkdays('2022-02-08'));
// console.log(getWorkdays('we'));
console.log(getWorkdaysBetween('2022-10-11', '2022-10-18'));
console.log(getWorkdays('2022-10-11', 'w'));

// const r = isWorkday('2022-10-08')
// console.log(r.length);
// getWorkdaysByMonth()