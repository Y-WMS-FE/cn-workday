# cn-workday
> 获取中国工作日情况

[![](https://img.shields.io/badge/version-v1.0.6-success)]()
[![](https://img.shields.io/badge/keywords-workday,china_workday,chinese_workday-blue)]()
[![](https://img.shields.io/badge/license-MIT-success)](https://github.com/Y-WMS-FE/cn-workday/blob/main/LICENSE)

## Installation
-----
        $ npm install cn-workday
Or

        $ yarn add cn-workday

## Usage
```javascript
    import { isWorkday, getWorkdays, getWorkdaysBetween } from 'cn-workday';
    
    isWorkday(); // 返回今天是否是工作日
    isWorkday('2022-10-08'); // true
    isWorkday(new Date('2022-10-08')); // true

    getWorkdays(); // 返回本周的工作日数组
    getWorkdays('2022-10-08'); // 返回 2022-10-08 所在周的工作日数组
    getWorkdays('2022-10-08', 'Month'); // 返回 2022-10-08 所在月份的工作日数组
    getWorkdaysBetween('2022-10-01', '2022-10-31'); // 返回2022-10-01与2022-10-31之间的工作日数组
```

node使用

```javascript
    const { isWorkday, getWorkdays, getWorkdaysBetween } = require('cn-workday');
    
    isWorkday(); // 返回今天是否是工作日
    getWorkdays(); // 返回本周的工作日数组
    getWorkdaysBetween('2022-10-01', '2022-10-31'); // 返回2022-10-01与2022-10-31之间的工作日数组
```

## Api

* [isWorkday](#isWorkday)
* [getWorkdays](#getWorkDays)
* [getWorkdaysBetween](#getWorkdaysBetween)

### isWorkday
> 判断一个日期是否为工作日
- param: date string | Date 日期
- return: Boolean

### getWorkDays
> 获取一个日期所在周|月的工作日数组
- param1: date string | Date | 'Week' | 'Month'
- param2: 'Week' | 'Month'
- return: Array [{ d: Date, dateStr: dateString, type: number }] type: 1(工作日)/2(周末补班)/3(周末)/4(节假日)

### getWorkdaysBetween
> 获取两个日期之间的工作日数组
- param1: date string
- param2: date string
- return: [{ d: Date, dateStr: dateString, type: number }] type: 1(工作日)/2(周末补班)/3(周末)/4(节假日)

## LICENSE
----
[MIT](./LICENSE)
