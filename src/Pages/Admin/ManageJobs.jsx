import React, { useState, useEffect,useCallback } from "react";
import {collection,addDoc,getDocs,deleteDoc,doc,updateDoc} from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";
import { Trash2, Pencil, Plus,Search } from "lucide-react";
import toast ,{Toaster} from "react-hot-toast";
import "./AdminAddjobs.css";

/* ----------------------------------------
   Empty Form Template
-----------------------------------------*/
const EMPTY_FORM = {
  title: "",
  company: "",
  location: "",
  salary: "",
  type: "Full-Time",
  category:"",
  description: "",
};

const AdminAddJob = () => {
  /* ----------------------------------------
     States
  -----------------------------------------*/
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null);
  const [showModal, setShowModal] = useState(false); // ✅ React controlled modal
  const [searchTerm, setSearchTerm] = useState("");  //  Added  Search State

  /* ----------------------------------------
     Fetch Jobs on Load
  -----------------------------------------*/
  
    const fetchJobs = useCallback( async () => {
      setFetching(true);
      setFetchError(null);
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(data);
      } catch (error) {
        console.error(error);
        setFetchError("Failed to synchronize job records.");
        toast.error("Network Error: Could not reach database.");
      } finally {
        setFetching(false);
      }
    },[]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  /* ----------------------------------------
     Handle Input Change
  -----------------------------------------*/
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ----------------------------------------
     Open Add Modal
  -----------------------------------------*/
  const handleAddNew = () => {
    setFormData(EMPTY_FORM);
    setEditingJobId(null);
    setShowModal(true);
  };

  /* ----------------------------------------
     Edit Job
  -----------------------------------------*/
  const handleEdit = (job) => {
    setFormData(job);
    setEditingJobId(job.id);
    setShowModal(true);
  };

  /* ----------------------------------------
     Submit (Add / Update)
  -----------------------------------------*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const actionToast = toast.loading(editingJobId ? "Updating job..." : "Posting new job...");
    try {
      if (editingJobId) {
        // 🔥 Update existing job
        await updateDoc(doc(db, "jobs", editingJobId), formData);

        setJobs((prev) =>
          prev.map((job) =>
            job.id === editingJobId ? { ...job, ...formData } : job
          )
        );
        toast.success("Job updated successfully!", { id: actionToast });
      } else {
        // 🔥 Add new job
        const docRef = await addDoc(collection(db, "jobs"), {
          ...formData,
          createdAt: new Date(),
          status: "active",
        });

        setJobs((prev) => [
          { id: docRef.id, ...formData, status: "active" },
          ...prev,
        ]);
        toast.success("New job posted!", { id: actionToast });
      }

      setFormData(EMPTY_FORM);
      setEditingJobId(null);
      setShowModal(false); // ✅ Close modal cleanly
    } catch (error) {
      console.error(error);
      toast.error("Save failed. Check permissions.", { id: actionToast });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------
     Delete Job
  -----------------------------------------*/
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will permanently remove the job posting.")) return;
    const deleteToast = toast.loading("Removing job...");
    try{
      await deleteDoc(doc(db, "jobs", id));
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success("Job deleted successfully", { id: deleteToast });
    } catch(error){
      toast.error("Delete failed.",{id:deleteToast});
    }
  };

  
 
      // Filter jobs based on search
    const filteredJobs = jobs.filter((job) => {
      const term = searchTerm.toLowerCase();

      return (
        job.title?.toLowerCase().includes(term) ||
        job.company?.toLowerCase().includes(term) ||
        job.location?.toLowerCase().includes(term) ||
        job.type?.toLowerCase().includes(term)
      );
    });

    // Toggle Job Status
    const handleToggleStatus = async (job) => {
      const newStatus = job.status === "active" ? "closed" : "active";
      const statusToast = toast.loading(`Changing status to ${newStatus}...`);

      try {
        await updateDoc(doc(db, "jobs", job.id), {
          status: newStatus,
        });

        // Update UI instantly
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id ? { ...j, status: newStatus } : j
          )
        );
        toast.success(`Position ${newStatus}`, { id: statusToast });
      } catch (error) {
        console.error(error);
        toast.error("Status update failed.", { id: statusToast });
      }
    };

  return (
    <div className="container-fluid p-4 py-3 px-2 px-md-4">
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
     <style>{`
        th,td{
          text-align:center;
          }
     `}</style>
      {/* Header */}
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
        <div>
          <h2 className="h4 fw-bold mb-1">Jobs Management</h2>
          <p className="text-muted small mb-0">Create, update and manage job postings</p>
          
        </div>
        <button className="btn btn-dark d-flex align-items-center justify-content-center gap-2" onClick={handleAddNew}>
          <Plus size={18} /> Add New Job
        </button>
        
      </div>

      {/* Job Table Card */}
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="card-header bg-white py-3 border-bottom-0">
  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
    
    {/* Search Bar Container */}
    <div className="position-relative w-100" style={{ maxWidth: "350px" }}>
      <Search 
        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" 
        size={16} 
      />
      <input
        type="text"
        placeholder="Search by title, company..."
        className="form-control ps-5 shadow-sm border-light-subtle"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Badge Container */}
    <div className="d-flex align-items-center">
      <span className="badge bg-dark-subtle text-dark border px-3 py-2 rounded-pill shadow-sm">
        Total Jobs: <span className="fw-bold ms-1 text-primary">{jobs.length}</span>
      </span>
    </div>

  </div>
