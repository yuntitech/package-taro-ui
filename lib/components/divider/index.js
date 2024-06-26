import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from '@tarojs/components';
import { mergeStyle, pxTransform } from '../../common/utils';
export default class AtDivider extends React.Component {
    render() {
        const { className, customStyle, content, height, fontColor, fontSize, lineColor } = this.props;
        const rootStyle = {
            height: height ? `${pxTransform(Number(height))}` : ''
        };
        const fontStyle = {
            color: fontColor,
            fontSize: fontSize ? `${pxTransform(Number(fontSize))}` : ''
        };
        const lineStyle = {
            backgroundColor: lineColor
        };
        return (React.createElement(View, { className: classNames('at-divider', className), style: mergeStyle(rootStyle, customStyle) },
            React.createElement(View, { className: 'at-divider__content', style: fontStyle }, content === '' ? this.props.children : content),
            React.createElement(View, { className: 'at-divider__line', style: lineStyle })));
    }
}
AtDivider.defaultProps = {
    content: '',
    height: 0,
    fontColor: '',
    fontSize: 0,
    lineColor: ''
};
AtDivider.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    content: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fontColor: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lineColor: PropTypes.string
};
//# sourceMappingURL=index.js.map