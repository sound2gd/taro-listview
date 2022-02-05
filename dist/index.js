'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Taro = require('@tarojs/taro');
var components = require('@tarojs/components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Taro__default = /*#__PURE__*/_interopDefaultLegacy(Taro);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$4 = ".index_skeletonBg__10l-A,\n.index_skeletonStrip__1bzMP {\n  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);\n  background-size: 400% 100%;\n  animation: index_ant-skeleton-loading__3noPs 1.4s ease infinite;\n  border-radius: 6px; }\n\n@keyframes index_ant-skeleton-loading__3noPs {\n  0% {\n    background-position: 100% 50%; }\n  100% {\n    background-position: 0 50%; } }\n";
styleInject(css_248z$4);

class Skeleton extends React__default["default"].PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            parentRect: {},
            bg: [],
            list: [],
            listRadius: [],
        };
    }
    componentDidMount() {
        if (Taro__default["default"].getEnv() === 'WEAPP') {
            this.weappSkl();
        }
        else {
            this.h5Skl();
        }
    }
    h5Skl() {
        const selObj = {
            bg: '.skeleton-bg',
            list: '.skeleton-rect',
            listRadius: '.skeleton-radius',
        };
        const selAll = selector => {
            const list = [];
            document.querySelectorAll(selObj[selector]).forEach((i) => {
                // @ts-ignore
                list.push(i.getBoundingClientRect());
            });
            // @ts-ignore
            this.setState({
                [selector]: list,
            });
        };
        requestAnimationFrame(() => {
            const { selector = '.skeleton' } = this.props;
            const dom = document.querySelector(selector);
            if (dom) {
                const rect = dom.getBoundingClientRect();
                const parentStyle = {};
                Object.keys(rect).forEach(i => {
                    parentStyle[i] = `${rect[i]}px`;
                });
                this.setState({
                    parentRect: parentStyle
                });
                selAll('bg');
                selAll('list');
                selAll('listRadius');
            }
        });
    }
    weappSkl() {
        // @ts-ignore
        Taro__default["default"].Current.page && Taro__default["default"].createSelectorQuery()
            .in(Taro__default["default"].Current.page)
            .selectAll(`.skeleton-bg`)
            .boundingClientRect()
            .exec(res => {
            this.setState({ bg: res[0] });
        });
        Taro__default["default"].createSelectorQuery()
            .selectAll(`.skeleton-rect`)
            .boundingClientRect()
            .exec(res => {
            this.setState({ list: res[0] });
        });
        Taro__default["default"].createSelectorQuery()
            .selectAll(`.skeleton-radius`)
            .boundingClientRect()
            .exec(res => {
            this.setState({ listRadius: res[0] });
        });
    }
    render() {
        const { list, bg, listRadius, parentRect } = this.state;
        const { isLoaded } = this.props; // 是否加载完成
        return (React__default["default"].createElement(components.View, null,
            React__default["default"].createElement(components.View, { style: { opacity: isLoaded ? 1 : 0 } }, this.props.children),
            isLoaded ? ('') : (React__default["default"].createElement(components.View, { style: { ...parentRect, backgroundColor: 'white', position: 'fixed', overflow: 'hidden' } },
                bg.map((item, index) => {
                    const { width, height, top, left } = item;
                    return (React__default["default"].createElement(components.View, { key: `${item.height}${index}`, style: {
                            background: 'white',
                            width: `${width}px`,
                            height: `${height}px`,
                            top: `${top}px`,
                            left: `${left}px`,
                            position: 'fixed',
                        } }));
                }),
                list.map((item, index) => {
                    const { width, height, top, left } = item;
                    return (React__default["default"].createElement(components.View, { key: `${item.height}${index}`, className: 'skeletonBg', style: {
                            width: `${width}px`,
                            height: `${height}px`,
                            top: `${top}px`,
                            left: `${left}px`,
                            position: 'fixed',
                        } }));
                }),
                listRadius.map((item, index) => {
                    const { width, height, top, left } = item;
                    return (React__default["default"].createElement(components.View, { key: `${item.height}${index}`, className: 'skeletonBg', style: {
                            borderRadius: '50%',
                            width: `${width}px`,
                            height: `${height}px`,
                            top: `${top}px`,
                            left: `${left}px`,
                            position: 'fixed',
                        } }));
                })))));
    }
}
Skeleton.defaultProps = {
    isLoaded: false,
    selector: '.skeleton',
};

