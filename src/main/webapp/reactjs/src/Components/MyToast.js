import React from 'react';
import { Toast } from 'react-bootstrap';

class MyToast extends React.Component {
  render() {
    const toastCss = {
      position: 'fixed',
      top: '70px',
      right: '20px',
      zIndex: 9999
    };

    return (
      <div style={toastCss}>
        <Toast className={`border text-white ${this.props.children.type === 'danger' ? 'bg-danger' : 'bg-success'}`}>
          <Toast.Header closeButton={false} className={`text-white ${this.props.children.type === 'danger' ? 'bg-danger' : 'bg-success'}`}>
            <strong className="mr-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{this.props.children.message}</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default MyToast;
