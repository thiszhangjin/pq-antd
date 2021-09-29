import React from 'react';
import Tabs, { TabsProps } from './Tabs';
import TabPane from './tabPaneList/tabPane';
import './style/index.less';

export default function RefTabs(props: TabsProps) {
  return <Tabs {...props} />;
}
RefTabs.TabPane = TabPane;
