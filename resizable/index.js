import {Component, _} from 'rgui-base';
import template from './index.rgl';

let manager = {
    startLeft: 0,
    startTop: 0,
    startWidth: 0,
    startHeight: 0
};

/**
 * @class Resizable
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {number=0}                options.data.left               <=> 水平位置
 * @param {number=0}                options.data.top                <=> 垂直位置
 * @param {number=300}              options.data.width              <=> 宽度
 * @param {number=200}              options.data.height             <=> 高度
 * @param {number=0}                options.data.minWidth            => 最小宽度
 * @param {number=0}                options.data.minHeight           => 最小高度
 * @param {number=Infinity}         options.data.maxWidth            => 最大宽度
 * @param {number=Infinity}         options.data.maxHeight           => 最大高度
 * @param {string|object|Element|function} options.data.range       @=> 拖拽范围。值可以为一个{left,top,right,bottom}格式的对象，表示代理元素移动的上下左右边界。当值为`offsetParent`，拖拽时代理元素限制在offsetParent中移动；当值为`parent`；当值为。也可以直接传入一个元素或函数。
 * @param {Array=[...]}             options.data.handles             => 句柄
 * @param {string=''}               options.data.handleType          => 句柄类型
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {string=''}               options.data.class               => 补充class
 */
let Resizable = Component.extend({
    name: 'resizable',
    template,
    /**
     * @protected
     * @override
     */
    config() {
        this.data = Object.assign({
            left: 0,
            top: 0,
            width: 300,
            height: 200,
            minWidth: 0,
            minHeight: 0,
            maxWidth: Infinity,
            maxHeight: Infinity,
            range: undefined,
            handles: ['top', 'bottom', 'left', 'right', 'topleft', 'topright', 'bottomleft', 'bottomright'],
            handleType: ''
        }, this.data);
        this.supr();
    },
    /**
     * @method _getRange(proxy) 获取拖拽范围
     * @private
     * @param  {Element} proxy 调整大小元素
     * @return {Element} 拖拽范围元素
     */
    _getRange(proxy) {
        let range;

        if(typeof this.data.range === 'object')
            range = this.data.range;
        else if(this.data.range === 'offsetParent') {
            var offsetParent = proxy.offsetParent;
            if(offsetParent)
                range = {left: 0, top: 0, right: offsetParent.offsetWidth, bottom: offsetParent.offsetHeight};
            else
                range = {left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight};
        } else if(this.data.range === 'parent') {
            // range = proxy.parentElement;
        } else if(range instanceof Element) {
            //
        }

        if(range) {
            range.width = range.right - range.left;
            range.height = range.bottom - range.top;
        }

        return range;
    },
    /**
     * @private
     */
    _onDragStart($event) {
        Object.assign(manager, {
            startLeft: this.data.left,
            startTop: this.data.top,
            startWidth: this.data.width,
            startHeight: this.data.height,
            range: this._getRange(this.$refs.element)
        });
    },
    /**
     * @private
     */
    _onDrag($event, handle) {
        let left = manager.startLeft;
        let top = manager.startTop;
        let width = manager.startWidth;
        let height = manager.startHeight;

        if(handle.includes('left')) {
            let rangeWidth = manager.range ? manager.startLeft + manager.startWidth - manager.range.left : Infinity;
            width = manager.startWidth - $event.dragX;
            width = Math.min(Math.max(this.data.minWidth, width), this.data.maxWidth, rangeWidth);
            left += manager.startWidth - width;
        }

        if(handle.includes('top')) {
            let rangeHeight = manager.range ? manager.startTop + manager.startHeight - manager.range.top : Infinity;
            height = manager.startHeight - $event.dragY;
            height = Math.min(Math.max(this.data.minHeight, height), this.data.maxHeight, rangeHeight);
            top += manager.startHeight - height;
        }

        if(handle.includes('right')) {
            let rangeWidth = manager.range ? manager.range.right - manager.startLeft : Infinity;
            width = manager.startWidth + $event.dragX;
            width = Math.min(Math.max(this.data.minWidth, width), this.data.maxWidth, rangeWidth);
        }

        if(handle.includes('bottom')) {
            let rangeHeight = manager.range ? manager.range.bottom - manager.startTop : Infinity;
            height = manager.startHeight + $event.dragY;
            height = Math.min(Math.max(this.data.minHeight, height), this.data.maxHeight, rangeHeight);
        }

        this.data.left = left;
        this.data.top = top;
        this.data.width = width;
        this.data.height = height;

        /**
         * @event resize 调整大小时触发
         * @property {object} sender 事件发送对象
         * @property {number} left 水平位置
         * @property {number} top 垂直位置
         * @property {number} width 宽度
         * @property {number} height 高度
         */
        this.$emit('resize', {
            sender: this,
            left, top, width, height
        });
    }
});

export default Resizable;
