import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from '@tarojs/components';
export default class AtCheckbox extends React.Component {
    handleClick(idx) {
        const { selectedList, options } = this.props;
        const option = options[idx];
        const { disabled, value } = option;
        if (disabled)
            return;
        const selectedSet = new Set(selectedList);
        if (!selectedSet.has(value)) {
            selectedSet.add(value);
        }
        else {
            selectedSet.delete(value);
        }
        this.props.onChange([...selectedSet]);
    }
    render() {
        const { customStyle, className, options, selectedList } = this.props;
        const rootCls = classNames('at-checkbox', className);
        return (React.createElement(View, { className: rootCls, style: customStyle }, options.map((option, idx) => {
            const { value, disabled, label, desc } = option;
            const optionCls = classNames('at-checkbox__option', {
                'at-checkbox__option--disabled': disabled,
                'at-checkbox__option--selected': selectedList.includes(value)
            });
            return (React.createElement(View, { className: optionCls, key: value, onClick: this.handleClick.bind(this, idx) },
                React.createElement(View, { className: 'at-checkbox__option-wrap' },
                    React.createElement(View, { className: 'at-checkbox__option-cnt' },
                        React.createElement(View, { className: 'at-checkbox__icon-cnt' },
                            React.createElement(Text, { className: 'at-icon at-icon-check' })),
                        React.createElement(View, { className: 'at-checkbox__title' }, label)),
                    desc && React.createElement(View, { className: 'at-checkbox__desc' }, desc))));
        })));
    }
}
AtCheckbox.defaultProps = {
    customStyle: '',
    className: '',
    options: [],
    selectedList: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => { }
};
AtCheckbox.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    options: PropTypes.array,
    selectedList: PropTypes.array,
    onChange: PropTypes.func
};
//# sourceMappingURL=index.js.map