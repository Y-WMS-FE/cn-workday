import { format, add, parse, parseISO } from 'date-fns'
import { HOLIDAYS, WEEKEND_WORKDAYS } from './holiday-source'

const formatDate = (d) => {
    return format(d, 'yyyy-MM-dd')
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
        const d = parseISO(dateStr);
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

const initDate = (d) => {
    return d ? parseISO(d) : new Date();
}

const getWorkdays = (date, dateType = 'week') => {
    const _d =initDate(date);
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
            _d = parseISO(date);
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
    getWorkdays
}