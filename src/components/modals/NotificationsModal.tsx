import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ConfirmModalProps {
  show: boolean;
  handleClose: () => void;
}
const data = [
    {
      head: "heading 1",
      desc: "   Lorem ipsum dolor sit amet consectetur",
    },
    {
      head: "heading 1",
      desc: "   Lorem ipsum dolor sit amet consectetur",
    },
    {
      head: "heading 1",
      desc: "   Lorem ipsum dolor sit amet consectetur",
    },
    {
      head: "heading 1",
      desc: "   Lorem ipsum dolor sit amet consectetur",
    },
    {
      head: "heading 1",
      desc: "   Lorem ipsum dolor sit amet consectetur",
    },
    {
      head: "heading 1",
      desc: "   Lorem ipsum dolor sit amet consectetur",
    },
    {
      head: "heading 1",
      desc: "   Lorem ipsum dolor sit amet consectetur",
    },
    {
      head: "heading 1",
      desc: "   Lorem ipsum dolor sit amet consectetur",
    },
    {
      head: "heading 1",
      desc: "   Lorem ipsum dolor sit amet consectetur",
    },
  ];
const NotificationsModal: React.FC<ConfirmModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '600px', overflowY: 'auto', padding: '20px' }}>
      <div className="notificationsMainDiv px-3 notificationsMainDivunset">
            {data?.length > 0 ? (
              data?.map((item) => {
                return (
                  <div className="notification">
                    <div>
                      {/* <img src={item?.notification_from?.image} alt="" /> */}
                    </div>
                    <div className="ml25">
                      <h5 className="notificationH5">{item?.head}</h5>
                      <p className="notificationP">
                        {item?.desc} &nbsp;
                        {/* <span className="green">View More</span> */}
                        <button className="btn smallBtn mt-2">View More</button>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="notification noNotification">
                <p className="notificationP">No current notifications</p>
              </div>
            )}
          </div>

      </Modal.Body>
      {/* <Modal.Footer>
        <Button className='smallBtn reverseBtn' onClick={handleClose}>
          Close
        </Button>
        <Button className='smallBtn' variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default NotificationsModal;
