import dayjs from 'dayjs';
import _flow from 'lodash/flow';
import * as constant from './constant';
import plugins from './plugins';
const TOTAL = 7 * 6;
function getFullItem(item, options, selectedDate, isShowStatus) {
    if (options.marks.find(x => x.value === item.value)) {
        item.marks = [
            {
                value: item.value
            }
        ];
    }
    if (!isShowStatus)
        return item;
    const bindedPlugins = plugins.map(fn => fn.bind(null, {
        options,
        selectedDate
    }));
    return _flow(bindedPlugins)(item);
}
export default function generateCalendarGroup(options) {
    return function (generateDate, selectedDate, isShowStatus) {
        const date = dayjs(generateDate);
        const { format } = options;
        // 获取生成日期的第一天 和 最后一天
        const firstDate = date.startOf('month');
        const lastDate = date.endOf('month');
        const preMonthDate = date.subtract(1, 'month');
        const list = [];
        const nowMonthDays = date.daysInMonth(); // 获取这个月有多少天
        const preMonthLastDay = preMonthDate.endOf('month').day(); // 获取上个月最后一天是周几
        // 生成上个月的日期
        for (let i = 1; i <= preMonthLastDay + 1; i++) {
            const thisDate = firstDate.subtract(i, 'day').startOf('day');
            let item = {
                marks: [],
                _value: thisDate,
                text: thisDate.date(),
                type: constant.TYPE_PRE_MONTH,
                value: thisDate.format(format)
            };
            item = getFullItem(item, options, selectedDate, isShowStatus);
            list.push(item);
        }
        list.reverse();
        // 生成这个月的日期
        for (let i = 0; i < nowMonthDays; i++) {
            const thisDate = firstDate.add(i, 'day').startOf('day');
            let item = {
                marks: [],
                _value: thisDate,
                text: thisDate.date(),
                type: constant.TYPE_NOW_MONTH,
                value: thisDate.format(format)
            };
            item = getFullItem(item, options, selectedDate, isShowStatus);
            list.push(item);
        }
        // 生成下个月的日期
        let i = 1;
        while (list.length < TOTAL) {
            const thisDate = lastDate.add(i++, 'day').startOf('day');
            let item = {
                marks: [],
                _value: thisDate,
                text: thisDate.date(),
                type: constant.TYPE_NEXT_MONTH,
                value: thisDate.format(format)
            };
            item = getFullItem(item, options, selectedDate, isShowStatus);
            list.push(item);
        }
        return {
            list,
            value: generateDate
        };
    };
}
export function getGenerateDate(date) {
    return dayjs(date).startOf('month');
}
//# sourceMappingURL=helper.js.map