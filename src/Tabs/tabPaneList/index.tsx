import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import TabContext from '../tabContext';

export interface TabPaneListProps {
  children?: React.ReactNode;
  id?: string | undefined;
  activeKey?: string | undefined;
  activeIndex?: number;
  isTabHorizontal?: boolean;
}

export default function TabPaneList({
  id,
  activeKey,
  activeIndex = 0,
  isTabHorizontal,
}: TabPaneListProps) {
  const { tabs, prefixCls } = useContext(TabContext);
  const [tabPaneListStyle, setTabPaneListStyle] = useState<React.CSSProperties>(
    {},
  );

  useEffect(() => {
    if (isTabHorizontal) {
      setTabPaneListStyle({
        transform: `translate(-${activeIndex * 100}%, 0)`,
      });
    } else {
      setTabPaneListStyle({
        transform: `translate(0, -${activeIndex * 100}%)`,
      });
    }
  }, [activeIndex, isTabHorizontal]);

  const classes = classNames(`${prefixCls}-content`);
  return (
    <div className={`${prefixCls}-content-wrapper`}>
      <div className={classes} style={tabPaneListStyle}>
        {tabs.map(item =>
          React.cloneElement(item.node, {
            prefixCls,
            id,
            active: activeKey === item.key,
            tabKey: item.key,
          }),
        )}
      </div>
    </div>
  );
}
