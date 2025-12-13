import React, { useEffect, useState } from "react";
import { FiEye, FiDownload } from "react-icons/fi";
import { FaCalendarAlt, FaUserCircle,FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { BiCategory } from "react-icons/bi";
import { AiFillFilePdf, AiFillFileWord, AiFillFileText } from "react-icons/ai";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import api from "../middleware/api";
import PreviewModal from "./Preview";
import EditSubmissionList from "./EditSubmissionList";
import "../../public/css/FileCard.css";

const FileDetailsCard = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEdit, setShowEdit] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const itemsPerPage = 6;

  // Fetch Submitted Files
  const fetchFiles = async () => {
    try {
      const res = await api.get(`/submissions/my-all-list`);
      setFiles(res.data);
      setFilteredFiles(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch files.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    const submittedFiles = files.filter((file) => {
      const title = file.title?.toLowerCase() || "";
      const username = file.user?.username?.toLowerCase() || "";
      const status = file.status?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      return title.includes(search) || username.includes(search) || status.includes(search);
    });

    setFilteredFiles(submittedFiles);
  }, [files, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);

  const getFileTypeIcon = (fileUrl) => {
    if (!fileUrl)
      return <AiFillFileText className="text-secondary" style={{ fontSize: 40 }} />;

    const ext = fileUrl.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png"].includes(ext)) {
      return (
        <img
          src={`http://localhost:8800/${fileUrl.replace("\\", "/")}`}
          style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
        />
      );
    }

    switch (ext) {
      case "pdf":
        return <AiFillFilePdf className="text-danger" style={{ fontSize: 50 }} />;
      case "docx":
        return <AiFillFileWord className="text-primary" style={{ fontSize: 50 }} />;
      default:
        return <AiFillFileText className="text-secondary" style={{ fontSize: 50 }} />;
    }
  };

  const handlePreview1 = async (file) => {
    const fileUrl = `http://localhost:8800/${file.fileUrl.replace("\\", "/")}`;
    const ext = file.fileUrl.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "pdf"].includes(ext)) {
      setPreviewUrl(fileUrl);
      setShowPreview(true);
      return;
    }

    setPreviewUrl(`https://docs.google.com/viewer?url=${fileUrl}&embedded=true`);
    setShowPreview(true);
  };

  const handleDownload = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("User not logged in");

    try {
      const res = await api.get(`/submissions/${id}/download`, {
        responseType: "blob",
      });

      const contentDisposition = res.headers["content-disposition"];
      let fileName = "downloaded_file";

      if (contentDisposition?.includes("filename=")) {
        fileName = contentDisposition.split("filename=")[1].split(";")[0].replace(/"/g, "");
      }

      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Download failed");
    }
  };

  return (
    <>
      <div className="container py-5 mt-5">
        {/* Search Input */}
        <div className="row mb-4 align-items-center g-2">
          <div className="col-lg-12 col-md-12">
            <input
              type="text"
              className="form-control form-control-lg shadow-sm"
              placeholder="Search by title, username, status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: "25px", padding: "10px" }}
            />
          </div>
        </div>

        {/* File Cards */}
        <div className="row g-4">


          {loading &&
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="col-12 col-md-6 col-lg-4">
                  <div className="modern-card">
                    <Skeleton height={60} width={60} />

                    <div className="title-row">
                      <Skeleton height={20} width={`80%`} />
                    </div>

                    <Skeleton height={15} width={`60%`} />
                    <Skeleton height={15} width={`70%`} />
                    <Skeleton height={15} width={`50%`} />

                    <div className="action-buttons mt-3">
                      <Skeleton height={40} width={100} />
                      <Skeleton height={40} width={100} />
                    </div>
                  </div>
                </div>
              ))}

          {!loading && currentItems.length === 0 && (
            <h4 className="text-center text-muted mt-5">No submissions found</h4>
          )}

          {!loading &&
            currentItems.map((file) => (
              <div key={file._id} className="col-12 col-md-6 col-lg-4">
                <div className="modern-card">
                  <div className="file-icon-wrapper">{getFileTypeIcon(file.fileUrl)}</div>

                  <div className="title-row">
                    <h5 className="file-title">{file.title}</h5>
                  </div>

                  <p className="file-user">
                    {/* {/* <strong>Submitted by:</strong>  */}
                    <FaUser size={28} style={{ color: "#ffd700", paddingRight: 10}} />
                    <strong>{file.user?.username || "N/A"}</strong> 
                  </p>

                
                  <p className="file-date">
                    <FaCalendarAlt size={28} style={{ color: "#ff6b6b", paddingRight: 10}} />{" "}
                    {file.submissionDate
                      ? format(new Date(file.submissionDate), "MMM dd, yyyy ")
                      : "N/A"}
                  </p>
                  
                  {/* <p className="file-status">
                    <BiCategory size={28} style={{ color: "#ff6b6b", paddingRight: 10 }} />{" "}
                    <span>{file.status}</span>
                  </p> */}

                  <div className="action-buttons">
                    <button className="btn-modern preview" onClick={() => handlePreview1(file)}>
                      <FiEye /> Preview
                    </button>

                    <button className="btn-modern download" onClick={() => handleDownload(file._id)}>
                      <FiDownload /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
                    Previous
                  </button>
                </li>

                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <EditSubmissionList
          show={showEdit}
          submission={selectedFile}
          onClose={() => setShowEdit(false)}
          onEditSuccess={() => fetchFiles()}
        />
      )}

      {/* Preview Modal */}
      <PreviewModal show={showPreview} url={previewUrl} onClose={() => setShowPreview(false)} />
    </>
  );
};

export default FileDetailsCard;
