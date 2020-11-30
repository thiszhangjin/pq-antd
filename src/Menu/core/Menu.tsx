import React from 'react';

interface MenuProps {}
interface MenuState {}

export default class Menu extends React.Component<MenuProps, MenuState> {
  public readonly state: Readonly<MenuState> = {};

  // eslint-disable-next-line no-useless-constructor
  public constructor(props: MenuProps) {
    super(props);
  }

  static defaultProps = {};

  render() {
    return <div></div>;
  }
}
