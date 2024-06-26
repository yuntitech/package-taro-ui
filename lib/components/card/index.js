import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from '@tarojs/components';
export default class AtCard extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = (args) => {
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(args);
            }
        };
    }
    render() {
        const { title, note, extra, extraStyle, thumb, isFull, icon, renderIcon } = this.props;
        const rootClass = classNames('at-card', {
            'at-card--full': isFull
        }, this.props.className);
        const iconClass = classNames({
            'at-icon': true,
            [`at-icon-${icon && icon.value}`]: icon && icon.value,
            'at-card__header-icon': true
        });
        const iconStyle = {
            color: (icon && icon.color) || '',
            fontSize: (icon && `${icon.size}px`) || ''
        };
        return (React.createElement(View, { onClick: this.handleClick, className: rootClass },
            React.createElement(View, { className: 'at-card__header' },
                thumb && (React.createElement(View, { className: 'at-card__header-thumb' },
                    React.createElement(Image, { className: 'at-card__header-thumb-info', mode: 'scaleToFill', src: thumb }))),
                renderIcon || '',
                !thumb && icon && icon.value && (React.createElement(Text, { className: iconClass, style: iconStyle })),
                React.createElement(Text, { className: 'at-card__header-title' }, title),
                extra && (React.createElement(View, { style: Object.assign({}, extraStyle), className: 'at-card__header-extra' }, extra))),
            React.createElement(View, { className: 'at-card__content' },
                React.createElement(View, { className: 'at-card__content-info' }, this.props.children),
                note && React.createElement(View, { className: 'at-card__content-note' }, note))));
    }
}
AtCard.defaultProps = {
    note: '',
    isFull: false,
    thumb: '',
    title: '',
    extraStyle: {}
};
AtCard.propTypes = {
    note: PropTypes.string,
    isFull: PropTypes.bool,
    thumb: PropTypes.string,
    title: PropTypes.string,
    extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    icon: PropTypes.object,
    onClick: PropTypes.func,
    renderIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    extraStyle: PropTypes.object // 自定义extra样式
};
//# sourceMappingURL=index.js.map