import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createSubmission } from "../redux/submissionSlice";
import { toast } from "react-toastify";
import { FaFileAlt } from "react-icons/fa";

export default function SubmissionForm({ onNewSubmission }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Draft");
  const [previewUrl, setPreviewUrl] = useState(null);

  const statusOptions = ["Draft", "Submitted"];

  const allowedFileTypes = ["pdf", "jpg", "jpeg", "png", "txt", "docx"];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const ext = selectedFile.name.split(".").pop().toLowerCase();

      if (!allowedFileTypes.includes(ext)) {
        toast.error("Invalid file type! Only PDF, JPG, JPEG, PNG, TXT or DOCX files are allowed.");
        e.target.value = null;
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      setFile(selectedFile);

      // Preview for image or pdf
      if (["jpg", "jpeg", "png"].includes(ext)) {
        setPreviewUrl(URL.createObjectURL(selectedFile)); // image preview
      } else if (ext === "pdf") {
        setPreviewUrl(URL.createObjectURL(selectedFile)); // pdf preview
      } else {
        setPreviewUrl(null); // txt/docx no preview
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !file) {
      return toast.error("Please provide a title and select a valid file.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("status", status);
    formData.append("file", file);

    dispatch(createSubmission(formData))
      .unwrap()
      .then((newFile) => {
        toast.success("Submission Created!");
        if (onNewSubmission) onNewSubmission(newFile);

        setTitle("");
        setFile(null);
        setStatus("Draft");
        setPreviewUrl(null);
        navigate("/all-submissions");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="container py-4 mt-5">
      <div 
        className="card shadow-sm mx-auto rounded-4 p-3 mt-5" 
        style={{ maxWidth: "480px", width: "100%" }}
      >
        <div className="card-body">
          <h2 className="text-center mb-4" style={{ color: "#6c63ff" }}>
            Submit Document
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#6c63ff" }}>
                Title
              </label>
              <input
                type="text"
                placeholder="Document Title"
                className="form-control rounded-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#6c63ff" }}>
                Status
              </label>
              <select
                className="form-select rounded-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#6c63ff" }}>
                Upload File
              </label>
              <input
                type="file"
                className="form-control rounded-3"
                onChange={handleFileChange}
                required
              />

              {/* File Name */}
              {file && (
                <div className="mt-2 d-flex align-items-center">
                  <FaFileAlt className="me-2 text-primary" />
                  {file.name}
                </div>
              )}
            </div>

            {/* PREVIEW SECTION */}
            {previewUrl && (
              <div className="mt-3 text-center">
                <h6 className="fw-semibold mb-2" style={{ color: "#6c63ff" }}>
                  Preview
                </h6>

                {/* Image Preview */}
                {file && file.type.startsWith("image/") && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "250px", objectFit: "contain" }}
                  />
                )}

                {/* PDF Preview */}
                {file && file.type === "application/pdf" && (
                  <iframe
                    src={previewUrl}
                    title="PDF Preview"
                    style={{
                      width: "100%",
                      height: "300px",
                      border: "1px solid #ddd",
                      borderRadius: "10px"
                    }}
                  />
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 mt-4 mb-2 rounded-4"
              style={{ backgroundColor: "#6c63ff", color: "#fff" }}
            >
              Submit
            </button>

            {/* Back Button */}
            <button
              type="button"
              className="btn w-100 rounded-4"
              style={{ backgroundColor: "#6c63ff", color: "#fff" }}
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
