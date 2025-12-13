// components/PreviewModal.jsx
import React from "react";
import { Modal } from "react-bootstrap";

const PreviewModal = ({ show, onClose, url }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      size="xl"
      centered
      backdrop="static"
      keyboard={false}
      style={{marginTop:"25px"}}
    >
      <Modal.Header closeButton>
        <Modal.Title>File Preview</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ height: "80vh" }}>
        <iframe
          src={url}
          title="Preview"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};

export default PreviewModal;
