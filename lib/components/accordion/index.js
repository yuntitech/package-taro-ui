import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from '@tarojs/components';
import { delayQuerySelector, uuid } from '../../common/utils';
export default class AtAccordion extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = (event) => {
            const { open } = this.props;
            if (!this.isCompleted)
                return;
            this.props.onClick && this.props.onClick(!open, event);
        };
        this.isCompleted = true;
        this.startOpen = false;
        this.state = {
            componentId: uuid(),
            wrapperHeight: 0
        };
    }
    toggleWithAnimation() {
        const { open, isAnimation } = this.props;
        const { componentId } = this.state;
        if (!this.isCompleted || !isAnimation)
            return;
        this.isCompleted = false;
        delayQuerySelector(`#at-accordion__body-${componentId}`, 0).then(rect => {
            const height = parseInt(rect[0].height.toString());
            const startHeight = open ? height : 0;
            const endHeight = open ? 0 : height;
            this.startOpen = false;
            this.setState({
                wrapperHeight: startHeight
            }, () => {
                setTimeout(() => {
                    this.setState({
                        wrapperHeight: endHeight
                    }, () => {
                        setTimeout(() => {
                            this.isCompleted = true;
                            this.setState({});
                        }, 700);
                    });
                }, 100);
            });
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.props.open) {
            this.startOpen = !!nextProps.open && !!nextProps.isAnimation;
            this.toggleWithAnimation();
        }
    }
    render() {
        const { customStyle, className, title, icon, hasBorder, open, note } = this.props;
        const { wrapperHeight } = this.state;
        const rootCls = classNames('at-accordion', className);
        const prefixClass = (icon && icon.prefixClass) || 'at-icon';
        const iconCls = classNames({
            [prefixClass]: true,
            [`${prefixClass}-${icon && icon.value}`]: icon && icon.value,
            'at-accordion__icon': true
        });
        const headerCls = classNames('at-accordion__header', {
            'at-accordion__header--noborder': !hasBorder
        });
        const arrowCls = classNames('at-accordion__arrow', {
            'at-accordion__arrow--folded': !!open
        });
        const contentCls = classNames('at-accordion__content', {
            'at-accordion__content--inactive': (!open && this.isCompleted) || this.startOpen
        });
        const iconStyle = {
            color: (icon && icon.color) || '',
            fontSize: (icon && `${icon.size}px`) || ''
        };
        const contentStyle = { height: `${wrapperHeight}px` };
        if (this.isCompleted) {
            contentStyle.height = '';
        }
        const { componentId } = this.state;
        return (React.createElement(View, { className: rootCls, style: customStyle },
            React.createElement(View, { className: headerCls, onClick: this.handleClick },
                icon && icon.value && (React.createElement(Text, { className: iconCls, style: iconStyle })),
                React.createElement(View, { className: 'at-accordion__info' },
                    React.createElement(View, { className: 'at-accordion__info__title' }, title),
                    React.createElement(View, { className: 'at-accordion__info__note' }, note)),
                React.createElement(View, { className: arrowCls },
                    React.createElement(Text, { className: 'at-icon at-icon-chevron-down' }))),
            React.createElement(View, { style: contentStyle, className: contentCls },
                React.createElement(View, { id: `at-accordion__body-${componentId}`, className: 'at-accordion__body' }, this.props.children))));
    }
}
AtAccordion.defaultProps = {
    open: false,
    customStyle: '',
    className: '',
    title: '',
    note: '',
    icon: { value: '' },
    hasBorder: true,
    isAnimation: true
};
AtAccordion.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    open: PropTypes.bool,
    isAnimation: PropTypes.bool,
    title: PropTypes.string,
    note: PropTypes.string,
    icon: PropTypes.object,
    hasBorder: PropTypes.bool,
    onClick: PropTypes.func
};
//# sourceMappingURL=index.js.map