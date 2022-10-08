import { format, add, parse, parseISO, isMatch } from 'date-fns'
import { HOLIDAYS, WEEKEND_WORKDAYS } from './holiday-source'

const formatDate = (date) => {
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    m = String(m).padStart(2, '0');
    d = String(d).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/**
 * 获取日期的类型
 * @param dateStr 日期的中文
 * @param day 星期几
 * @returns {number}
 * type： 1：工作日 2：周末补班 3：周末 4：节假日
 */
const formatType = (dateStr, day) => {
    let type = 1;
    if (HOLIDAYS[dateStr]) {
        type = 4
    } else if (WEEKEND_WORKDAYS[dateStr]) {
        type = 2;
    } else if ([0, 6].includes(day)) {
        type = 3;
    }
    return type;
}

const getWorkdaysByWeek = (_d) => {
    const day = _d.getDay();
    const result = [];
    for (let i = 1; i <= 7; i ++) {
        const d = add(_d, {
            days: i - (day || 7)
        });
        const dateStr = formatDate(d);
        result.push({
            dateStr,
            d,
            type: formatType(dateStr, d.getDay())
        });
    }
    return result.filter(v => v.type < 3);
}

const getWorkdaysByMonth = (_d) => {
    const m = _d.getMonth() + 1;
    const y = _d.getFullYear();
    const result = [];
    for (let i = 1; i <= 31; i++) {
        const month = String(m).padStart(2, '0');
        const date = String(i).padStart(2, '0');
        const dateStr = `${y}-${month}-${date}`;
        const d = new Date(dateStr);
        if (!d.getTime()) {
            break;
        }
        result.push({
            dateStr,
            d,
            type: formatType(dateStr, d.getDay()),
        })
    }
    return result.filter(v => v.type < 3);
}

const checkDateFormat = (date) => {
    if (!date) {
        return new Date();
    }
    const str = Object.prototype.toString.call(date);
    if (str === '[object Date]') {
        return date;
    }
    if (str !== '[object String]') {
        console.error(`不支持的类型: ${str}`)
        return false
    }
    // 判读是不是为字符串
    const r = date.split('-');
    if (r.length === 1) {
        return false;
    }
    if (r.length > 1 && r.length !== 3) {
        console.error(`不支持的日期格式,输入修改为new Date()`)
        return new Date();
    }
    const [y, m, d] = r;
    if (
        y.length !== 4 || +y < 2022 || m.length !== 2 || +m > 12
        || d.length !== 2 || +d > 31
    ) {
        console.error(`不支持的日期格式,输入修改为new Date()`)
        return new Date();
    }
    try {
        return new Date(date);
    } catch (e) {
        return false;
    }
}

const getWorkdays = (date, dateType = 'week') => {
    let _d = checkDateFormat(date);
    if (!_d || !_d.getTime()) {
        dateType = date;
        _d = new Date();
    }
    let workdays = [];
    switch (dateType) {
        case 'w':
        case 'W':
        case 'week':
        case 'Week':
            workdays = getWorkdaysByWeek(_d);
            break;
        case 'm':
        case 'M':
        case 'month':
        case 'Month':
            workdays = getWorkdaysByMonth(_d);
            break;
        default:
            workdays = getWorkdaysByWeek(_d);
            break;
    }
    return workdays;
}

const isWorkday = (date) => {
    const t = Object.prototype.toString.call(date);
    let dateStr = date, _d = null;
    switch (t) {
        case '[object String]':
            _d = new Date(date);
            break;
        case '[object Date]':
            dateStr = formatDate(date);
            _d = date;
            break;
        default:
            _d = new Date();
            dateStr = formatDate(_d);
            break;
    }
    return formatType(dateStr, _d.getDay()) < 3;
};

export default {
    isWorkday,
    getWorkdays,
}