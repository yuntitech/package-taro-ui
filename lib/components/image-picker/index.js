import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { uuid } from '../../common/utils';
// 生成 jsx 二维矩阵
const generateMatrix = (files, col, showAddBtn) => {
    const matrix = [];
    const length = showAddBtn ? files.length + 1 : files.length;
    const row = Math.ceil(length / col);
    for (let i = 0; i < row; i++) {
        if (i === row - 1) {
            // 最后一行数据加上添加按钮
            const lastArr = files.slice(i * col);
            if (lastArr.length < col) {
                if (showAddBtn) {
                    lastArr.push({ type: 'btn', uuid: uuid() });
                }
                // 填补剩下的空列
                for (let j = lastArr.length; j < col; j++) {
                    lastArr.push({ type: 'blank', uuid: uuid() });
                }
            }
            matrix.push(lastArr);
        }
        else {
            matrix.push(files.slice(i * col, (i + 1) * col));
        }
    }
    return matrix;
};
const ENV = Taro.getEnv();
export default class AtImagePicker extends React.Component {
    constructor() {
        super(...arguments);
        this.chooseFile = () => {
            const { files = [], multiple, count, sizeType, sourceType } = this.props;
            const filePathName = ENV === Taro.ENV_TYPE.ALIPAY ? 'apFilePaths' : 'tempFiles';
            // const count = multiple ? 99 : 1
            const params = {};
            if (multiple) {
                params.count = 99;
            }
            if (count) {
                params.count = count;
            }
            if (sizeType) {
                params.sizeType = sizeType;
            }
            if (sourceType) {
                params.sourceType = sourceType;
            }
            Taro.chooseImage(params)
                .then(res => {
                const targetFiles = res.tempFilePaths.map((path, i) => ({
                    url: path,
                    file: res[filePathName][i]
                }));
                const newFiles = files.concat(targetFiles);
                this.props.onChange(newFiles, 'add');
            })
                .catch(err => {
                var _a, _b;
                (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onFail) === null || _b === void 0 ? void 0 : _b.call(_a, err);
            });
        };
        this.handleImageClick = (idx) => {
            this.props.onImageClick &&
                this.props.onImageClick(idx, this.props.files[idx]);
        };
        this.handleRemoveImg = (idx, event) => {
            event.stopPropagation();
            event.preventDefault();
            const { files = [] } = this.props;
            if (ENV === Taro.ENV_TYPE.WEB) {
                window.URL.revokeObjectURL(files[idx].url);
            }
            const newFiles = files.filter((_, i) => i !== idx);
            this.props.onChange(newFiles, 'remove', idx);
        };
    }
    render() {
        const { className, customStyle, files, mode, length = 4, showAddBtn = true } = this.props;
        const rowLength = length <= 0 ? 1 : length;
        // 行数
        const matrix = generateMatrix(files, rowLength, showAddBtn);
        const rootCls = classNames('at-image-picker', className);
        return (React.createElement(View, { className: rootCls, style: customStyle }, matrix.map((row, i) => (React.createElement(View, { className: 'at-image-picker__flex-box', key: i + 1 }, row.map((item, j) => item.url ? (React.createElement(View, { className: 'at-image-picker__flex-item', key: i * length + j },
            React.createElement(View, { className: 'at-image-picker__item' },
                React.createElement(View, { className: 'at-image-picker__remove-btn', onClick: this.handleRemoveImg.bind(this, i * length + j) }),
                React.createElement(Image, { className: 'at-image-picker__preview-img', mode: mode, src: item.url, onClick: this.handleImageClick.bind(this, i * length + j) })))) : (React.createElement(View, { className: 'at-image-picker__flex-item', key: `empty_${i * length}${j}` }, item.type === 'btn' && (React.createElement(View, { onClick: this.chooseFile }, this.props.children
            || React.createElement(View, { className: 'at-image-picker__item at-image-picker__choose-btn' },
                React.createElement(View, { className: 'add-bar' }),
                React.createElement(View, { className: 'add-bar' }))))))))))));
    }
}
AtImagePicker.defaultProps = {
    className: '',
    customStyle: '',
    files: [],
    mode: 'aspectFill',
    showAddBtn: true,
    multiple: false,
    length: 4,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => { }
};
AtImagePicker.propTypes = {
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    customStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    files: PropTypes.array,
    mode: PropTypes.oneOf([
        'scaleToFill',
        'aspectFit',
        'aspectFill',
        'widthFix',
        'top',
        'bottom',
        'center',
        'left',
        'right',
        'top left',
        'top right',
        'bottom left',
        'bottom right'
    ]),
    showAddBtn: PropTypes.bool,
    multiple: PropTypes.bool,
    length: PropTypes.number,
    onChange: PropTypes.func,
    onImageClick: PropTypes.func,
    onFail: PropTypes.func,
    count: PropTypes.number,
    sizeType: PropTypes.array,
    sourceType: PropTypes.array
};
//# sourceMappingURL=index.js.map