var css_248z$3 = "@keyframes index_lds-rolling__31RnK {\n  0% {\n    -webkit-transform: translate(-50%, -50%) rotate(0deg);\n    transform: translate(-50%, -50%) rotate(0deg); }\n  100% {\n    -webkit-transform: translate(-50%, -50%) rotate(360deg);\n    transform: translate(-50%, -50%) rotate(360deg); } }\n\n@-webkit-keyframes index_lds-rolling__31RnK {\n  0% {\n    -webkit-transform: translate(-50%, -50%) rotate(0deg);\n    transform: translate(-50%, -50%) rotate(0deg); }\n  100% {\n    -webkit-transform: translate(-50%, -50%) rotate(360deg);\n    transform: translate(-50%, -50%) rotate(360deg); } }\n\n.index_loading-box__25fxi {\n  display: inline-block;\n  margin-bottom: -8px; }\n\n.index_lds-rolling__31RnK {\n  position: relative; }\n\n.index_lds-rolling__31RnK .index_circle__DzlzL {\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  border: 4px solid #667baf;\n  border-top-color: transparent !important;\n  border-radius: 50%; }\n\n.index_circle__DzlzL {\n  -webkit-animation: index_lds-rolling__31RnK 1s linear infinite;\n  animation: index_lds-rolling__31RnK 1s linear infinite;\n  top: 40px;\n  left: 40px; }\n\n.index_lds-rolling__31RnK {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg); }\n\n.index_lds-rolling__31RnK {\n  width: 80px !important;\n  height: 80px !important;\n  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);\n  transform: translate(-100px, -100px) scale(1) translate(100px, 100px); }\n";
styleInject(css_248z$3);

class Page$1 extends React.Component {
    render() {
        return (React__default["default"].createElement(components.View, { className: 'loading-box', "data-color": 'red' },
            React__default["default"].createElement(components.View, { style: 'width:100%;height:100%', className: 'lds-rolling' },
                React__default["default"].createElement(components.View, { className: 'circle', style: { borderColor: this.props.color } }))));
    }
}

function get(key, defaultValue) {
    let value = Taro__default["default"].getStorageSync(key);
    if (!value || value === ' ' || value === 'undefined' || value === 'null') {
        value = '';
    }
    // @ts-ignore
    return value ? JSON.parse(value) : defaultValue;
}
function set(key, value) {
    Taro__default["default"].setStorageSync(key, JSON.stringify(value));
}
function remove(key) {
    Taro__default["default"].removeStorageSync(key);
}
function clear() {
    Taro__default["default"].clearStorageSync();
}
var storage = {
    get,
    set,
    remove,
    clear,
};

