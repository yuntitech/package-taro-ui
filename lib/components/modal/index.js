import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { handleTouchScroll } from '../../common/utils';
import AtModalAction from './action/index';
import AtModalContent from './content/index';
import AtModalHeader from './header/index';
export default class AtModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOverlay = () => {
            if (this.props.closeOnClickOverlay) {
                this.setState({
                    _isOpened: false
                }, this.handleClose);
            }
        };
        this.handleClose = (event) => {
            if (typeof this.props.onClose === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.props.onClose(event);
            }
        };
        this.handleCancel = (event) => {
            if (typeof this.props.onCancel === 'function') {
                this.props.onCancel(event);
            }
        };
        this.handleConfirm = (event) => {
            if (typeof this.props.onConfirm === 'function') {
                this.props.onConfirm(event);
            }
        };
        this.handleTouchMove = (e) => {
            e.stopPropagation();
        };
        const { isOpened } = props;
        this.state = {
            _isOpened: isOpened,
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
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
        const { _isOpened, isWEB } = this.state;
        const { title, content, cancelText, confirmText } = this.props;
        const rootClass = classNames('at-modal', {
            'at-modal--active': _isOpened
        }, this.props.className);
        if (title || content) {
            const isRenderAction = cancelText || confirmText;
            return (React.createElement(View, { className: rootClass },
                React.createElement(View, { onClick: this.handleClickOverlay, className: 'at-modal__overlay' }),
                React.createElement(View, { className: 'at-modal__container' },
                    title && (React.createElement(AtModalHeader, null,
                        React.createElement(Text, null, title))),
                    content && (React.createElement(AtModalContent, null,
                        React.createElement(View, { className: 'content-simple' }, isWEB ? (React.createElement(Text, { dangerouslySetInnerHTML: {
                                __html: content.replace(/\\n/g, '<br/>')
                            } })) : (React.createElement(Text, null, content))))),
                    isRenderAction && (React.createElement(AtModalAction, { isSimple: true },
                        cancelText && (React.createElement(Button, { onClick: this.handleCancel }, cancelText)),
                        confirmText && (React.createElement(Button, { onClick: this.handleConfirm }, confirmText)))))));
        }
        return (React.createElement(View, { onTouchMove: this.handleTouchMove, className: rootClass },
            React.createElement(View, { className: 'at-modal__overlay', onClick: this.handleClickOverlay }),
            React.createElement(View, { className: 'at-modal__container' }, this.props.children)));
    }
}
AtModal.defaultProps = {
    isOpened: false,
    closeOnClickOverlay: true
};
AtModal.propTypes = {
    title: PropTypes.string,
    isOpened: PropTypes.bool,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    content: PropTypes.string,
    closeOnClickOverlay: PropTypes.bool,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string
};
//# sourceMappingURL=index.js.map