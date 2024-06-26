import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Input, Text, View } from '@tarojs/components';
export default class AtSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFocus = (event) => {
            this.setState({
                isFocus: true
            });
            this.props.onFocus && this.props.onFocus(event);
        };
        this.handleBlur = (event) => {
            this.setState({
                isFocus: false
            });
            this.props.onBlur && this.props.onBlur(event);
        };
        this.handleChange = (e) => {
            this.props.onChange(e.detail.value, e);
        };
        this.handleClear = (event) => {
            if (this.props.onClear) {
                this.props.onClear(event);
            }
            else {
                this.props.onChange('', event);
            }
        };
        this.handleConfirm = (event) => {
            this.props.onConfirm && this.props.onConfirm(event);
        };
        this.handleActionClick = (event) => {
            this.props.onActionClick && this.props.onActionClick(event);
        };
        this.state = {
            isFocus: !!props.focus
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.focus !== this.props.focus) {
            this.setState({ isFocus: !!nextProps.focus });
        }
    }
    render() {
        const { value, placeholder, maxLength, fixed, disabled, showActionButton, actionName = '搜索', inputType, // 处理issue#464
        className, customStyle, enableNative } = this.props;
        const { isFocus } = this.state;
        const fontSize = 14;
        const rootCls = classNames('at-search-bar', {
            'at-search-bar--fixed': fixed
        }, className);
        const placeholderWrapStyle = {};
        const actionStyle = {};
        if (isFocus || (!isFocus && value)) {
            actionStyle.opacity = 1;
            actionStyle.marginRight = `0`;
            placeholderWrapStyle.flexGrow = 0;
        }
        else if (!isFocus && !value) {
            placeholderWrapStyle.flexGrow = 1;
            actionStyle.opacity = 0;
            actionStyle.marginRight = `-${(actionName.length + 1) * fontSize + fontSize / 2 + 10}px`;
        }
        if (showActionButton) {
            actionStyle.opacity = 1;
            actionStyle.marginRight = `0`;
        }
        const clearIconStyle = { display: 'flex' };
        const placeholderStyle = { visibility: 'hidden' };
        if (!value.length) {
            clearIconStyle.display = 'none';
            placeholderStyle.visibility = 'visible';
        }
        return (React.createElement(View, { className: rootCls, style: customStyle },
            React.createElement(View, { className: 'at-search-bar__input-cnt' },
                React.createElement(View, { className: 'at-search-bar__placeholder-wrap', style: placeholderWrapStyle },
                    React.createElement(Text, { className: 'at-icon at-icon-search' }),
                    React.createElement(Text, { className: 'at-search-bar__placeholder', style: placeholderStyle }, isFocus ? '' : placeholder)),
                React.createElement(Input, { className: 'at-search-bar__input', type: inputType, confirmType: 'search', value: value, focus: isFocus, disabled: disabled, maxlength: maxLength, 
                    // @ts-ignore ci 上面这个检查不通过, 暂时跳过ts检查
                    enableNative: enableNative, onInput: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur, onConfirm: this.handleConfirm }),
                React.createElement(View, { className: 'at-search-bar__clear', style: clearIconStyle, onTouchStart: this.handleClear },
                    React.createElement(Text, { className: 'at-icon at-icon-close-circle' }))),
            React.createElement(View, { className: 'at-search-bar__action', style: actionStyle, onClick: this.handleActionClick }, actionName)));
    }
}
AtSearchBar.defaultProps = {
    value: '',
    placeholder: '搜索',
    maxLength: 140,
    fixed: false,
    focus: false,
    disabled: false,
    showActionButton: false,
    actionName: '搜索',
    inputType: 'text',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => { },
    enableNative: true
};
AtSearchBar.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    fixed: PropTypes.bool,
    focus: PropTypes.bool,
    disabled: PropTypes.bool,
    showActionButton: PropTypes.bool,
    actionName: PropTypes.string,
    inputType: PropTypes.oneOf(['text', 'number', 'idcard', 'digit']),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onConfirm: PropTypes.func,
    onActionClick: PropTypes.func,
    onClear: PropTypes.func,
    enableNative: PropTypes.bool
};
//# sourceMappingURL=index.js.map