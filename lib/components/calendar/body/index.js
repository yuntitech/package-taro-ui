import classnames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { Swiper, SwiperItem, View } from '@tarojs/components';
import { delayQuerySelector } from '../../../common/utils';
import generateCalendarGroup from '../common/helper';
import AtCalendarDateList from '../ui/date-list/index';
import AtCalendarDayList from '../ui/day-list/index';
const ANIMTE_DURATION = 300;
const defaultProps = {
    marks: [],
    selectedDate: {
        end: Date.now(),
        start: Date.now()
    },
    format: 'YYYY-MM-DD',
    generateDate: Date.now()
};
export default class AtCalendarBody extends React.Component {
    constructor(props) {
        super(props);
        this.changeCount = 0;
        this.currentSwiperIndex = 1;
        this.startX = 0;
        this.swipeStartPoint = 0;
        this.isPreMonth = false;
        this.maxWidth = 0;
        this.isTouching = false;
        this.getGroups = (generateDate, selectedDate) => {
            const dayjsDate = dayjs(generateDate);
            const arr = [];
            const preList = this.generateFunc(dayjsDate.subtract(1, 'month').valueOf(), selectedDate);
            const nowList = this.generateFunc(generateDate, selectedDate, true);
            const nextList = this.generateFunc(dayjsDate.add(1, 'month').valueOf(), selectedDate);
            const preListIndex = this.currentSwiperIndex === 0 ? 2 : this.currentSwiperIndex - 1;
            const nextListIndex = this.currentSwiperIndex === 2 ? 0 : this.currentSwiperIndex + 1;
            arr[preListIndex] = preList;
            arr[nextListIndex] = nextList;
            arr[this.currentSwiperIndex] = nowList;
            return arr;
        };
        this.handleTouchStart = (e) => {
            if (!this.props.isSwiper) {
                return;
            }
            this.isTouching = true;
            this.startX = e.touches[0].clientX;
        };
        this.handleTouchMove = (e) => {
            if (!this.props.isSwiper) {
                return;
            }
            if (!this.isTouching)
                return;
            const { clientX } = e.touches[0];
            const offsetSize = clientX - this.startX;
            this.setState({
                offsetSize
            });
        };
        this.animateMoveSlide = (offset, callback) => {
            this.setState({
                isAnimate: true
            }, () => {
                this.setState({
                    offsetSize: offset
                });
                setTimeout(() => {
                    this.setState({
                        isAnimate: false
                    }, () => {
                        callback === null || callback === void 0 ? void 0 : callback();
                    });
                }, ANIMTE_DURATION);
            });
        };
        this.handleTouchEnd = () => {
            if (!this.props.isSwiper) {
                return;
            }
            const { offsetSize } = this.state;
            this.isTouching = false;
            const isRight = offsetSize > 0;
            const breakpoint = this.maxWidth / 2;
            const absOffsetSize = Math.abs(offsetSize);
            if (absOffsetSize > breakpoint) {
                const res = isRight ? this.maxWidth : -this.maxWidth;
                return this.animateMoveSlide(res, () => {
                    this.props.onSwipeMonth(isRight ? -1 : 1);
                });
            }
            this.animateMoveSlide(0);
        };
        this.handleChange = (e) => {
            const { current, source } = e.detail;
            if (source === 'touch') {
                this.currentSwiperIndex = current;
                this.changeCount += 1;
            }
        };
        this.handleAnimateFinish = () => {
            if (this.changeCount > 0) {
                this.props.onSwipeMonth(this.isPreMonth ? -this.changeCount : this.changeCount);
                this.changeCount = 0;
            }
        };
        this.handleSwipeTouchStart = (e) => {
            const { clientY, clientX } = e.changedTouches[0];
            this.swipeStartPoint = this.props.isVertical ? clientY : clientX;
        };
        this.handleSwipeTouchEnd = (e) => {
            const { clientY, clientX } = e.changedTouches[0];
            this.isPreMonth = this.props.isVertical
                ? clientY - this.swipeStartPoint > 0
                : clientX - this.swipeStartPoint > 0;
        };
        const { validDates, marks, format, minDate, maxDate, generateDate, selectedDate, selectedDates } = props;
        this.generateFunc = generateCalendarGroup({
            validDates,
            format,
            minDate,
            maxDate,
            marks,
            selectedDates
        });
        const listGroup = this.getGroups(generateDate, selectedDate);
        this.state = {
            listGroup,
            offsetSize: 0,
            isAnimate: false
        };
    }
    componentDidMount() {
        delayQuerySelector('.at-calendar-slider__main').then(res => {
            this.maxWidth = res[0].width;
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { validDates, marks, format, minDate, maxDate, generateDate, selectedDate, selectedDates } = nextProps;
        this.generateFunc = generateCalendarGroup({
            validDates,
            format,
            minDate,
            maxDate,
            marks,
            selectedDates
        });
        const listGroup = this.getGroups(generateDate, selectedDate);
        this.setState({
            offsetSize: 0,
            listGroup
        });
    }
    render() {
        const { isSwiper, formatter } = this.props;
        const { isAnimate, offsetSize, listGroup } = this.state;
        if (!isSwiper) {
            return (React.createElement(View, { className: classnames('main', 'at-calendar-slider__main', `at-calendar-slider__main--${process.env.TARO_ENV}`) },
                React.createElement(AtCalendarDayList, null),
                React.createElement(View, { className: 'main__body body' },
                    React.createElement(View, { className: 'body__slider body__slider--now' },
                        React.createElement(AtCalendarDateList, { formatter: formatter, list: listGroup[1].list, onClick: this.props.onDayClick, onLongClick: this.props.onLongClick })))));
        }
        /* 需要 Taro 组件库维护 Swiper 使 小程序 和 H5 的表现保持一致  */
        if (process.env.TARO_ENV === 'h5') {
            return (React.createElement(View, { className: classnames('main', 'at-calendar-slider__main', `at-calendar-slider__main--${process.env.TARO_ENV}`), onTouchEnd: this.handleTouchEnd, onTouchMove: this.handleTouchMove, onTouchStart: this.handleTouchStart },
                React.createElement(AtCalendarDayList, null),
                React.createElement(View, { className: classnames('main__body  body', {
                        'main__body--slider': isSwiper,
                        'main__body--animate': isAnimate
                    }), style: {
                        transform: isSwiper
                            ? `translateX(-100%) translate3d(${offsetSize},0,0)`
                            : '',
                        WebkitTransform: isSwiper
                            ? `translateX(-100%) translate3d(${offsetSize}px,0,0)`
                            : ''
                    } },
                    React.createElement(View, { className: 'body__slider body__slider--pre' },
                        React.createElement(AtCalendarDateList, { list: listGroup[0].list, formatter: formatter })),
                    React.createElement(View, { className: 'body__slider body__slider--now' },
                        React.createElement(AtCalendarDateList, { list: listGroup[1].list, onClick: this.props.onDayClick, onLongClick: this.props.onLongClick, formatter: formatter })),
                    React.createElement(View, { className: 'body__slider body__slider--next' },
                        React.createElement(AtCalendarDateList, { list: listGroup[2].list, formatter: formatter })))));
        }
        return (React.createElement(View, { className: classnames('main', 'at-calendar-slider__main', `at-calendar-slider__main--${process.env.TARO_ENV}`) },
            React.createElement(AtCalendarDayList, null),
            React.createElement(Swiper, { circular: true, current: 1, skipHiddenItemLayout: true, className: classnames('main__body'), onChange: this.handleChange, vertical: this.props.isVertical, onAnimationFinish: this.handleAnimateFinish, onTouchEnd: this.handleSwipeTouchEnd, onTouchStart: this.handleSwipeTouchStart }, listGroup.map((item, key) => (React.createElement(SwiperItem, { key: key, itemId: key.toString() },
                React.createElement(AtCalendarDateList, { formatter: formatter, list: item.list, onClick: this.props.onDayClick, onLongClick: this.props.onLongClick })))))));
    }
}
AtCalendarBody.defaultProps = defaultProps;
//# sourceMappingURL=index.js.map