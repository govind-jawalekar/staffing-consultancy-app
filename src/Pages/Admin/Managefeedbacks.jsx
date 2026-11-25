import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db,auth } from "../../firebase/firebaseconfig";
import { Mail, Phone, User } from "lucide-react";
// console.log("Admin UID:", auth.currentUser?.uid);

const ManageFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const q = query(
          collection(db, "feedbacks"),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);

        const apps = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFeedbacks(apps);
      } catch (error) {
        console.error("Error fetching Feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

//   if (loading) return <p>Loading Feedbacks...</p>;

  return (
    
    <div className="container py-3 px-2 px-md-4">
      <div className="d-flex justify-content-between align-items-center mb-4 px-2">
        <div>
          <h3 className="h4 fw-bold mb-1">User Feedbacks</h3>
          <p className="text-muted small mb-0">Inquiries from users</p>
        </div>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill">
          {feedbacks.length} Messages
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading Feedbacks...</p>
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="card shadow-sm border-0 p-5 text-center">
          <MessageSquare size={48} className="text-muted mx-auto mb-3" />
          <p className="text-muted">No feedbacks found.</p>
        </div>
      ) : (
        <div className="card shadow-sm border-0 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0" style={{ minWidth: "1000px" }}>
              <thead className="table-warning">
                <tr>
                  <th className="py-3 text-center"><User size={16} className="me-2"/>Sender</th>
                  <th className="py-3 text-center"><Mail size={16} className="me-2"/>Contact Info</th>
                  <th className="py-3 text-center">Subject</th>
                  <th className="py-3 text-center" style={{ width: "40%" }}>Message</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td className="fw-bold text-dark">{feedback.name}</td>
                    <td><div className="small d-flex align-items-center gap-1">
                        <Mail size={14} className="text-muted"/> {feedback.email}
                      </div>
                      <div className="small d-flex align-items-center gap-1 mt-1 text-muted">
                        <Phone size={14}/> {feedback.phone || "N/A"}
                      </div>
                    </td>
                    <td><span className="badge bg-light text-dark border fw-medium px-2 py-1">
                        {feedback.subject}
                      </span>
                    </td>
                    <td><div 
                        className="text-muted small text-wrap" 
                        style={{ maxWidth: "400px", lineHeight: "1.5" }}
                      >
                        {feedback.message}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  
  );
};

export default ManageFeedbacks;