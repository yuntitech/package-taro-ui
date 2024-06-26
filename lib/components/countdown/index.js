import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from '@tarojs/components';
import AtCountdownItem from './item';
const toSeconds = (day, hours, minutes, seconds) => day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds;
const defaultFormat = {
    day: '天',
    hours: '时',
    minutes: '分',
    seconds: '秒'
};
export default class AtCountdown extends React.Component {
    constructor(props) {
        super(props);
        const { day = 0, hours = 0, minutes = 0, seconds = 0 } = this.props;
        this.seconds = toSeconds(day, hours, minutes, seconds);
        const { day: _day, hours: _hours, minutes: _minutes, seconds: _seconds } = this.calculateTime();
        this.state = {
            _day,
            _hours,
            _minutes,
            _seconds
        };
    }
    setTimer() {
        if (!this.timer)
            this.countdonwn();
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = 0;
        }
    }
    calculateTime() {
        let [day, hours, minutes, seconds] = [0, 0, 0, 0];
        if (this.seconds > 0) {
            day = this.props.isShowDay ? Math.floor(this.seconds / (60 * 60 * 24)) : 0;
            hours = this.props.isShowHour
                ? Math.floor(this.seconds / (60 * 60)) - day * 24
                : 0;
            minutes = this.props.isShowMinute
                ? Math.floor(this.seconds / 60) - day * 24 * 60 - hours * 60
                : 0;
            seconds =
                Math.floor(this.seconds) -
                    day * 24 * 60 * 60 -
                    hours * 60 * 60 -
                    minutes * 60;
        }
        return {
            day,
            hours,
            minutes,
            seconds
        };
    }
    countdonwn() {
        const { day, hours, minutes, seconds } = this.calculateTime();
        this.setState({
            _day: day,
            _hours: hours,
            _minutes: minutes,
            _seconds: seconds
        });
        this.seconds--;
        if (this.seconds < 0) {
            this.clearTimer();
            this.props.onTimeUp && this.props.onTimeUp();
            return;
        }
        this.timer = setTimeout(() => {
            this.countdonwn();
        }, 1000);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props) === JSON.stringify(nextProps))
            return;
        const { day = 0, hours = 0, minutes = 0, seconds = 0 } = nextProps;
        this.seconds = toSeconds(day, hours, minutes, seconds);
        this.clearTimer();
        this.setTimer();
    }
    componentDidMount() {
        this.setTimer();
    }
    componentWillUnmount() {
        this.clearTimer();
    }
    componentDidHide() {
        this.clearTimer();
    }
    componentDidShow() {
        this.setTimer();
    }
    render() {
        const { className, customStyle, format = defaultFormat, isCard, isShowDay, isShowHour, isShowMinute } = this.props;
        const { _day, _hours, _minutes, _seconds } = this.state;
        return (React.createElement(View, { className: classNames({
                'at-countdown': true,
                'at-countdown--card': isCard
            }, className), style: customStyle },
            isShowDay && (React.createElement(AtCountdownItem, { num: _day, separator: (format === null || format === void 0 ? void 0 : format.day) || '天' })),
            isShowHour && (React.createElement(AtCountdownItem, { num: _hours, separator: (format === null || format === void 0 ? void 0 : format.hours) || '' })),
            isShowMinute && (React.createElement(AtCountdownItem, { num: _minutes, separator: (format === null || format === void 0 ? void 0 : format.minutes) || '' })),
            React.createElement(AtCountdownItem, { num: _seconds, separator: (format === null || format === void 0 ? void 0 : format.seconds) || '' })));
    }
}
AtCountdown.defaultProps = {
    customStyle: '',
    className: '',
    isCard: false,
    isShowDay: false,
    isShowHour: true,
    isShowMinute: true,
    format: defaultFormat,
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
};
AtCountdown.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    isCard: PropTypes.bool,
    isShowDay: PropTypes.bool,
    isShowHour: PropTypes.bool,
    isShowMinute: PropTypes.bool,
    format: PropTypes.object,
    day: PropTypes.number,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    onTimeUp: PropTypes.func
};
//# sourceMappingURL=index.js.map