import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Text } from '@tarojs/components';
import { mergeStyle, pxTransform } from '../../common/utils';
export default class AtIcon extends React.Component {
    handleClick() {
        this.props.onClick && this.props.onClick(arguments);
    }
    render() {
        const { customStyle = {}, className, prefixClass, value, size, color } = this.props;
        const rootStyle = {
            fontSize: `${pxTransform(parseInt(String(size)) * 2)}`,
            color
        };
        const iconName = value ? `${prefixClass}-${value}` : '';
        return (React.createElement(Text, { className: classNames(prefixClass, iconName, className), style: mergeStyle(rootStyle, customStyle), onClick: this.handleClick.bind(this) }));
    }
}
AtIcon.defaultProps = {
    customStyle: '',
    className: '',
    prefixClass: 'at-icon',
    value: '',
    color: '',
    size: 24
};
AtIcon.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    prefixClass: PropTypes.string,
    value: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func
};
//# sourceMappingURL=index.js.map