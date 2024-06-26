import classNames from 'classnames';
import _chunk from 'lodash/chunk';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text, View } from '@tarojs/components';
import { mergeStyle } from '../../common/utils';
export default class AtGrid extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = (item, index, row, event) => {
            const { onClick, columnNum = 3 } = this.props;
            if (typeof onClick === 'function') {
                const clickIndex = row * columnNum + index;
                onClick(item, clickIndex, event);
            }
        };
    }
    render() {
        const { data, mode, columnNum = 3, hasBorder } = this.props;
        if (Array.isArray(data) && data.length === 0) {
            return null;
        }
        const gridGroup = _chunk(data, columnNum);
        const bodyClass = classNames(['at-grid__flex-item', 'at-grid-item', `at-grid-item--${mode}`], {
            'at-grid-item--no-border': !hasBorder
        });
        return (React.createElement(View, { className: classNames('at-grid', this.props.className) }, gridGroup.map((item, i) => (React.createElement(View, { className: 'at-grid__flex', key: `at-grid-group-${i}` }, item.map((childItem, index) => (React.createElement(View, { key: `at-grid-item-${index}`, className: classNames(bodyClass, {
                'at-grid-item--last': index === columnNum - 1
            }), onClick: this.handleClick.bind(this, childItem, index, i), style: {
                flex: `0 0 ${100 / columnNum}%`
            } },
            React.createElement(View, { className: 'at-grid-item__content' },
                React.createElement(View, { className: 'at-grid-item__content-inner' },
                    React.createElement(View, { className: 'content-inner__icon' },
                        childItem.image && (React.createElement(Image, { className: 'content-inner__img', src: childItem.image, mode: 'scaleToFill' })),
                        childItem.iconInfo && !childItem.image && (React.createElement(Text, { className: classNames(childItem.iconInfo.prefixClass || 'at-icon', {
                                [`${childItem.iconInfo.prefixClass || 'at-icon'}-${childItem.iconInfo.value}`]: childItem.iconInfo.value
                            }, childItem.iconInfo.className), style: mergeStyle({
                                color: childItem.iconInfo.color,
                                fontSize: `${childItem.iconInfo.size || 24}px`
                            }, 
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            childItem.iconInfo.customStyle) }))),
                    React.createElement(Text, { className: 'content-inner__text' }, childItem.value)))))))))));
    }
}
AtGrid.defaultProps = {
    data: [],
    columnNum: 3,
    mode: 'square',
    hasBorder: true
};
AtGrid.propTypes = {
    mode: PropTypes.string,
    onClick: PropTypes.func,
    hasBorder: PropTypes.bool,
    columnNum: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string,
        value: PropTypes.string,
        iconInfo: PropTypes.shape({
            size: PropTypes.number,
            value: PropTypes.string,
            color: PropTypes.string,
            prefixClass: PropTypes.string,
            customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
            className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
        })
    }))
};
//# sourceMappingURL=index.js.map