function debounce(method, time = 500) {
    let timer = null;
    return function () {
        // @ts-ignore
        const context = this;
        // 在函数执行的时候先清除timer定时器;
        // @ts-ignore
        clearTimeout(timer);
        // @ts-ignore
        timer = setTimeout(function () {
            method.call(context);
        }, time);
    };
}
let timer = null;
let startTime = Date.now();
const throttle = function (func, delay) {
    return function () {
        const curTime = Date.now();
        const remaining = delay - (curTime - startTime);
        // @ts-ignore
        const context = this;
        const args = arguments;
        // @ts-ignore
        clearTimeout(timer);
        if (remaining <= 0) {
            func.apply(context, args);
            startTime = Date.now();
        }
        else {
            // @ts-ignore
            timer = setTimeout(func, remaining);
        }
    };
};
const wait = function (time = 500) {
    return new Promise(res => {
        setTimeout(() => {
            res();
        }, time);
    });
};
function lazyScrollInit(className, storagekey) {
    const lazyKey = `lazy${new Date().getTime()}`;
    const lazyBox = storage.get(`lazyBox_${storagekey}`, []);
    if (lazyBox.length) {
        const length = lazyBox.length;
        const lastKey = lazyBox[length - 1];
        console.log({ lastKey });
        if (new Date().getTime() - Number(lastKey.key?.replace('lazy', '')) > 86400000) {
            lazyBox.splice(0, length);
        }
    }
    lazyBox.push({ key: lazyKey, className, viewHeight: 0 });
    storage.set(`lazyBox_${storagekey}`, lazyBox);
    console.log('lazyScrollInit``````');
    return lazyKey;
}
function lazyScrollRemove(storagekey) {
    const lazyBox = storage.get(`lazyBox_${storagekey}`, []);
    lazyBox.pop();
    storage.set(`lazyBox_${storagekey}`, lazyBox);
}
function updateScrollHeight(key, viewHeight, storagekey) {
    const lazyBox = storage.get(`lazyBox_${storagekey}`, []);
    const index = lazyBox.findIndex(i => i.key === key);
    const targetLazy = lazyBox[index];
    lazyBox.splice(index, 1, { ...targetLazy, viewHeight });
    storage.set(`lazyBox_${storagekey}`, lazyBox);
}
function lazyScroll(key, height) {
    // console.log({ selector, key })
    const query = Taro__default["default"].getEnv() === 'WEB' ? `.lazy-image-${key}` : `.lazy-image-${key}`;
    throttle(() => {
        setTimeout(() => {
            Taro__default["default"].createSelectorQuery()
                .selectAll(query)
                .boundingClientRect()
                .exec(res => {
                const list = res[0];
                const indexs = [];
                list.forEach((i, index) => {
                    if (i.top > -height * 1.5 && i.top < height * 1.5) {
                        // @ts-ignore
                        indexs.push(index);
                    }
                });
                // @ts-ignore
                if (Taro__default["default"][key] && typeof Taro__default["default"][key] === 'function')
                    Taro__default["default"][key](indexs);
            });
        }, 0);
    }, 500)();
}
var tools = { lazyScroll, wait, debounce, updateScrollHeight, lazyScrollInit, lazyScrollRemove };

var css_248z$2 = ".index_errorPage__2k8_C {\n  text-align: center;\n  padding: 40px;\n  font-size: 30px; }\n  .index_errorPage__2k8_C .index_button__2utd2 {\n    border-radius: 10px;\n    margin-top: 10px;\n    display: inline-block;\n    border: 1px solid cornflowerblue;\n    color: cornflowerblue;\n    padding: 10px; }\n\n.index_noContentTips__kRxBk {\n  display: flex;\n  padding: 100px 20px 20px;\n  text-align: center;\n  flex-direction: column; }\n  .index_noContentTips__kRxBk .index_emptyBanner__LuRLC {\n    width: 250px;\n    height: 170px;\n    display: inline-block;\n    margin: 0 auto 20px; }\n\n.index_marginBottom30__3CYsq {\n  margin-bottom: 30px; }\n";
styleInject(css_248z$2);

class Page extends React.Component {
    render() {
        const { isError, launchError, launchEmpty, isEmpty, emptyText, fetchInit } = this.props;
        const showError = isError; // isErrorUI权重最高
        const showErrorText = showError && !launchError; // 渲染ErrorText
        const showRenderError = showError && launchError; // 渲染renderError
        const showEmpty = !isError && isEmpty; // isErrorUI权重最高
        const showEmptyText = showEmpty && !launchEmpty; // 渲染emptyText
        const showRenderEmpty = showEmpty && launchEmpty; // 渲染renderEmpty
        return (React__default["default"].createElement(components.View, null,
            showErrorText && (React__default["default"].createElement(components.View, { className: 'errorPage' },
                React__default["default"].createElement(components.View, { className: 'marginBottom30' }, "\u554A\u54E6\uFF0C\u7F51\u7EDC\u6084\u6084\u8DD1\u5230\u5916\u661F\u7403\u53BB\u4E86~"),
                React__default["default"].createElement(components.View, { className: 'button', onClick: fetchInit }, "\u91CD\u65B0\u52A0\u8F7D"))),
            showRenderError ? this.props.renderError : '',
            showEmptyText && (React__default["default"].createElement(components.View, { className: 'noContentTips' }, emptyText)),
            showRenderEmpty ? this.props.renderEmpty : ''));
    }
}