</div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle mb-0" style={{ minWidth: "900px" }}>
            <thead className="table-warning">
              <tr>
                <th>Role & Company</th>
                <th>Location</th>
                <th>Details</th>
                <th>Status</th>
                <th >Actions</th>
              </tr>
            </thead>

            <tbody>
  {fetching ? (
    <tr>
      <td colSpan="5" className="text-center py-5">
        <div className="spinner-border text-primary mb-2" role="status"></div>
        <p className="text-muted small">Loading records...</p>
      </td>
    </tr>
  ) : fetchError ? (
    <tr>
      <td colSpan="5" className="text-center py-5">
        <div className="text-danger mb-2">
          {/* Ensure you import AlertCircle and RefreshCw from lucide-react */}
          <i className="bi bi-exclamation-triangle fs-2"></i> 
        </div>
        <p className="text-muted">{fetchError}</p>
        <button className="btn btn-outline-primary btn-sm" onClick={fetchJobs}>
          Retry
        </button>
      </td>
    </tr>
  ) : filteredJobs.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center py-5 text-muted">
        No matching jobs found.
      </td>
    </tr>
  ) : (
    filteredJobs.map((job) => (
      <tr key={job.id}>
        <td className="fw-semibold">
          <div className="fw-bold text-dark">{job.title}</div>
          <div className="text-muted small">{job.company}</div>
        </td>
        <td><span className="text-muted">{job.location}</span></td>
        <td>
          <div className="small">{job.type}</div>
          <div className="text-primary fw-medium small">{job.salary}</div>
        </td>
        <td>
          <span className={`badge rounded-pill ${
            job.status === "active" 
              ? "bg-success-subtle text-success border border-success" 
              : "bg-danger-subtle text-danger border border-danger"
          }`}>
            {job.status}
          </span>
        </td>
        <td className="text-center">
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(job)} title="Edit">
              <Pencil size={16} />
            </button>
            <button 
              className={`btn btn-sm ${job.status === "active" ? "btn-outline-warning" : "btn-outline-success"}`} 
              onClick={() => handleToggleStatus(job)} 
              title="Toggle Position"
            >
              {job.status === "active" ? "Close" : "Open"}
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(job.id)} title="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>
          </table>
        </div>
      </div>

      {/* ----------------------------------------
         React Controlled Modal
      -----------------------------------------*/}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex={1}>
            <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down">
              <div className="modal-content border-0 shadow">

                <div className="modal-header">
                  <h5 className="modal-title fw-bold">{editingJobId ? "Update Job Posting" : "Create New Job"}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body p-4" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Job Title</label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Software Engineer"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Company</label>
                        <input
                          type="text"
                          name="company"
                          className="form-control"
                          value={formData.company}
                          onChange={handleChange}
                          
                          placeholder="e.g. Google"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Location</label>
                        <input
                          type="text"
                          name="location"
                          className="form-control"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          placeholder="City, State"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Salary Range</label>
                        <select
                          name="salary"
                          className="form-select"
                          value={formData.salary}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select  Range</option>
                          <option value="0 - 5k">0 - 5k</option>
                          <option value="10k - 15k">10k - 15k</option>
                          <option value="15k - 20k">15k - 20k</option>
                          <option value="20k - 25k">20k - 25k</option>
                          <option value="25k - 30k">25k - 30k</option>
                          <option value="30k - 40k">30k - 40k</option>
                          <option value="40k - 50k">40k - 50k</option>
                          <option value="50k+">50k+</option>
                          <option value="unpaid">Unpaid</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Job Type</label>
                        <select
                          name="type"
                          className="form-select"
                          value={formData.type}
                          onChange={handleChange}
                        >
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Internship">Internship</option>
                          <option value="Remote">Remote</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Category</label>
                        <select
                          name="category"
                          className="form-select"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option value="Technical">Technical</option>
                          <option value="Non-Technical">Non-Technical</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label small fw-bold">Description</label>
                        <textarea
                          name="description"
                          className="form-control"
                          rows="3"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer bg-light">
                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-dark px-4"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : editingJobId ? "Save Changes" : "Post Job"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Manual backdrop (prevents blur bug) */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default AdminAddJob;