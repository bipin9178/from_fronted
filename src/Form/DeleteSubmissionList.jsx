import React from "react";

export default function DeleteSubmissionList({ show, onClose, onConfirm }) {

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
          <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                ></button>
          </div>
          <div className="modal-body">
            
            <p>Are you sure you want to delete this submission?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
