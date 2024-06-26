import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import AtLoading from '../loading/index';
const SIZE_CLASS = {
    normal: 'normal',
    small: 'small'
};
const TYPE_CLASS = {
    primary: 'primary',
    secondary: 'secondary'
};
export default class AtButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
            isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
            isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
        };
    }
    onClick(event) {
        if (!this.props.disabled) {
            this.props.onClick && this.props.onClick(event);
        }
    }
    onGetUserInfo(event) {
        this.props.onGetUserInfo && this.props.onGetUserInfo(event);
    }
    onContact(event) {
        this.props.onContact && this.props.onContact(event);
    }
    onGetPhoneNumber(event) {
        this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(event);
    }
    onError(event) {
        this.props.onError && this.props.onError(event);
    }
    onOpenSetting(event) {
        this.props.onOpenSetting && this.props.onOpenSetting(event);
    }
    render() {
        const { size = 'normal', type = '', circle, full, loading, disabled, customStyle, formType, openType, lang, sessionFrom, sendMessageTitle, sendMessagePath, sendMessageImg, showMessageCard, appParameter } = this.props;
        const { isWEAPP, isALIPAY, isWEB } = this.state;
        const rootClassName = ['at-button'];
        const classObject = {
            [`at-button--${SIZE_CLASS[size]}`]: SIZE_CLASS[size],
            'at-button--disabled': disabled,
            [`at-button--${type}`]: TYPE_CLASS[type],
            'at-button--circle': circle,
            'at-button--full': full
        };
        const loadingColor = type === 'primary' ? '#fff' : '';
        const loadingSize = size === 'small' ? '30' : 0;
        let loadingComponent = null;
        if (loading) {
            loadingComponent = (React.createElement(View, { className: 'at-button__icon' },
                React.createElement(AtLoading, { color: loadingColor, size: loadingSize })));
            rootClassName.push('at-button--icon');
        }
        const webButton = (React.createElement(Button, { className: 'at-button__wxbutton', lang: lang, formType: formType }));
        const button = (React.createElement(Button, { className: 'at-button__wxbutton', formType: formType, openType: openType, lang: lang, sessionFrom: sessionFrom, sendMessageTitle: sendMessageTitle, sendMessagePath: sendMessagePath, sendMessageImg: sendMessageImg, showMessageCard: showMessageCard, appParameter: appParameter, onGetUserInfo: this.onGetUserInfo.bind(this), onGetPhoneNumber: this.onGetPhoneNumber.bind(this), onOpenSetting: this.onOpenSetting.bind(this), onError: this.onError.bind(this), onContact: this.onContact.bind(this) }));
        return (React.createElement(View, { className: classNames(rootClassName, classObject, this.props.className), style: customStyle, onClick: this.onClick.bind(this) },
            isWEB && !disabled && webButton,
            isWEAPP && !disabled && button,
            isALIPAY && !disabled && button,
            loadingComponent,
            React.createElement(View, { className: 'at-button__text' }, this.props.children)));
    }
}
AtButton.defaultProps = {
    size: 'normal',
    circle: false,
    full: false,
    loading: false,
    disabled: false,
    customStyle: {},
    // Button props
    lang: 'en',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    appParameter: ''
};
AtButton.propTypes = {
    size: PropTypes.oneOf(['normal', 'small']),
    type: PropTypes.oneOf(['primary', 'secondary', '']),
    circle: PropTypes.bool,
    full: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    formType: PropTypes.oneOf(['submit', 'reset', '']),
    openType: PropTypes.oneOf([
        'contact',
        'share',
        'getUserInfo',
        'getPhoneNumber',
        'launchApp',
        'openSetting',
        'feedback',
        'getRealnameAuthInfo',
        'getAuthorize',
        'contactShare',
        ''
    ]),
    lang: PropTypes.string,
    sessionFrom: PropTypes.string,
    sendMessageTitle: PropTypes.string,
    sendMessagePath: PropTypes.string,
    sendMessageImg: PropTypes.string,
    showMessageCard: PropTypes.bool,
    appParameter: PropTypes.string,
    onGetUserInfo: PropTypes.func,
    onContact: PropTypes.func,
    onGetPhoneNumber: PropTypes.func,
    onError: PropTypes.func,
    onOpenSetting: PropTypes.func
};
//# sourceMappingURL=index.js.map