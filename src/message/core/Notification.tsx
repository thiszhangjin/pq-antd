import React from 'react';
import ReactDOM from 'react-dom';
import Notice, { NoticeProps } from './Notice';
import Animate from 'rc-animate';

interface NotificationProps {
  prefixCls: string;
  style?: React.CSSProperties;
}

interface noticeDataProps extends NoticeProps {
  key: number;
  content: string;
}

interface IState {
  NoticeList: noticeDataProps[];
}

export default class Notification extends React.Component<
  NotificationProps,
  IState
> {
  static newInstance: any;
  public readonly state: Readonly<IState> = {
    NoticeList: [],
  };

  public constructor(props: NotificationProps) {
    super(props);
  }

  add = (noticeData: noticeDataProps) => {
    const { NoticeList } = this.state;
    noticeData.key = new Date().getTime();
    this.setState({
      NoticeList: [...NoticeList, noticeData],
    });
  };

  delete = (key: number) => {
    const { NoticeList } = this.state;
    this.setState({
      NoticeList: NoticeList.filter(item => item.key !== key),
    });
  };

  render(): React.ReactNode {
    const props: NoticeProps = {
      prefixCls: this.props.prefixCls,
    };
    const { NoticeList } = this.state;
    let renderNode = NoticeList.map(item => {
      props.onClose = () => {
        this.delete(item.key);
      };
      props.children = item.content;
      return <Notice {...props} key={item.key} />;
    });
    return <Animate transitionName="move-up">{renderNode}</Animate>;
  }
}

Notification.newInstance = function(
  newInstanceFun: (Notification: Notification) => {},
  NotificationProps: NotificationProps,
) {
  const node: Element = document.createElement('div');
  node.className = 'notice-list';
  document.body.appendChild(node);

  function ref(Notification: Notification) {
    newInstanceFun(Notification);
  }

  ReactDOM.render(<Notification ref={ref} {...NotificationProps} />, node);
};
