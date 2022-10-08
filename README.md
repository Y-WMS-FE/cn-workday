# cn-workday
> 获取中国工作日情况
[![](https://img.shields.io/badge/version-v1.0.4-success)]()
[![](https://img.shields.io/badge/keywords-workday,china_workday,chinese_workday,holiday-blue)]()
[![](https://img.shields.io/badge/license-MIT-success)](https://github.com/Y-WMS-FE/cn-workday/blob/main/LICENSE)

## Installation
-----
        $ npm install cn-workday
Or

        $ yarn add cn-workday

## Usage
```javascript
    import { isWorkday, getWorkdays } from 'cn-workday';
    
    isWorkday(); // 返回今天是否是工作日
    isWorkday('2022-10-08'); // true
    isWorkday(new Date('2022-10-08')); // true

    getWorkdays(); // 返回本周的工作日数组
    getWorkdays('2022-10-08'); // 返回 2022-10-08 所在周的工作日数组
    getWorkdays('2022-10-08', 'Month'); // 返回 2022-10-08 所在月份的工作日数组
```

## Api

## LICENSE
----
[MIT](./LICENSE)
