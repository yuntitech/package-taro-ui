import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from '@tarojs/components';
import { mergeStyle, pxTransform } from '../../common/utils';
export default class AtNavBar extends React.Component {
    handleClickLeftView(event) {
        this.props.onClickLeftIcon && this.props.onClickLeftIcon(event);
    }
    handleClickSt(event) {
        this.props.onClickRgIconSt && this.props.onClickRgIconSt(event);
    }
    handleClickNd(event) {
        this.props.onClickRgIconNd && this.props.onClickRgIconNd(event);
    }
    handleClickTitle(event) {
        this.props.onClickTitle && this.props.onClickTitle(event);
    }
    render() {
        const { customStyle, className, color, fixed, border, leftIconType, leftText, title, rightFirstIconType, rightSecondIconType } = this.props;
        const linkStyle = { color };
        const defaultIconInfo = {
            customStyle: '',
            className: '',
            prefixClass: 'at-icon',
            value: '',
            color: '',
            size: 24
        };
        const leftIconInfo = leftIconType instanceof Object
            ? Object.assign(Object.assign({}, defaultIconInfo), leftIconType) : Object.assign(Object.assign({}, defaultIconInfo), { value: leftIconType });
        const leftIconClass = classNames(leftIconInfo.prefixClass, {
            [`${leftIconInfo.prefixClass}-${leftIconInfo.value}`]: leftIconInfo.value
        }, leftIconInfo.className);
        const rightFirstIconInfo = rightFirstIconType instanceof Object
            ? Object.assign(Object.assign({}, defaultIconInfo), rightFirstIconType) : Object.assign(Object.assign({}, defaultIconInfo), { value: rightFirstIconType });
        const rightFirstIconClass = classNames(rightFirstIconInfo.prefixClass, {
            [`${rightFirstIconInfo.prefixClass}-${rightFirstIconInfo.value}`]: rightFirstIconInfo.value
        }, rightFirstIconInfo.className);
        const rightSecondIconInfo = rightSecondIconType instanceof Object
            ? Object.assign(Object.assign({}, defaultIconInfo), rightSecondIconType) : Object.assign(Object.assign({}, defaultIconInfo), { value: rightSecondIconType });
        const rightSecondIconClass = classNames(rightSecondIconInfo.prefixClass, {
            [`${rightSecondIconInfo.prefixClass}-${rightSecondIconInfo.value}`]: rightSecondIconInfo.value
        }, rightSecondIconInfo.className);
        return (React.createElement(View, { className: classNames({
                'at-nav-bar': true,
                'at-nav-bar--fixed': fixed,
                'at-nav-bar--no-border': !border
            }, className), style: customStyle },
            React.createElement(View, { className: 'at-nav-bar__left-view', onClick: this.handleClickLeftView.bind(this), style: linkStyle },
                leftIconType && (React.createElement(Text, { className: leftIconClass, style: mergeStyle({
                        color: leftIconInfo.color,
                        fontSize: `${pxTransform(parseInt(leftIconInfo.size.toString()) * 2)}`
                    }, leftIconInfo.customStyle) })),
                React.createElement(Text, { className: 'at-nav-bar__text' }, leftText)),
            React.createElement(View, { className: 'at-nav-bar__title', onClick: this.handleClickTitle.bind(this) }, title || this.props.children),
            React.createElement(View, { className: 'at-nav-bar__right-view' },
                React.createElement(View, { className: classNames({
                        'at-nav-bar__container': true,
                        'at-nav-bar__container--hide': !rightSecondIconType
                    }), style: linkStyle, onClick: this.handleClickNd.bind(this) }, rightSecondIconType && (React.createElement(Text, { className: rightSecondIconClass, style: mergeStyle({
                        color: rightSecondIconInfo.color,
                        fontSize: `${pxTransform(parseInt(rightSecondIconInfo.size.toString()) * 2)}`
                    }, rightSecondIconInfo.customStyle) }))),
                React.createElement(View, { className: classNames({
                        'at-nav-bar__container': true,
                        'at-nav-bar__container--hide': !rightFirstIconType
                    }), style: linkStyle, onClick: this.handleClickSt.bind(this) }, rightFirstIconType && (React.createElement(Text, { className: rightFirstIconClass, style: mergeStyle({
                        color: rightFirstIconInfo.color,
                        fontSize: `${pxTransform(parseInt(rightFirstIconInfo.size.toString()) * 2)}`
                    }, rightFirstIconInfo.customStyle) }))))));
    }
}
AtNavBar.defaultProps = {
    customStyle: '',
    className: '',
    fixed: false,
    border: true,
    color: '',
    leftIconType: '',
    leftText: '',
    title: '',
    rightFirstIconType: '',
    rightSecondIconType: ''
};
AtNavBar.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    fixed: PropTypes.bool,
    border: PropTypes.bool,
    color: PropTypes.string,
    leftIconType: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    leftText: PropTypes.string,
    title: PropTypes.string,
    rightFirstIconType: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    rightSecondIconType: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onClickLeftIcon: PropTypes.func,
    onClickRgIconSt: PropTypes.func,
    onClickRgIconNd: PropTypes.func,
    onClickTitle: PropTypes.func
};
//# sourceMappingURL=index.js.map