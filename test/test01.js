const { getWorkdays } = require('../dist/cn-workday');


const r = getWorkdays('2022-10-01', 'M');
console.log(r);
// const r = isWorkday('2022-10-08')
// console.log(r);
// getWorkdaysByMonth()