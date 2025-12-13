import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateSubmission } from "../redux/submissionSlice";
import { AiFillFilePdf, AiFillFileWord, AiFillFileText } from "react-icons/ai";

export default function EditSubmissionList({
  show,
  onClose,
  submission,
  onEditSuccess,
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Draft");
  const [file, setFile] = useState(null);
  const [existingFile, setExistingFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const statusOptions = ["Draft", "Submitted", "Archived"];

  useEffect(() => {
    if (submission) {
      setTitle(submission.title || "");
      setStatus(submission.status || "Draft");
      setFile(null);
      setExistingFile(submission.fileUrl || null);
      setPreviewUrl(null);
    }
  }, [submission]);

  // Handle preview for uploaded image
  useEffect(() => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);



  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png"].includes(ext)) return null; 
    if (ext === "pdf")
      return <AiFillFilePdf style={{ fontSize:60 }} className="text-danger" />;
    if (ext === "docx")
      return (
        <AiFillFileWord style={{ fontSize:60 }} className="text-primary" />
      );
    return (
      <AiFillFileText style={{ fontSize: 60}} className="text-secondary" />
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title) return toast.error("Title is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("status", status);
    if (file) formData.append("file", file);

    try {
      const updatedSubmission = await dispatch(
        updateSubmission({ id: submission._id, formData })
      ).unwrap();

      toast.success("Submission Updated!");
      onEditSuccess(updatedSubmission);
      onClose();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleUpdate}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Submission</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                ></button>
              </div>

              <div className="modal-body">
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Status</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Upload */}
                <div className="mb-3">
                  <label className="form-label fw-bold">File Upload</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  {/* Existing file */}
                  {!file && existingFile && (
                    <div className="mt-2  d-flex justify-content-center text-center" style={{textAlign:"center"}}>
                      {existingFile.match(/\.(jpeg|jpg|png)$/i) 
                      ? (
                        <img src={`http://localhost:8800/${existingFile.replace( "\\", "/")}`}
                          alt="Existing"
                          className="rounded"
                          style={{  width: "150px",  height: "100px", objectFit: "cover", borderRadius: 5, }}
                        />
                      ) : (
                        getFileIcon(existingFile)
                      )}

                    </div>
                  )}

                  {/* New file */}
                  {file && (
                    <div className="mt-2 text-primary fw-semibold d-flex justify-content-center " style={{textAlign:"center"}}>
                      {file.type.startsWith("image/")
                       ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          style={{  width: "150px",  height: "100px", objectFit: "cover",  borderRadius: 5 }}
                        />
                      ) : (
                        getFileIcon(file.name)
                      )}
                    
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
