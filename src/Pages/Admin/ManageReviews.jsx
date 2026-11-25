import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseconfig"; // your Firebase config
import { collection, getDocs, updateDoc, doc, addDoc, serverTimestamp , deleteDoc } from "firebase/firestore";
import { CircleCheckBigIcon, MessageSquare, PencilLineIcon, Plus, Star, Trash2Icon } from "lucide-react";
// import "./AdminReviews.css"; // optional custom CSS file

export default function AdminReviewsTable() {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    content: "",
    stars: 5,
    category: "candidate", // Default category
    status: "approved"    // Admin added reviews are approved by default
  });

  // Fetch all reviews
  const fetchReviews = async () => {
    setLoading(true);
    try{
      const reviewsRef = collection(db, "reviews");
      const snapshot = await getDocs(reviewsRef);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setReviews(data);
    } catch(error){
      console.log("Error Fetching reviews : ",error);
    }
    finally{
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle Manual Admin Submission
  const handleAdminAddReview = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "reviews"), {
        ...newReview,
        createdAt: serverTimestamp(),
      });
      setShowAddModal(false);
      setNewReview({ name: "", role: "", content: "", stars: 5, category: "candidate", status: "approved" });
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Approve review
  const approveReview = async (id) => {
    const reviewRef = doc(db, "reviews", id);
    await updateDoc(reviewRef, { status: "approved" });
    fetchReviews();
  };

  // Reject review
 const rejectReview = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this review? This action cannot be undone.");
  
  if (confirmDelete) {
    try {
      const reviewRef = doc(db, "reviews", id);
      await deleteDoc(reviewRef); // This removes the document from Firestore
      
      // Update local state so the UI reflects the change immediately
      setReviews(reviews.filter(r => r.id !== id));
      alert("Review deleted successfully.");
    } catch (error) {
      console.error("Error deleting review: ", error);
      alert("Failed to delete review.");
    }
  }
};

  // Start editing
  const startEditing = (id, content) => {
    setEditingId(id);
    setEditedContent(content);
  };

  // Save edited content
  const saveEdit = async (id) => {
    const reviewRef = doc(db, "reviews", id);
    await updateDoc(reviewRef, { content: editedContent });
    setEditingId(null);
    setEditedContent("");
    fetchReviews();
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditedContent("");
  };

  return (
    <>
    {/*  */}
    <style>{`
      /* Make table scroll nicely on mobile */
        .table-responsive {
        overflow-x: auto;
        }

        /* Highlight row on hover */
        .table-hover tbody tr:hover {
        background-color: #f1f1f1;
        }

        /* Style textarea inside table */
        textarea.form-control {
        resize: vertical;
        }
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5); display: flex; align-items: center;
          justify-content: center; z-index: 1050;
        }
        .admin-modal-card {
          background: white; padding: 25px; border-radius: 12px;
          width: 100%; max-width: 500px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
    `}</style>
    <div className="container py-3 px-2 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1">Review Management</h2>
          <p className="text-muted small mb-0">Approve or manually add client/candidate testimonials</p>
        </div>
        <div className="d-flex gap-2">
            <button 
              className="btn btn-primary d-flex align-items-center gap-2 px-3 rounded-pill"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={18} /> Add Review
            </button>
            <span className="badge bg-success text-light border px-3 py-2 rounded-pill d-flex align-items-center">
              {reviews.length} Total
            </span>
          </div>
      </div>
    <div className="card shadow-sm border-0 overflow-hidden">
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0" style={{ minWidth: "1000px" }}>
          <thead className="table-warning">
            <tr>
              <th className="py-3 ps-4">Reviewer</th>
              <th className="py-3">Category</th>
              <th className="py-3" style={{ width: "30%" }}>Content</th>
              <th className="py-3">Rating</th>
              <th>Status</th>
              <th className=" py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="spinner-border text-primary spinner-border-sm me-2"></div>
                    Loading...
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">No reviews found</td>
                </tr>
              ) : (
                reviews.map((r) => (
                  <tr key={r.id}>
                    {/* Reviewer Info */}
                    <td className="ps-4">
                      <div className="fw-bold">{r.name}</div>
                      <div className="small text-muted">{r.role}</div>
                    </td>
                    <td>
                        <span className={`badge ${r.category === 'client' ? 'bg-info' : 'bg-secondary'}`}>
                          {r.category || "candidate"}
                        </span>
                    </td>

                    {/* Review Content */}
                    <td>
                      {editingId === r.id ? (
                        <div className="d-flex flex-column gap-2">
                          <textarea
                            className="form-control form-control-sm"
                            rows="3"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                          />
                          <div className="d-flex gap-2">
                            <button className="btn btn-xs btn-success py-1 px-2" onClick={() => saveEdit(r.id)}>Save</button>
                            <button className="btn btn-xs btn-outline-secondary py-1 px-2" onClick={() => setEditingId(null)}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p className="small text-muted mb-0 lh-sm" style={{ maxWidth: "400px" }}>
                          <MessageSquare size={12} className="me-1" />
                          {r.content}
                        </p>
                      )}
                    </td>

                    {/* Rating */}
                    <td>
                      <div className="d-flex text-warning">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < r.stars ? "#ffc107" : "none"} className={i < r.stars ? "" : "text-muted opacity-25"} />
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`badge rounded-pill ${
                        r.status === "approved" ? "bg-success-subtle text-success border border-success" : 
                        r.status === "pending" ? "bg-warning-subtle text-warning border border-warning" : 
                        "bg-danger-subtle text-danger border border-danger"
                      }`}>
                        {r.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        {editingId !== r.id && (
                          <>
                            <button 
                              className="btn btn-sm btn-outline-primary p-2" 
                              onClick={() => startEditing(r.id, r.content)}
                              title="Edit Content"
                            >
                              <PencilLineIcon size={16}/>
                            </button>
                            {r.status !== "approved" && (
                              <button 
                                className="btn btn-sm btn-outline-success p-2" 
                                onClick={() => approveReview(r.id)}
                                title="Approve"
                              >
                                <CircleCheckBigIcon size={16}/>
                              </button>
                            )}
                            {r.status !== "rejected" && (
                              <button 
                                className="btn btn-sm btn-outline-danger p-2" 
                                onClick={() => rejectReview(r.id)}
                                title="Reject"
                              >
                                <Trash2Icon size={16}/>
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  {showAddModal && (
        <div className="modal-overlay">
          <div className="admin-modal-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Add New Testimonial</h5>
              <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
            </div>
            <form onSubmit={handleAdminAddReview}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Reviewer Name</label>
                <input type="text" className="form-control" required value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Role / Company</label>
                <input type="text" className="form-control" value={newReview.role} onChange={(e) => setNewReview({...newReview, role: e.target.value})} />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Category</label>
                  <select className="form-select" value={newReview.category} onChange={(e) => setNewReview({...newReview, category: e.target.value})}>
                    <option value="candidate">Candidate (Student)</option>
                    <option value="client">Client (Company)</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold">Rating (1-5)</label>
                  <input type="number" min="1" max="5" className="form-control" value={newReview.stars} onChange={(e) => setNewReview({...newReview, stars: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Review Content</label>
                <textarea className="form-control" rows="4" required value={newReview.content} onChange={(e) => setNewReview({...newReview, content: e.target.value})}></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Add Testimonial</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}