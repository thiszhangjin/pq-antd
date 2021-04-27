import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import ResizeObserver from 'rc-resize-observer';
import { Icon } from 'antd';
import classNames from 'classnames';
import TabContext from '../tabContext';
import TabNode from './tabNode';
import { TabPosition, TabBarExtraContent } from '../interface';

export interface TabNavListProps {
  children?: React.ReactNode;
  id?: string | undefined;
  activeKey?: string | undefined;
  tabBarExtraContent?: TabBarExtraContent;
  tabBarGutter?: number;
  tabBarStyle?: React.CSSProperties;
  tabPosition?: TabPosition;
  isTabHorizontal?: boolean;

  onTabClick?: (
    activeKey: string,
    e: React.KeyboardEvent | React.MouseEvent,
  ) => void;
}

export default function TabNavList({
  id,
  activeKey,
  tabPosition,
  isTabHorizontal,
  tabBarGutter,
  tabBarStyle,
  // tabBarExtraContent,
  onTabClick,
}: TabNavListProps) {
  const { tabs, prefixCls } = useContext(TabContext);
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>();
  const [tabNodesStyle, setTabNodesStyle] = useState<React.CSSProperties>({});
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState<boolean>(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(false);
  const tabWrapper = useRef<HTMLDivElement>(null);
  const tabNodes = useRef<HTMLDivElement>(null);
  const tabNodesCache = useRef(new Map<React.Key, React.RefObject<any>>());

  const handleSetInkStyle = useCallback((): void => {
    if (activeKey) {
      const activeNode = tabNodesCache.current.get(activeKey);
      if (activeNode) {
        if (isTabHorizontal) {
          setInkStyle({
            width: activeNode.current?.offsetWidth,
            left: activeNode.current?.offsetLeft,
          });
        } else {
          setInkStyle({
            height: activeNode.current?.offsetHeight,
            top: activeNode.current?.offsetTop,
          });
        }
      }
    }
  }, [activeKey, isTabHorizontal]);

  useEffect(() => {
    if (tabNodes.current && tabWrapper.current) {
      if (isTabHorizontal) {
        setScrolling(
          tabNodes.current?.scrollWidth > tabWrapper.current?.offsetWidth,
        );
      } else {
        setScrolling(
          tabNodes.current?.scrollHeight > tabWrapper.current?.offsetHeight,
        );
      }
    }
  }, [tabs.map(tab => tab.key).join('_'), isTabHorizontal]);

  useEffect(() => {
    handleSetInkStyle();
  }, [handleSetInkStyle]);

  function getTabNodeRef(key: string): React.RefObject<any> | undefined {
    if (!tabNodesCache.current?.has(key)) {
      tabNodesCache.current?.set(key, React.createRef());
    }
    return tabNodesCache.current?.get(key);
  }

  function handleScroll(isNext: boolean) {
    let marginLeft: number = (tabNodesStyle.marginLeft as number) || 0;
    let marginTop: number = (tabNodesStyle.marginTop as number) || 0;
    const tabWrapperWidth = tabWrapper.current?.offsetWidth || 0;
    const tabNodesWidth = tabNodes.current?.scrollWidth || 0;
    const tabWrapperHeight = tabWrapper.current?.offsetHeight || 0;
    const tabNodesHeight = tabNodes.current?.scrollHeight || 0;
    marginLeft = isNext
      ? marginLeft - tabWrapperWidth
      : marginLeft + tabWrapperWidth;
    marginTop = isNext
      ? marginTop - tabWrapperHeight
      : marginTop + tabWrapperHeight;

    if (isTabHorizontal) {
      if (marginLeft >= 0) {
        setPrevBtnDisabled(true);
        marginLeft = 0;
      } else {
        setPrevBtnDisabled(false);
      }

      if (marginLeft <= tabWrapperWidth - tabNodesWidth) {
        setNextBtnDisabled(true);
        marginLeft = tabWrapperWidth - tabNodesWidth;
      } else {
        setNextBtnDisabled(false);
      }

      setTabNodesStyle({
        marginLeft,
      });
    } else {
      if (marginTop >= 0) {
        setPrevBtnDisabled(true);
        marginTop = 0;
      } else {
        setPrevBtnDisabled(false);
      }

      if (marginTop <= tabWrapperHeight - tabNodesHeight) {
        setNextBtnDisabled(true);
        marginTop = tabWrapperHeight - tabNodesHeight;
      } else {
        setNextBtnDisabled(false);
      }

      setTabNodesStyle({
        marginTop,
      });
    }
  }

  function onTabNodeResize() {
    handleSetInkStyle();
  }

  const classes = classNames(
    `${prefixCls}-bar`,
    `${prefixCls}-${tabPosition}-bar`,
  );
  const wrapperClasses = classNames(`${prefixCls}-nav-wrapper`, {
    [`${prefixCls}-nav-scrolling`]: scrolling,
  });
  const prevClasses = classNames(
    `${prefixCls}-nav-btn`,
    `${prefixCls}-nav-prev`,
    {
      [`${prefixCls}-nav-btn-disabled`]: prevBtnDisabled,
    },
  );
  const nextClasses = classNames(
    `${prefixCls}-nav-btn`,
    `${prefixCls}-nav-next`,
    {
      [`${prefixCls}-nav-btn-disabled`]: nextBtnDisabled,
    },
  );
  return (
    <div className={classes} style={tabBarStyle}>
      <div className={`${prefixCls}-nav`}>
        {scrolling && (
          <div className={prevClasses} onClick={() => handleScroll(false)}>
            <Icon type={isTabHorizontal ? 'left' : 'up'} />
          </div>
        )}
        <div className={wrapperClasses} ref={tabWrapper}>
          <div className={`${prefixCls}-nodes`} style={tabNodesStyle}>
            <div className={`${prefixCls}-nodes-content`} ref={tabNodes}>
              {tabs.map(item => (
                <ResizeObserver
                  onResize={
                    activeKey === item.key ? onTabNodeResize : undefined
                  }
                >
                  <TabNode
                    prefixCls={prefixCls}
                    id={id}
                    active={activeKey === item.key}
                    tabKey={item.key}
                    key={item.key}
                    disabled={item.disabled}
                    onClick={onTabClick}
                    ref={getTabNodeRef(item.key)}
                    style={tabBarGutter ? { marginRight: tabBarGutter } : {}}
                  >
                    {item.tab}
                  </TabNode>
                </ResizeObserver>
              ))}
            </div>
            <div
              className={classNames(`${prefixCls}-ink-bar`)}
              style={inkStyle}
            />
          </div>
        </div>
        {scrolling && (
          <div className={nextClasses} onClick={() => handleScroll(true)}>
            <Icon type={isTabHorizontal ? 'right' : 'down'} />
          </div>
        )}
      </div>
    </div>
  );
}
