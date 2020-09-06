import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Notice, { NoticeProps } from './Notice';
import Animate from 'rc-animate';

interface NotificationProps {
  prefixCls: string;
  style?: React.CSSProperties;
}

interface noticeDataProps extends NoticeProps {
  key: number | string;
  content: string | ReactNode;
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
    prefixCls: 'myantd',
    style: {
      position: 'fixed',
      left: 0,
      right: 0,
      top: '100px',
    },
  };

  add = (noticeData: noticeDataProps) => {
    const { key } = noticeData;
    const { NoticeList } = this.state;
    noticeData.key = key || new Date().getTime();

    const filterIndex = NoticeList.map(item => item.key).indexOf(key);
    if (filterIndex > -1) {
      NoticeList[filterIndex] = noticeData;
    } else {
      NoticeList.push(noticeData);
    }

    this.setState({
      NoticeList: [...NoticeList],
    });
  };

  delete = (key: number | string) => {
    const { NoticeList } = this.state;
    this.setState({
      NoticeList: NoticeList.filter(item => item.key !== key),
    });
  };

  render(): React.ReactNode {
    const { prefixCls, style } = this.props;
    const { NoticeList } = this.state;
    let renderNode = NoticeList.map(item => {
      const { key, content, onClose, ...others } = item;
      const noticeProps: NoticeProps = {
        prefixCls,
        onClose: () => {
          this.delete(key);
          if (onClose) {
            onClose();
          }
        },
        children: content,
        ...others,
      };
      return <Notice {...noticeProps} key={item.key} />;
    });
    return (
      <div className={`${prefixCls}-notification`} style={style}>
        <Animate transitionName="fade">{renderNode}</Animate>
      </div>
    );
  }
}

Notification.newInstance = function(
  newInstanceFun: (Notification: Notification) => {},
  NotificationProps: NotificationProps,
) {
  const node: Element = document.createElement('div');
  node.className = `${NotificationProps.prefixCls}`;
  document.body.appendChild(node);

  function ref(Notification: Notification) {
    newInstanceFun(Notification);
  }

  ReactDOM.render(<Notification ref={ref} {...NotificationProps} />, node);
};
