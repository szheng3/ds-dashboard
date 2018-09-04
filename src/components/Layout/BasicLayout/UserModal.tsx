import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const UserModal: React.SFC<any> = (props) => {
  return (
    <div>

      {
        Modal.info({

          title: 'This is a notification message',
          content: (
            <div>
              <p>some messages...some messages...</p>
              <p>some messages...some messages...</p>
            </div>
          ),
          onOk() {},
        })
      }

    </div>
  );
};

export default UserModal;
