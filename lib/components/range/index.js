import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from '@tarojs/components';
import { delayQuerySelector, getEventDetail, mergeStyle } from '../../common/utils';
export default class AtRange extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = (event) => {
            if (this.currentSlider && !this.props.disabled) {
                let sliderValue = 0;
                const detail = getEventDetail(event);
                sliderValue = detail.x - this.left;
                this.setSliderValue(this.currentSlider, sliderValue, 'onChange');
            }
        };
        const { min = 0, max = 100 } = props;
        // range 宽度
        this.width = 0;
        // range 到屏幕左边的距离
        this.left = 0;
        this.deltaValue = max - min;
        this.currentSlider = '';
        this.state = {
            aX: 0,
            bX: 0
        };
    }
    handleTouchMove(sliderName, event) {
        if (this.props.disabled)
            return;
        event.stopPropagation();
        const clientX = event.touches[0].clientX;
        this.setSliderValue(sliderName, clientX - this.left, 'onChange');
    }
    handleTouchEnd(sliderName) {
        if (this.props.disabled)
            return;
        this.currentSlider = sliderName;
        this.triggerEvent('onAfterChange');
    }
    setSliderValue(sliderName, targetValue, funcName) {
        const distance = Math.min(Math.max(targetValue, 0), this.width);
        const sliderValue = Math.floor((distance / this.width) * 100);
        if (funcName) {
            this.setState({
                [sliderName]: sliderValue
            }, () => this.triggerEvent(funcName));
        }
        else {
            this.setState({
                [sliderName]: sliderValue
            });
        }
    }
    setValue(value) {
        const { min = 0 } = this.props;
        const aX = Math.round(((value[0] - min) / this.deltaValue) * 100); // fix issue #670
        const bX = Math.round(((value[1] - min) / this.deltaValue) * 100); // fix issue #670
        this.setState({ aX, bX });
    }
    triggerEvent(funcName) {
        const { min = 0 } = this.props;
        const { aX, bX } = this.state;
        const a = Math.round((aX / 100) * this.deltaValue) + min; // fix issue #670
        const b = Math.round((bX / 100) * this.deltaValue) + min; // fix issue #670
        const result = [a, b].sort((x, y) => x - y);
        if (funcName === 'onChange') {
            this.props.onChange && this.props.onChange(result);
        }
        else if (funcName === 'onAfterChange') {
            this.props.onAfterChange && this.props.onAfterChange(result);
        }
    }
    updatePos() {
        delayQuerySelector('.at-range__container', 0).then(rect => {
            var _a, _b;
            this.width = Math.round((_a = rect[0]) === null || _a === void 0 ? void 0 : _a.width);
            this.left = Math.round((_b = rect[0]) === null || _b === void 0 ? void 0 : _b.left);
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        var _a, _b;
        const { value = [] } = nextProps;
        this.updatePos();
        if (((_a = this.props.value) === null || _a === void 0 ? void 0 : _a[0]) !== (value === null || value === void 0 ? void 0 : value[0]) ||
            ((_b = this.props.value) === null || _b === void 0 ? void 0 : _b[1]) !== (value === null || value === void 0 ? void 0 : value[1])) {
            this.setValue(value);
        }
    }
    componentDidMount() {
        const { value = [] } = this.props;
        this.updatePos();
        this.setValue(value);
    }
    render() {
        const { className, customStyle, sliderStyle = {}, railStyle = {}, trackStyle = {}, blockSize, disabled } = this.props;
        const rootCls = classNames('at-range', {
            'at-range--disabled': disabled
        }, className);
        const { aX, bX } = this.state;
        const sliderCommonStyle = {
            width: blockSize ? `${blockSize}PX` : '',
            height: blockSize ? `${blockSize}PX` : '',
            marginLeft: blockSize ? `${-blockSize / 2}PX` : ''
        };
        const sliderAStyle = Object.assign(Object.assign({}, sliderCommonStyle), { left: `${aX}%` });
        const sliderBStyle = Object.assign(Object.assign({}, sliderCommonStyle), { left: `${bX}%` });
        const containerStyle = {
            height: blockSize ? `${blockSize}PX` : ''
        };
        const smallerX = Math.min(aX, bX);
        const deltaX = Math.abs(aX - bX);
        const atTrackStyle = {
            left: `${smallerX}%`,
            width: `${deltaX}%`
        };
        return (React.createElement(View, { className: rootCls, style: customStyle, onClick: this.handleClick },
            React.createElement(View, { className: 'at-range__container', style: containerStyle },
                React.createElement(View, { className: 'at-range__rail', style: railStyle }),
                React.createElement(View, { className: 'at-range__track', style: mergeStyle(atTrackStyle, trackStyle) }),
                React.createElement(View, { className: 'at-range__slider', style: mergeStyle(sliderAStyle, sliderStyle), onTouchMove: this.handleTouchMove.bind(this, 'aX'), onTouchEnd: this.handleTouchEnd.bind(this, 'aX') }),
                React.createElement(View, { className: 'at-range__slider', style: mergeStyle(sliderBStyle, sliderStyle), onTouchMove: this.handleTouchMove.bind(this, 'bX'), onTouchEnd: this.handleTouchEnd.bind(this, 'bX') }))));
    }
}
AtRange.defaultProps = {
    customStyle: '',
    className: '',
    sliderStyle: '',
    railStyle: '',
    trackStyle: '',
    value: [0, 0],
    min: 0,
    max: 100,
    disabled: false,
    blockSize: 0
};
AtRange.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    sliderStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    railStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    trackStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    value: PropTypes.array,
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    blockSize: PropTypes.number,
    onChange: PropTypes.func,
    onAfterChange: PropTypes.func
};
//# sourceMappingURL=index.js.map