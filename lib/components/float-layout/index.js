import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, Text, View } from '@tarojs/components';
import { handleTouchScroll } from '../../common/utils';
export default class AtFloatLayout extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = (e) => {
            if (typeof this.props.onClose === 'function') {
                this.props.onClose(e);
            }
        };
        this.close = (e) => {
            this.setState({
                _isOpened: false
            }, () => this.handleClose(e));
        };
        this.handleTouchMove = (e) => {
            e.stopPropagation();
        };
        const { isOpened } = props;
        this.state = {
            _isOpened: isOpened
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isOpened } = nextProps;
        if (this.props.isOpened !== isOpened) {
            handleTouchScroll(isOpened);
        }
        if (isOpened !== this.state._isOpened) {
            this.setState({
                _isOpened: isOpened
            });
        }
    }
    render() {
        const { _isOpened } = this.state;
        const { title, scrollY, scrollX, scrollTop, scrollLeft, upperThreshold, lowerThreshold, scrollWithAnimation } = this.props;
        const rootClass = classNames('at-float-layout', {
            'at-float-layout--active': _isOpened
        }, this.props.className);
        return (React.createElement(View, { className: rootClass, onTouchMove: this.handleTouchMove },
            React.createElement(View, { onClick: this.close, className: 'at-float-layout__overlay' }),
            React.createElement(View, { className: 'at-float-layout__container layout' },
                title ? (React.createElement(View, { className: 'layout-header' },
                    React.createElement(Text, { className: 'layout-header__title' }, title),
                    React.createElement(View, { className: 'layout-header__btn-close', onClick: this.close }))) : null,
                React.createElement(View, { className: 'layout-body' },
                    React.createElement(ScrollView, { scrollY: scrollY, scrollX: scrollX, scrollTop: scrollTop, scrollLeft: scrollLeft, upperThreshold: upperThreshold, lowerThreshold: lowerThreshold, scrollWithAnimation: scrollWithAnimation, onScroll: this.props.onScroll, onScrollToLower: this.props.onScrollToLower, onScrollToUpper: this.props.onScrollToUpper, className: 'layout-body__content' }, this.props.children)))));
    }
}
AtFloatLayout.defaultProps = {
    title: '',
    isOpened: false,
    scrollY: true,
    scrollX: false,
    scrollWithAnimation: false
};
AtFloatLayout.propTypes = {
    title: PropTypes.string,
    isOpened: PropTypes.bool,
    scrollY: PropTypes.bool,
    scrollX: PropTypes.bool,
    scrollTop: PropTypes.number,
    scrollLeft: PropTypes.number,
    upperThreshold: PropTypes.number,
    lowerThreshold: PropTypes.number,
    scrollWithAnimation: PropTypes.bool,
    onClose: PropTypes.func,
    onScroll: PropTypes.func,
    onScrollToLower: PropTypes.func,
    onScrollToUpper: PropTypes.func
};
//# sourceMappingURL=index.js.map