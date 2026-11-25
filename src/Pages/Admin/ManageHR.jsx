import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";
import AddHrModal from "../../components/AddHRModal";
import { PencilLine, Search, Trash2, UserPlus, Users, AlertCircle, RefreshCw } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const FetchHR = () => {
  const [hrs, setHrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editHR, setEditHR] = useState(null);

  const fetchHRs = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("role", "==", "hr"));
      const snapshot = await getDocs(q);
      const hrList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setHrs(hrList);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the database. Please check your connection.");
      toast.error("Failed to load HR records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHRs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this HR? This action cannot be undone.")) return;
    
    const loadingToast = toast.loading("Deleting HR...");
    try {
      await deleteDoc(doc(db, "Users", id));
      toast.success("HR record deleted successfully", { id: loadingToast });
      fetchHRs();
    } catch (err) {
      console.error("Error deleting HR:", err);
      toast.error("Could not delete HR. Permission denied.", { id: loadingToast });
    }
  };

  const filteredHRs = hrs.filter((hr) =>
    hr.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-3 px-2 px-md-4">
      {/* Toast Provider */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header Section */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
        <div>
          <h2 className="h4 fw-bold mb-1">HR Management</h2>
          <p className="text-muted small mb-0">Manage human resource accounts and permissions</p>
        </div>
        <button
          className="btn btn-success d-flex align-items-center justify-content-center gap-2 px-4 shadow-sm"
          onClick={() => { setEditHR(null); setShowModal(true); }}
        >
          <UserPlus size={18} /> Add HR
        </button>
      </div>

      {/* Search & Stats Section */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-4">
              <div className="position-relative">
                <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
                <input
                  type="text"
                  className="form-control ps-5 border-light-subtle shadow-sm"
                  placeholder="Search HR by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-8 d-flex justify-content-md-end">
              <div className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill">
                <Users size={14} className="me-1" /> Total HRs: {hrs.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success mb-3" role="status"></div>
              <p className="text-muted animate-pulse">Searching records...</p>
            </div>
          ) : error ? (
            /* --- Professional Error State --- */
            <div className="text-center py-5 px-3">
              <AlertCircle size={48} className="text-danger mb-3" />
              <h5 className="fw-bold text-dark">Data Fetch Error</h5>
              <p className="text-muted mx-auto" style={{ maxWidth: "400px" }}>{error}</p>
              <button className="btn btn-outline-primary btn-sm mt-2" onClick={fetchHRs}>
                <RefreshCw size={14} className="me-2" /> Retry Connection
              </button>
            </div>
          ) : filteredHRs.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <Search size={40} className="mb-2 opacity-25" />
              <p>No HRs found matching "{search}"</p>
            </div>
          ) : (
            <table className="table table-hover table-bordered align-middle mb-0" style={{ minWidth: "800px" }}>
              <thead className="table-warning border-bottom">
                <tr>
                  <th className="ps-4 py-3">Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHRs.map((hr) => (
                  <tr key={hr.id}>
                    <td className="ps-4 fw-bold text-dark">{hr.name}</td>
                    <td className="text-muted">{hr.email}</td>
                    <td className="text-muted">{hr.mobile || "N/A"}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-sm btn-outline-primary border-0 bg-light-hover" onClick={() => { setEditHR(hr); setShowModal(true); }}>
                          <PencilLine size={18} />
                        </button>
                        <button className="btn btn-sm btn-outline-danger border-0 bg-light-hover" onClick={() => handleDelete(hr.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Components */}
      <AddHrModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
            toast.success(editHR ? "HR updated!" : "HR added successfully!");
            fetchHRs();
        }}
        hrData={editHR}
      />
    </div>
  );
};

export default FetchHR;