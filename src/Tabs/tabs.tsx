import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import TabPaneList from './tabPaneList/index';
import TabNavList from './tabNavList/index';
import TabContext from './tabContext';

import {
  TabPosition,
  RenderTabBar,
  AnimatedConfig,
  OnTabScroll,
  TabBarExtraContent,
  Tab,
} from './interface';

export interface TabsProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  id?: string;

  activeKey?: string;
  defaultActiveKey?: string;
  animated?: boolean | AnimatedConfig;
  renderTabBar?: RenderTabBar;
  tabBarExtraContent?: TabBarExtraContent;
  tabBarGutter?: number;
  tabBarStyle?: React.CSSProperties;
  tabPosition?: TabPosition;

  onChange?: (activeKey: string) => void;
  onTabClick?: (
    activeKey: string,
    e: React.KeyboardEvent | React.MouseEvent,
  ) => void;
  onTabScroll?: OnTabScroll;
}

function getTabList(children: React.ReactNode): Tab[] {
  const list: Tab[] = [];
  React.Children.forEach(children, (node: React.ReactNode) => {
    if (React.isValidElement(node)) {
      list.push({
        key: String(node.key),
        node,
        ...node.props,
      });
    }
  });
  return list;
}

function Tabs(
  {
    id,
    prefixCls = 'pq-antd-tabs',
    className,
    children,
    style,
    activeKey,
    defaultActiveKey,
    tabPosition = 'top',
    tabBarGutter,
    tabBarStyle,
    tabBarExtraContent,
    renderTabBar,
    onChange,
    onTabClick,
    onTabScroll,
    ...restProps
  }: TabsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const tabs = getTabList(children);
  const [mergedActiveKey, setMergedActiveKey] = useState<string | undefined>(
    activeKey || defaultActiveKey || tabs[0]?.key,
  );
  const [activeIndex, setActiveIndex] = useState<number>(
    tabs.findIndex(item => item.key === mergedActiveKey),
  );
  const [isTabHorizontal, setIsTabHorizontal] = useState<boolean>(true);
  let tabNavBar: React.ReactElement;

  useEffect(() => {
    if (activeKey) {
      setMergedActiveKey(activeKey);
    }
  }, [activeKey, tabs.map(tab => tab.key).join('_')]);

  useEffect(() => {
    if (mergedActiveKey) {
      const newActiveIndex = tabs.findIndex(
        item => item.key === mergedActiveKey,
      );
      setActiveIndex(Math.max(0, newActiveIndex));
    }
  }, [mergedActiveKey, tabs.map(tab => tab.key).join('_')]);

  useEffect(() => {
    setIsTabHorizontal(tabPosition === 'top' || tabPosition === 'bottom');
  }, [tabPosition]);

  function onInTabClick(
    key: string,
    e: React.KeyboardEvent | React.MouseEvent,
  ) {
    setMergedActiveKey(key);

    onTabClick?.(key, e);

    onChange?.(key);
  }

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${tabPosition}`]: tabPosition,
    },
    className,
  );

  const baseProps = {
    id,
    activeKey: mergedActiveKey,
    activeIndex,
    isTabHorizontal,
  };

  const tabNavBarProps = {
    tabPosition,
    tabBarGutter,
    tabBarStyle,
    tabBarExtraContent,
    onTabClick: onInTabClick,
    onTabScroll,
    ...baseProps,
  };

  if (renderTabBar) {
    tabNavBar = renderTabBar(tabNavBarProps, TabNavList);
  } else {
    tabNavBar = <TabNavList {...tabNavBarProps} />;
  }

  return (
    <TabContext.Provider
      value={{
        tabs,
        prefixCls,
      }}
    >
      <div className={classes} style={style} ref={ref} {...restProps}>
        {tabNavBar}
        <TabPaneList {...baseProps} />
      </div>
    </TabContext.Provider>
  );
}

export default React.forwardRef(Tabs);
