import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Notice, { NoticeProps } from './Notice';
import Animate from 'rc-animate';

interface NotificationProps {
  prefixCls: string;
  style?: React.CSSProperties;
}

interface noticeDataProps extends NoticeProps {
  key: number;
  content: string|ReactNode;
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

  static defaultProps = {
    prefixCls: "myAntd",
    style:{
      position: 'fixed',
      left: '50%',
      top: '100px'
    }
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
    const {prefixCls, style, } = this.props;
    const { NoticeList } = this.state;
    let renderNode = NoticeList.map(item => {
      const {key, content, onClose } = item;
      const noticeProps:NoticeProps = {
        prefixCls,
        ...item,
        onClose: () => {
          this.delete(key);
          if(onClose) {
            onClose()
          }
        },
        children: content
      }
      return <Notice {...noticeProps} key={item.key} />;
    });
    return (
      <div className={`${prefixCls}-notification`} style={style} >
        <Animate transitionName="fade">{renderNode}</Animate>
      </div>
    )
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
