import React from 'react';
export interface MenuItemGroupProps {
  children?: [];
  title?: string;
}
interface MenuItemGroupState {}

export default class MenuItemGroup extends React.Component<
  MenuItemGroupProps,
  MenuItemGroupState
> {
  public readonly state: Readonly<MenuItemGroupState> = {};

  public constructor(props: MenuItemGroupProps) {
    super(props);
  }

  static defaultProps = {};

  render() {
    return <div></div>;
  }
}