const initialState = {
    hideInd: false,
    touchScrollTop: 0,
    scrollTop: 0,
    startY: 0,
    downLoading: false,
    lowerLoading: false,
    // needPullDown: true,
    canScrollY: true,
    isInit: false,
    blockStyle: {
        transform: 'translate3d(0,0,0)',
        transition: 'none',
    },
    dampText: '',
};
const initialProps = {
    selector: 'skeleton',
    circleColor: '',
    lazy: false,
    distanceToRefresh: 50,
    damping: 150,
    isLoaded: true,
    isEmpty: false,
    emptyText: '',
    noMore: '',
    footerLoadingText: '加载中',
    footerLoadedText: '',
    scrollTop: 0,
    touchScrollTop: 0,
    onScrollToLower: () => {
    },
    showIndicator: true,
    className: '',
    onPullDownRefresh: () => { },
    hasMore: false,
    needInit: false,
    isError: false,
    launch: {},
    renderEmpty: null,
    renderError: null,
    autoHeight: false,
    indicator: {
        activate: '下拉刷新',
        deactivate: '释放刷新'
    },
    lazyStorage: 'box'
};

const minGetMore = async (self) => {
    const { onScrollToLower, hasMore } = self.props;
    const { lowerLoading } = self.state;
    if (hasMore && !lowerLoading && onScrollToLower) {
        self.setState({ lowerLoading: true });
        await onScrollToLower(() => { });
        self.setState({ lowerLoading: false });
    }
};

var css_248z$1 = ".index_animateEase__4g80m {\n  transition: transform ease 300ms; }\n\n.index_downLoadingStyle__1aLq8 {\n  overflow: hidden; }\n\n.index_scrollView__5Dcnp {\n  position: relative;\n  width: 100%; }\n\n.index_autoHeight__2mGBK {\n  height: 100%; }\n\n.index_bodyView__2g1Mu {\n  position: relative;\n  overflow: visible;\n  will-change: transform;\n  transform: translate3d(0, 0, 0);\n  backface-visibility: hidden; }\n\n.index_containView__32ltl {\n  position: relative; }\n\n.index_unNeedBlock__1hxeo {\n  opacity: 0;\n  visibility: hidden; }\n\n.index_pullDownBlock__LMBFJ {\n  left: 0;\n  width: 100%;\n  overflow: hidden;\n  font-size: 28px;\n  display: flex;\n  align-items: flex-end; }\n  .index_pullDownBlock__LMBFJ .index_tip__1GVUe {\n    display: flex;\n    justify-content: center;\n    color: #999999;\n    bottom: 30px;\n    left: 0;\n    width: 100%;\n    text-align: center; }\n\n.index_loading__1G0HX, .index_loaded__-B7Xr {\n  text-align: center;\n  font-size: 24px;\n  padding: 12px; }\n\n.index_loaded__-B7Xr {\n  color: #e6e6e6; }\n\n.index_errorPage__2tAO9 {\n  text-align: center;\n  padding: 40px; }\n  .index_errorPage__2tAO9 .index_button__11Be2 {\n    border-radius: 10px;\n    margin-top: 10px;\n    display: inline-block;\n    border: 1px solid cornflowerblue;\n    color: cornflowerblue;\n    padding: 10px; }\n\n.index_noContentTips__cM25g {\n  display: flex;\n  padding: 100px 20px 20px;\n  text-align: center;\n  flex-direction: column; }\n  .index_noContentTips__cM25g .index_emptyBanner__WssOo {\n    width: 250px;\n    height: 170px;\n    display: inline-block;\n    margin: 0 auto 20px; }\n\n@keyframes index_loading__1G0HX {\n  from {\n    transform: rotate(0turn); }\n  to {\n    transform: rotate(1turn); } }\n\n.index_hide__34Det {\n  visibility: hidden; }\n";
styleInject(css_248z$1);

