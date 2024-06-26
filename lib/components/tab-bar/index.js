import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from '@tarojs/components';
import { mergeStyle } from '../../common/utils';
import AtBadge from '../badge/index';
export default class AtTabBar extends React.Component {
    // constructor () {
    //   super(...arguments)
    //   this.state = {
    //     isIPhoneX: false
    //   }
    // }
    // componentDidMount () {
    //   const curEnv = Taro.getEnv()
    //   if (
    //     curEnv === Taro.ENV_TYPE.WEAPP &&
    //     Taro.getSystemInfoSync().model.indexOf('iPhone X') >= 0
    //   ) {
    //     this.setState({ isIPhoneX: true })
    //   }
    // }
    handleClick(index, event) {
        this.props.onClick(index, event);
    }
    render() {
        const { customStyle = '', className, fixed, backgroundColor, tabList, current, color, iconSize, fontSize, selectedColor } = this.props;
        // const { isIPhoneX } = this.state
        const defaultStyle = {
            color: color || ''
        };
        const selectedStyle = {
            color: selectedColor || ''
        };
        const titleStyle = {
            fontSize: fontSize ? `${fontSize}px` : ''
        };
        const rootStyle = {
            backgroundColor: backgroundColor || ''
        };
        const imgStyle = {
            width: `${iconSize}px`,
            height: `${iconSize}px`
        };
        return (React.createElement(View, { className: classNames({
                'at-tab-bar': true,
                'at-tab-bar--fixed': fixed
                // 'at-tab-bar--ipx': isIPhoneX
            }, className), style: mergeStyle(rootStyle, customStyle) }, tabList.map((item, i) => (React.createElement(View, { className: classNames('at-tab-bar__item', {
                'at-tab-bar__item--active': current === i
            }), style: current === i ? selectedStyle : defaultStyle, key: i, onClick: this.handleClick.bind(this, i) },
            item.iconType ? (React.createElement(AtBadge, { dot: !!item.dot, value: item.text, maxValue: Number(item.max) },
                React.createElement(View, { className: 'at-tab-bar__icon' },
                    React.createElement(Text, { className: classNames(`${item.iconPrefixClass || 'at-icon'}`, {
                            [`${item.iconPrefixClass || 'at-icon'}-${item.selectedIconType}`]: current === i && item.selectedIconType,
                            [`${item.iconPrefixClass || 'at-icon'}-${item.iconType}`]: !(current === i && item.selectedIconType)
                        }), style: {
                            color: current === i ? selectedColor : color,
                            fontSize: iconSize ? `${iconSize}px` : ''
                        } })))) : null,
            item.image ? (React.createElement(AtBadge, { dot: !!item.dot, value: item.text, maxValue: Number(item.max) },
                React.createElement(View, { className: 'at-tab-bar__icon' },
                    React.createElement(Image, { className: classNames('at-tab-bar__inner-img', {
                            'at-tab-bar__inner-img--inactive': current !== i
                        }), mode: 'widthFix', src: item.selectedImage || item.image, style: imgStyle }),
                    React.createElement(Image, { className: classNames('at-tab-bar__inner-img', {
                            'at-tab-bar__inner-img--inactive': current === i
                        }), mode: 'widthFix', src: item.image, style: imgStyle })))) : null,
            React.createElement(View, null,
                React.createElement(AtBadge, { dot: item.iconType || item.image ? false : !!item.dot, value: item.iconType || item.image ? '' : item.text, maxValue: item.iconType || item.image ? 0 : Number(item.max) },
                    React.createElement(View, { className: 'at-tab-bar__title', style: titleStyle }, item.title))))))));
    }
}
AtTabBar.defaultProps = {
    customStyle: '',
    className: '',
    fixed: false,
    current: 0,
    tabList: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => { }
};
AtTabBar.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    fixed: PropTypes.bool,
    backgroundColor: PropTypes.string,
    current: PropTypes.number,
    iconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
    selectedColor: PropTypes.string,
    tabList: PropTypes.array,
    onClick: PropTypes.func
};
//# sourceMappingURL=index.js.map