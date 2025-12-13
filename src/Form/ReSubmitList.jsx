import React from "react";

const ReSubmitList = ({ show, file, onClose, onConfirm }) => {
  if (!show || !file) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Resubmit</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to resubmit "<strong>{file.title}</strong>"? 
              This will change its status <strong>{file.status}</strong> to "Submitted".
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={onConfirm}>
              Resubmit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReSubmitList;
