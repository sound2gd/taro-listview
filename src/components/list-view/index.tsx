import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import Skeleton from "../skeleton";
import Loading from "../loading";
import tools from "./tool";
import ResultPage from "../result-page";
import { initialProps, initialState } from "./init";
// eslint-disable-next-line no-unused-vars
import { minGetMore } from "../../utils/utils";
import { Indicator, Launch, State, Props } from "./type";
import '../../style/components/list-view/index.scss'

class ListView extends Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  lazyClassName = (() => {
    return typeof this.props.lazy === "boolean"
      ? ".lazy-view"
      : this.props.lazy;
  })();

  lazyKey = (
    () => {
      if (this.props.lazy) {
        const { lazyStorage } = this.props;
        return tools.lazyScrollInit(this.lazyClassName, lazyStorage)
      } else {
        return undefined
      }
  })();

  lazyViewHeight = 0;

  static options = {
    addGlobalClass: true
  };

  static defaultProps = initialProps;

  bodyViewId = `${new Date().getTime()}-bodyViewId`;

  tipDampTextId = `${new Date().getTime()}-tipDampTextId`;

  scrollView = {};

  state = initialState;

  startY = 0;

  needPullDown = true;

  touchScrollTop = 0;

  componentWillMount(): void {

  }

  componentDidMount() {
    this.moveBox(0);
    if (this.props.lazy) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          Taro.createSelectorQuery()
            .select(".scrollView")
            .boundingClientRect()
            .exec(res => {
              const { lazyStorage } = this.props;
              tools.updateScrollHeight(this.lazyKey, res[0].height, lazyStorage)
              this.lazyViewHeight = res[0].height
            })
        }, 0)
      })
    }
    if (this.props.needInit) this.fetchInit();
  }

  componentWillUnmount(): void {
    const { lazyStorage } = this.props;
    tools.lazyScrollRemove(lazyStorage)
  }

  touchEvent = e => {
    const { type, touches } = e;
    const { onPullDownRefresh, distanceToRefresh, damping } = this.props;
    if (!onPullDownRefresh) return;
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
        if (height < 0 || touchScrollTop > 5) return;
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
        } else {
          this.resetLoad(0);
        }
        break;
      }
      case "touchcancel": {
        this.resetLoad(0);
        break;
      }
      default: {
        // console.log('foo');
      }
    }
  };

  fetchInit = async () => {
    const { onPullDownRefresh } = this.props;
    this.resetLoad(1);
    if (onPullDownRefresh) {
      const reset = () => {
        this.setState({ isInit: true });
        this.resetLoad(0, () => {
          this.setState({ isInit: false });
        });
      };
      await onPullDownRefresh(() => {});
      reset();
    }
  };

  resetLoad = (status = 0, cb?) => {
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
      default:
    }
    // state = Object.assign({}, state,{ blockStyle });
    // this.moveBox(0);
    this.setState(state);
    // todo 监听真正动画结束
    setTimeout(function() {
      if (cb) cb();
    }, 400);
  };

  handleScrollToLower = () => {
    tools.debounce(() => {
      // this.getMore();
      minGetMore(this);
    })();
  };

  onScroll = e => {
    const {
      detail: { scrollTop }
    } = e;
    if (this.props.onScroll) this.props.onScroll(e);
    this.setState({ scrollTop });
    if (this.props.lazy) {
      tools.lazyScroll(this.lazyKey, this.lazyViewHeight);
    }
  };

  moveBox = y => {
    const transition = y ? "none" : "300ms linear";
    // console.log({ y })
    if (Taro.getEnv() === "WEB") {
      const target = document.getElementById(this.bodyViewId) as HTMLElement;
      target.style.transform = `translate3d(0,${y}px,0)`;
      target.style.transition = transition;
    } else {
      this.setState({
        canScrollY: !y,
        blockStyle: {
          transform: `translate3d(0,${y}px,0)`,
          transition: transition
        }
      });
    }
  };

  updateDampText = (act: boolean) => {
    this.needPullDown = act;
    const { isInit, downLoading } = this.state;
    const showTip = !downLoading && !isInit; // 展示下拉区域文案
    if (!showTip) {
      return ''
    } else {
      const { indicator = {}, tipFreedText, tipText } = this.props;
      const {
        activate = "释放刷新",
        deactivate = "下拉刷新"
      } = indicator as Indicator;
      let text = "";
      if (act) {
        text = activate || tipText;
      } else {
        text = deactivate || tipFreedText;
      }
      if (Taro.getEnv() === "WEB") {
        const target = document.getElementById(this.tipDampTextId) as HTMLElement;
        target.innerText = text;
      } else {
        this.setState({ dampText: text });
      }
      return undefined
    }

  };

  render() {
    const {
      style,
      hasMore,
      isEmpty,
      emptyText,
      className,
      isError,
      isLoaded,
      selector,
      launch = {},
      footerLoadingText,
      footerLoadedText,
      damping,
      circleColor,
      autoHeight
    } = this.props;
    const {
      launchError = false,
      launchEmpty = false,
      launchFooterLoaded = false,
      launchFooterLoading = false
    } = launch as Launch;

    const { canScrollY, blockStyle, downLoading, dampText, scrollTop } = this.state;

    const showChildren = !(isEmpty || isError); // 展示children内容

    const showFooter = !downLoading && !isEmpty && !isError; // 空、错状态不展示底部
    const footerLoaded = showFooter && !launchFooterLoaded && !hasMore;
    const customFooterLoaded = showFooter && launchFooterLoaded && !hasMore; // 渲染renderLoadedText
    const footerLoading = showFooter && !launchFooterLoading && hasMore;
    const customFooterLoading = showFooter && launchFooterLoading && hasMore; // 渲染renderNoMore
    if (autoHeight) {
      return (
        <ScrollView
          ref={node => {
            this.scrollView = node;
          }}
          className={`${className} ${downLoading &&
            "downLoadingStyle"} scrollView autoHeight`}
          style={{ ...style }}
          scrollY={canScrollY}
          scrollTop={scrollTop}
          lowerThreshold={80}
          onScrollToLower={this.handleScrollToLower}
          scrollWithAnimation
          onScroll={this.onScroll}
        >
          <View
            style={{ minHeight: "100%", overflowY: "hidden" }}
            onTouchMove={e => this.touchEvent(e)}
            onTouchEnd={e => this.touchEvent(e)}
            onTouchStart={e => this.touchEvent(e)}
            onTouchCancel={e => this.touchEvent(e)}
          >
            <View
              // style={trStyle}
              className='bodyView'
              id={this.bodyViewId}
            >
              <View style={blockStyle}>
                <View
                  style={{ height: `${damping}px`, marginTop: `-${damping}px` }}
                  className='pullDownBlock'
                >
                  <View className='tip'>
                    {!downLoading && <View id={this.tipDampTextId}>{dampText}</View>}
                    {downLoading &&
                      (this.props.customizeLoading ? (
                        this.props.renderCustomizeLoading
                      ) : (
                        <Loading color={circleColor} />
                      ))}
                  </View>
                </View>
                {/* present children */}
                {showChildren && this.props.children}
                <ResultPage
                  renderError={this.props.renderError}
                  renderEmpty={this.props.renderEmpty}
                  launchError={launchError}
                  launchEmpty={launchEmpty}
                  isError={isError || false}
                  isEmpty={isEmpty || false}
                  emptyText={emptyText || ""}
                  fetchInit={this.fetchInit}
                />
                {/* default page */}
                {footerLoading && (
                  <View className='loading'>{footerLoadingText}</View>
                )}
                {/* custom footer loading page*/}
                {customFooterLoading && this.props.renderFooterLoading}
                {/* default footer loaded page*/}
                {footerLoaded && (
                  <View className='loaded'>{footerLoadedText}</View>
                )}
                {/* custom footer loaded page*/}
                {customFooterLoaded && this.props.renderFooterLoaded}
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
    return (
      <Skeleton isLoaded={isLoaded || isError} selector={selector}>
        <ScrollView
          ref={node => {
            this.scrollView = node;
          }}
          className={`${className} scrollView`}
          style={style}
          scrollY={canScrollY}
          lowerThreshold={80}
          onScrollToLower={this.handleScrollToLower}
          scrollWithAnimation
          onScroll={this.onScroll}
        >
          <View
            style={{ minHeight: "100%", overflowY: "hidden" }}
            onTouchMove={e => this.touchEvent(e)}
            onTouchEnd={e => this.touchEvent(e)}
            onTouchStart={e => this.touchEvent(e)}
            onTouchCancel={e => this.touchEvent(e)}
          >
            <View
              className='bodyView'
              id={this.bodyViewId}
            >
              <View style={blockStyle}>
                <View
                  style={{ height: `${damping}px`, marginTop: `-${damping}px` }}
                  className='pullDownBlock'
                >
                  <View className='tip'>
                    {!downLoading && <View id={this.tipDampTextId}>{dampText}</View>}
                    {downLoading &&
                      (this.props.customizeLoading ? (
                        this.props.renderCustomizeLoading
                      ) : (
                        <Loading color={circleColor} />
                      ))}
                  </View>
                </View>
                {/* present children */}
                {showChildren && this.props.children}
                <ResultPage
                  renderError={this.props.renderError}
                  renderEmpty={this.props.renderEmpty}
                  launchError={launchError}
                  launchEmpty={launchEmpty}
                  isError={isError || false}
                  isEmpty={isEmpty || false}
                  emptyText={emptyText || ""}
                  fetchInit={this.fetchInit}
                />
                {/* default page */}
                {footerLoading && (
                  <View className='loading'>{footerLoadingText}</View>
                )}
                {/* custom footer loading page*/}
                {customFooterLoading && this.props.renderFooterLoading}
                {/* default footer loaded page*/}
                {footerLoaded && (
                  <View className='loaded'>{footerLoadedText}</View>
                )}
                {/* custom footer loaded page*/}
                {customFooterLoaded && this.props.renderFooterLoaded}
              </View>
            </View>
          </View>
        </ScrollView>
      </Skeleton>
    );
  }
}

export default ListView;

