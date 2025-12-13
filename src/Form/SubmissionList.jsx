import React, { useEffect, useState } from "react";
import { FaDownload, FaEye, FaTrash, FaEdit, FaList } from "react-icons/fa";
import { BiArchiveIn } from "react-icons/bi";
import { GrAscend, GrDescend } from "react-icons/gr";
import { IoRefreshSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMySubmissions, deleteSubmission } from "../redux/submissionSlice";
import DeleteSubmissionList from "./DeleteSubmissionList";
import EditSubmissionList from "./EditSubmissionList";
import ReSubmitList from "./ReSubmitList";
import Pagination from "../pages/Paggnation";
import { toast } from "react-toastify";
import api from "../middleware/api";
import { formatDate } from '../utils/Dateforment';

export default function SubmissionList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading } = useSelector((state) => state.submission);
  const { userInfo } = useSelector((state) => state.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showArchived, setShowArchived] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("submissionDate"); // default sorted column
  const [sortOrder, setSortOrder] = useState(1); // default ASC // 1 asc, -1 desc, null = remove sort

  const itemsPerPage = 8;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getMySubmissions({ status: statusFilter }));
    }
  }, [dispatch, userInfo, navigate, statusFilter]);

  const filteredList = list
    .filter((item) => {
      const isArchived = item.status?.toLowerCase() === "archived";
      return showArchived ? isArchived : !isArchived;
    })
    .filter((item) => {
  const text = search.toLowerCase();
  const formattedDate = item.submissionDate ? formatDate(item.submissionDate).toLowerCase() : "";

  return (
    item.title?.toLowerCase().includes(text) ||
    item.status?.toLowerCase().includes(text) ||
    formattedDate.includes(text)
  );
});

    

  const sortedList = [...filteredList].sort((a, b) => {
    if (!sortField || !sortOrder) return 0;

    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "submissionDate") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (valA < valB) return -1 * sortOrder;
    if (valA > valB) return 1 * sortOrder;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder(1); // default ASC
    } else if (sortOrder === 1) {
      setSortOrder(-1); // DESC
    } else {
      setSortOrder(1); // back to ASC
    }
  };
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  // Download file
  const downloadFile = async (id) => {
    try {
      const res = await api.get(`/submissions/${id}/download`, {
        responseType: "blob",
      });
      const contentDisposition = res.headers["content-disposition"];
      let fileName = "downloaded_file";
      if (contentDisposition?.includes("filename=")) {
        fileName = contentDisposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/"/g, "");
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

  // Preview file
  const handlePreview = (fileUrl) => {
    if (!fileUrl) return toast.error("No file to preview");
    const fixedUrl = `http://localhost:8800/${fileUrl.replace(/\\/g, "/")}`;
    window.open(fixedUrl, "_blank");
  };

  // Delete modal
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await dispatch(deleteSubmission(deleteId)).unwrap();
      if (res.submission) toast.info("Submission Archived!");
      else toast.success("Submission Permanently Deleted!");
      setShowDeleteModal(false);
      dispatch(getMySubmissions({ status: statusFilter }));
    } catch {
      toast.error("Failed to delete submission");
    }
  };

  // Resubmit
  const handleResubmitConfirm = async () => {
    if (!selectedFile) return;
    try {
      await api.put(`/submissions/resubmit/${selectedFile._id}`);
      toast.success("Resubmitted successfully!");
      dispatch(getMySubmissions({ status: statusFilter }));
      setModalOpen(false);
      setSelectedFile(null);
    } catch {
      toast.error("Failed to resubmit");
    }
  };

  const handleEditSuccess = () => {
    dispatch(getMySubmissions({ status: statusFilter }));
    setShowEdit(false);
  };

  return (
    <div className="container py-5 mt-5">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2 className="fw-bold m-0">My Submissions</h2>

        <input
          type="text"
          className="form-control w-100 w-md-50"
          style={{ maxWidth: "395px", borderRadius: 25 }}
          placeholder="Search Title and Date..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
          className="btn btn-success px-4 py-2"
          onClick={() => navigate("/submit")}
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-md-center mb-4 gap-3">
        <button
          className={`btn ${
            showArchived ? "btn-danger" : "btn-info"
          } px-4 py-2`}
          onClick={() => {
            setShowArchived((prev) => !prev);
            setCurrentPage(1);
          }}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          {showArchived ? (
            <>
              <FaList /> Show My Submissions
            </>
          ) : (
            <>
              <BiArchiveIn /> Show Archived
            </>
          )}
        </button>

        {/* Status Filter */}
        <div className="d-flex flex-column">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              borderRadius: "25px",
              minWidth: "120px",
              padding: "8px 12px",
              backgroundColor: "#fff",
              border: "1px solid #ced4da",
            }}
          >
            <option value="All">All</option>
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr className="text-center">
              <td>No</td>
              <th>Title</th>
              <th>Status</th>

              <th
                onClick={() => handleSort("submissionDate")}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Date
                {sortField === "submissionDate" && (
                  <span style={{ marginLeft: "5px" }}>
                    {sortOrder === 1 ? <GrAscend /> : <GrDescend />}
                  </span>
                )}
              </th>

              <th style={{ width: "240px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((s, index) => (
                <tr key={s._id}>
                  <td className="text-center align-middle">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="text-center align-middle">{s.title}</td>
                  <td className="text-center align-middle">
                    <span
                      className="badge text-dark px-3 py-2"
                      style={{ fontSize: 13 }}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="text-center align-middle">
                    <span
                      className="badge text-dark px-3 py-2"
                      style={{ fontSize: 15 }}
                    >
                      {formatDate(s.submissionDate)}
                    </span>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                      <FaDownload
                        className="action-icons text-success"
                        style={{ cursor: "pointer" }}
                        title="Download"
                        onClick={() => downloadFile(s._id)}
                      />
                      <FaEye
                        className="action-icons text-dark"
                        style={{ cursor: "pointer" }}
                        title="Preview"
                        onClick={() => handlePreview(s.fileUrl)}
                      />
                      {s.status === "Archived" && (
                        <>
                          <FaEdit
                            className="action-icons text-primary"
                            style={{ cursor: "pointer" }}
                            title="Edit"
                            onClick={() => {
                              setSelectedFile(s);
                              setShowEdit(true);
                            }}
                          />
                        </>
                      )}
                      {s.status === "Draft" && (
                        <>
                          <IoRefreshSharp
                            className="action-icons text-info"
                            style={{ cursor: "pointer" }}
                            title="Resubmit"
                            onClick={() => {
                              setSelectedFile(s);
                              setModalOpen(true);
                            }}
                          />
                          <FaEdit
                            className="action-icons text-primary"
                            style={{ cursor: "pointer" }}
                            title="Edit"
                            onClick={() => {
                              setSelectedFile(s);
                              setShowEdit(true);
                            }}
                          />
                        </>
                      )}
                      <FaTrash
                        className={`action-icons ${
                          s.status?.toLowerCase() === "archived"
                            ? "text-danger"
                            : "text-secondary"
                        }`}
                        style={{ cursor: "pointer" }}
                        title={
                          s.status?.toLowerCase() === "archived"
                            ? "Permanently Delete"
                            : "Archive"
                        }
                        onClick={() => openDeleteModal(s._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No submissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <DeleteSubmissionList
        show={showDeleteModal}
        type="archive"
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
      <ReSubmitList
        show={modalOpen}
        file={selectedFile}
        onClose={() => setModalOpen(false)}
        onConfirm={handleResubmitConfirm}
      />
      {showEdit && (
        <EditSubmissionList
          show={showEdit}
          submission={selectedFile}
          onClose={() => setShowEdit(false)}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}
