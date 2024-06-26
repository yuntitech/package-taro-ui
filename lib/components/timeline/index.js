import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from '@tarojs/components';
export default class AtTimeline extends React.Component {
    render() {
        const { pending, items, customStyle, onClickItem } = this.props;
        const rootClassName = ['at-timeline'];
        if (pending)
            rootClassName.push('at-timeline--pending');
        const rootClassObject = {
            'at-timeline--pending': pending
        };
        const itemElems = items.map((item, index) => {
            const { title = '', color, icon, content = [] } = item;
            const iconClass = classNames({
                'at-icon': true,
                [`at-icon-${icon}`]: icon
            });
            const itemRootClassName = ['at-timeline-item'];
            if (color)
                itemRootClassName.push(`at-timeline-item--${color}`);
            const dotClass = [];
            if (icon) {
                dotClass.push('at-timeline-item__icon');
            }
            else {
                dotClass.push('at-timeline-item__dot');
            }
            const handleItemClick = (index, e) => {
                onClickItem === null || onClickItem === void 0 ? void 0 : onClickItem(index, e);
            };
            return (React.createElement(View, { className: classNames(itemRootClassName), key: `at-timeline-item-${index}`, onClick: e => handleItemClick(index, e) },
                React.createElement(View, { className: 'at-timeline-item__tail' }),
                React.createElement(View, { className: classNames(dotClass) }, icon && React.createElement(Text, { className: iconClass })),
                React.createElement(View, { className: 'at-timeline-item__content' },
                    React.createElement(View, { className: 'at-timeline-item__content-item' }, title),
                    content.map((sub, subIndex) => (React.createElement(View, { className: 'at-timeline-item__content-item at-timeline-item__content--sub', key: subIndex }, sub))))));
        });
        return (React.createElement(View, { className: classNames(rootClassName, rootClassObject, this.props.className), style: customStyle }, itemElems));
    }
}
AtTimeline.defaultProps = {
    pending: false,
    items: [],
    customStyle: {}
};
AtTimeline.propTypes = {
    pending: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object),
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
//# sourceMappingURL=index.js.map