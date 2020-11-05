import React from 'react';
import { Button, Modal } from 'pq-antd';

const { confirm } = Modal;

class App extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  showModalType = (type: 'info' | 'success' | 'error' | 'warning') => {
    Modal[type]({
      title: 'Do you Want to delete these items?',
      content: `Modal type: ${type}`,
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Button type="primary" onClick={this.showConfirm}>
          Open Confirm
        </Button>
        <Button type="primary" onClick={() => this.showModalType('info')}>
          info
        </Button>
        <Button type="primary" onClick={() => this.showModalType('success')}>
          success
        </Button>
        <Button type="primary" onClick={() => this.showModalType('error')}>
          error
        </Button>
        <Button type="primary" onClick={() => this.showModalType('warning')}>
          warning
        </Button>
        <Modal
          visible={this.state.visible}
          title="Basic Modal"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          onClose={this.handleCancel}
          destroyOnClose
          style={{ top: 20 }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default () => <App />;