class ListView extends React.Component {
    constructor() {
        super(...arguments);
        // eslint-disable-next-line react/sort-comp
        this.lazyClassName = (() => {
            return typeof this.props.lazy === "boolean"
                ? ".lazy-view"
                : this.props.lazy;
        })();
        this.lazyKey = (() => {
            if (this.props.lazy) {
                const { lazyStorage } = this.props;
                return tools.lazyScrollInit(this.lazyClassName, lazyStorage);
            }
            else {
                return undefined;
            }
        })();
        this.lazyViewHeight = 0;
        this.bodyViewId = `${new Date().getTime()}-bodyViewId`;
        this.tipDampTextId = `${new Date().getTime()}-tipDampTextId`;
        this.scrollView = {};
        this.state = initialState;
        this.startY = 0;
        this.needPullDown = true;
        this.touchScrollTop = 0;
        this.touchEvent = e => {
            const { type, touches } = e;
            const { onPullDownRefresh, distanceToRefresh, damping } = this.props;
            if (!onPullDownRefresh)
                return;
            switch (type) {
                case "touchstart": {
                    this.touchScrollTop = this.state.scrollTop;
                    (this.needPullDown = true), (this.startY = touches[0].clientY);
                    break;
                }
                // 拖动方向不符合的不处理
                case "touchmove": {
                    const { clientY } = touches[0];
                    const { touchScrollTop } = this;
                    const height = Math.floor((clientY - this.startY) / 5);
                    if (height < 0 || touchScrollTop > 5)
                        return;
                    e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
                    if (height > 0 && height < (damping || 0)) {
                        let needPullDown = false;
                        if (height < (distanceToRefresh || 0)) {
                            needPullDown = true;
                        }
                        this.updateDampText(needPullDown);
                        this.moveBox(height);
                    }
                    break;
                }
                case "touchend": {
                    if (!this.needPullDown) {
                        this.fetchInit();
                    }
                    else {
                        this.resetLoad(0);
                    }
                    break;
                }
                case "touchcancel": {
                    this.resetLoad(0);
                    break;
                }
            }
        };
        this.fetchInit = async () => {
            const { onPullDownRefresh } = this.props;
            this.resetLoad(1);
            if (onPullDownRefresh) {
                const reset = () => {
                    this.setState({ isInit: true });
                    this.resetLoad(0, () => {
                        this.setState({ isInit: false });
                    });
                };
                await onPullDownRefresh(() => { });
                reset();
            }
        };
        this.resetLoad = (status = 0, cb) => {
            // status: 0:回复初始值 1：加载中
            // console.log({ status })
            const { distanceToRefresh } = this.props;
            let state = {};
            switch (status) {
                case 0:
                    state = {
                        canScrollY: true,
                        downLoading: false
                    };
                    this.updateDampText(true);
                    this.moveBox(0);
                    break;
                case 1:
                    state = {
                        canScrollY: false,
                        downLoading: true
                    };
                    this.updateDampText(false);
                    this.moveBox(distanceToRefresh);
                    break;
            }
            // state = Object.assign({}, state,{ blockStyle });
            // this.moveBox(0);
            this.setState(state);
            // todo 监听真正动画结束
            setTimeout(function () {
                if (cb)
                    cb();
            }, 400);
        };
        this.handleScrollToLower = () => {
            tools.debounce(() => {
                // this.getMore();
                minGetMore(this);
            })();
        };
        this.onScroll = e => {
            const { detail: { scrollTop } } = e;
            if (this.props.onScroll)
                this.props.onScroll(e);
            this.setState({ scrollTop });
            if (this.props.lazy) {
                tools.lazyScroll(this.lazyKey, this.lazyViewHeight);
            }
        };
        this.moveBox = y => {
            const transition = y ? "none" : "300ms linear";
            // console.log({ y })
            if (Taro__default["default"].getEnv() === "WEB") {
                const target = document.getElementById(this.bodyViewId);
                target.style.transform = `translate3d(0,${y}px,0)`;
                target.style.transition = transition;
            }
            else {
                this.setState({
                    canScrollY: !y,
                    blockStyle: {
                        transform: `translate3d(0,${y}px,0)`,
                        transition: transition
                    }
                });
            }
        };
        this.updateDampText = (act) => {
            this.needPullDown = act;
            const { isInit, downLoading } = this.state;
            const showTip = !downLoading && !isInit; // 展示下拉区域文案
            if (!showTip) {
                return '';
            }
            else {
                const { indicator = {}, tipFreedText, tipText } = this.props;
                const { activate = "释放刷新", deactivate = "下拉刷新" } = indicator;
                let text = "";
                if (act) {
                    text = activate || tipText;
                }
                else {
                    text = deactivate || tipFreedText;
                }
                if (Taro__default["default"].getEnv() === "WEB") {
                    const target = document.getElementById(this.tipDampTextId);
                    target.innerText = text;
                }
                else {
                    this.setState({ dampText: text });
                }
                return undefined;
            }
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.moveBox(0);
        if (this.props.lazy) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    Taro__default["default"].createSelectorQuery()
                        .select(".scrollView")
                        .boundingClientRect()
                        .exec(res => {
                        const { lazyStorage } = this.props;
                        tools.updateScrollHeight(this.lazyKey, res[0].height, lazyStorage);
                        this.lazyViewHeight = res[0].height;
                    });
                }, 0);
            });
        }
        if (this.props.needInit)
            this.fetchInit();
    }
    componentWillUnmount() {
        const { lazyStorage } = this.props;
        tools.lazyScrollRemove(lazyStorage);
    }
    render() {
        const { style, hasMore, isEmpty, emptyText, className, isError, isLoaded, selector, launch = {}, footerLoadingText, footerLoadedText, damping, circleColor, autoHeight } = this.props;
        const { launchError = false, launchEmpty = false, launchFooterLoaded = false, launchFooterLoading = false } = launch;
        const { canScrollY, blockStyle, downLoading, dampText, scrollTop } = this.state;
        const showChildren = !(isEmpty || isError); // 展示children内容
        const showFooter = !downLoading && !isEmpty && !isError; // 空、错状态不展示底部
        const footerLoaded = showFooter && !launchFooterLoaded && !hasMore;
        const customFooterLoaded = showFooter && launchFooterLoaded && !hasMore; // 渲染renderLoadedText
        const footerLoading = showFooter && !launchFooterLoading && hasMore;
        const customFooterLoading = showFooter && launchFooterLoading && hasMore; // 渲染renderNoMore
        if (autoHeight) {
            return (React__default["default"].createElement(components.ScrollView, { ref: node => {
                    this.scrollView = node;
                }, className: `${className} ${downLoading &&
                    "downLoadingStyle"} scrollView autoHeight`, style: { ...style }, scrollY: canScrollY, scrollTop: scrollTop, lowerThreshold: 80, onScrollToLower: this.handleScrollToLower, scrollWithAnimation: true, onScroll: this.onScroll },
                React__default["default"].createElement(components.View, { style: { minHeight: "100%", overflowY: "hidden" }, onTouchMove: e => this.touchEvent(e), onTouchEnd: e => this.touchEvent(e), onTouchStart: e => this.touchEvent(e), onTouchCancel: e => this.touchEvent(e) },
                    React__default["default"].createElement(components.View
                    // style={trStyle}
                    , { 
                        // style={trStyle}
                        className: 'bodyView', id: this.bodyViewId },
                        React__default["default"].createElement(components.View, { style: blockStyle },
                            React__default["default"].createElement(components.View, { style: { height: `${damping}px`, marginTop: `-${damping}px` }, className: 'pullDownBlock' },
                                React__default["default"].createElement(components.View, { className: 'tip' },
                                    !downLoading && React__default["default"].createElement(components.View, { id: this.tipDampTextId }, dampText),
                                    downLoading &&
                                        (this.props.customizeLoading ? (this.props.renderCustomizeLoading) : (React__default["default"].createElement(Page$1, { color: circleColor }))))),
                            showChildren && this.props.children,
                            React__default["default"].createElement(Page, { renderError: this.props.renderError, renderEmpty: this.props.renderEmpty, launchError: launchError, launchEmpty: launchEmpty, isError: isError || false, isEmpty: isEmpty || false, emptyText: emptyText || "", fetchInit: this.fetchInit }),
                            footerLoading && (React__default["default"].createElement(components.View, { className: 'loading' }, footerLoadingText)),
                            customFooterLoading && this.props.renderFooterLoading,
                            footerLoaded && (React__default["default"].createElement(components.View, { className: 'loaded' }, footerLoadedText)),
                            customFooterLoaded && this.props.renderFooterLoaded)))));
        }
        return (React__default["default"].createElement(Skeleton, { isLoaded: isLoaded || isError, selector: selector },
            React__default["default"].createElement(components.ScrollView, { ref: node => {
                    this.scrollView = node;
                }, className: `${className} scrollView`, style: style, scrollY: canScrollY, lowerThreshold: 80, onScrollToLower: this.handleScrollToLower, scrollWithAnimation: true, onScroll: this.onScroll },
                React__default["default"].createElement(components.View, { style: { minHeight: "100%", overflowY: "hidden" }, onTouchMove: e => this.touchEvent(e), onTouchEnd: e => this.touchEvent(e), onTouchStart: e => this.touchEvent(e), onTouchCancel: e => this.touchEvent(e) },
                    React__default["default"].createElement(components.View, { className: 'bodyView', id: this.bodyViewId },
                        React__default["default"].createElement(components.View, { style: blockStyle },
                            React__default["default"].createElement(components.View, { style: { height: `${damping}px`, marginTop: `-${damping}px` }, className: 'pullDownBlock' },
                                React__default["default"].createElement(components.View, { className: 'tip' },
                                    !downLoading && React__default["default"].createElement(components.View, { id: this.tipDampTextId }, dampText),
                                    downLoading &&
                                        (this.props.customizeLoading ? (this.props.renderCustomizeLoading) : (React__default["default"].createElement(Page$1, { color: circleColor }))))),
                            showChildren && this.props.children,
                            React__default["default"].createElement(Page, { renderError: this.props.renderError, renderEmpty: this.props.renderEmpty, launchError: launchError, launchEmpty: launchEmpty, isError: isError || false, isEmpty: isEmpty || false, emptyText: emptyText || "", fetchInit: this.fetchInit }),
                            footerLoading && (React__default["default"].createElement(components.View, { className: 'loading' }, footerLoadingText)),
                            customFooterLoading && this.props.renderFooterLoading,
                            footerLoaded && (React__default["default"].createElement(components.View, { className: 'loaded' }, footerLoadedText)),
                            customFooterLoaded && this.props.renderFooterLoaded))))));
    }
}
ListView.options = {
    addGlobalClass: true
};
ListView.defaultProps = initialProps;

