import { TabPaneProps } from './tabPaneList/tabPane';

export type TabSizeMap = Map<
  React.Key,
  { width: number; height: number; left: number; top: number }
>;

export interface TabOffset {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
}
export type TabOffsetMap = Map<React.Key, TabOffset>;

export type TabPosition = 'left' | 'right' | 'top' | 'bottom';

export type TabType = 'line' | 'card' | 'editable-card';

export interface Tab extends TabPaneProps {
  key: string;
  tab: string | React.ReactElement;
  node: React.ReactElement;
}

export type RenderTabBar = (
  props: any,
  DefaultTabBar: any,
) => React.ReactElement;

export interface AnimatedConfig {
  inkBar?: boolean;
  tabPane?: boolean;
}

export type OnTabScroll = (info: {
  direction: 'left' | 'right' | 'top' | 'bottom';
}) => void;

export type TabBarExtraPosition = 'left' | 'right';

export type TabBarExtraMap = Partial<
  Record<TabBarExtraPosition, React.ReactNode>
>;

export type TabBarExtraContent = React.ReactNode | TabBarExtraMap;
