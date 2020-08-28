import React from 'react';
import ReactDOM from 'react-dom';
import Notice, { NoticeProps } from './Notice'
import { notification } from 'antd';

interface NotificationProps {
  prefixCls: string;
  style?: React.CSSProperties;
}
interface IState {
  NoticeList: NoticeProps[]
}

export default class Notification extends React.Component<NotificationProps, IState> {
  static newInstance: any;
  public readonly state: Readonly<IState> = {
    NoticeList: []
  };

  public constructor(props: NotificationProps) {
    super(props);
  }

  add = (noticeData: NoticeProps) => {
    this.setState({
      NoticeList: [noticeData]
    })
  }

  delete = () => {
    this.setState({
      NoticeList: []
    })
  }

  render(): React.ReactNode {
    const props = {
      prefixCls: this.props.prefixCls,
      onClose: this.delete
    }
    const {NoticeList} = this.state;
    const NoticeListLength = NoticeList.length;
    if(NoticeListLength){
      return <Notice {...props} />
    }else {
      return null;
    }
  }
}

Notification.newInstance = function(newInstanceFun:(Notification:Notification) => {}, NotificationProps: NotificationProps){
  const node:Element = document.createElement("div");
  node.className = "notice-list"
  document.body.appendChild(node)

  function ref(Notification: Notification){
    newInstanceFun(Notification)
  }

  ReactDOM.render(<Notification ref={ref} {...NotificationProps} />, node)
}