var css_248z = ".block_blockLoad__2UH8U {\n  animation: block_op__2PSpj 500ms ease; }\n\n@keyframes block_op__2PSpj {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n";
styleInject(css_248z);

class LazyImage extends React.Component {
    constructor() {
        super(...arguments);
        this.lazyItem = {};
        this.state = {
            scrollCur: [0]
        };
        this.isLoad = (current) => {
            return this.state.scrollCur.includes(current);
        };
    }
    componentWillMount() {
        const { lazyStorage } = this.props;
        const lazyItem = storage.get(`lazyBox_${lazyStorage}`)[storage.get(`lazyBox_${lazyStorage}`).length - 1];
        this.lazyItem = lazyItem;
    }
    componentDidMount() {
        // console.log({ lazyItem })
        this.bindTextListener();
        // console.log('block componentDidMount')
        // console.log(`lazy-image-${this.lazyItem.key}`)
    }
    componentWillUnmount() {
        const { key } = this.lazyItem;
        Taro__default["default"].eventCenter.off(`lazyBlock${key}`);
    }
    // 绑定函数
    bindTextListener() {
        const { key, viewHeight } = this.lazyItem;
        Taro__default["default"].eventCenter.on(`lazyBlock${key}`, scrollCur => {
            this.setState({
                scrollCur
            });
        });
        // @ts-ignore
        Taro__default["default"][key] = Taro__default["default"].eventCenter.trigger.bind(Taro__default["default"].eventCenter, `lazyBlock${key}`);
        setTimeout(() => {
            tools.lazyScroll(key, viewHeight);
        }, 0);
    }
    render() {
        const { current } = this.props;
        return (React__default["default"].createElement(components.View, { className: `lazy-image-${this.lazyItem.key} ${this.props.className}` }, this.isLoad(current) ? (React__default["default"].createElement(components.View, { className: 'blockLoad' }, this.props.children)) : ('')));
    }
}
LazyImage.options = {
    addGlobalClass: true,
};
LazyImage.externalClasses = ['img-class'];
LazyImage.defaultProps = {
    lazyStorage: 'box'
};

// import Taro  from '@tarojs/taro'

exports.LazyBlock = LazyImage;
exports.ListView = ListView;
exports.Skeleton = Skeleton;
exports["default"] = ListView;
