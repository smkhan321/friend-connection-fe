import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ConfirmModalProps {
  show: boolean;
  handleClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal! Woohoo, you are reading this text in a modal! Woohoo, you are reading this text in a modal! Woohoo, you are reading this text in a modal!Woohoo, you are reading this text in a modal!Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button className='smallBtn reverseBtn' onClick={handleClose}>
          Cancel
        </Button>
        <Button className='smallBtn' variant="primary" onClick={handleClose}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
