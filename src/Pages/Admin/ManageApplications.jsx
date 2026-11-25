import React, { useEffect, useState,useCallback } from "react";
import { collection, getDocs, query, orderBy,updateDoc,doc } from "firebase/firestore";
import { db,auth } from "../../firebase/firebaseconfig";
import { CircleCheckBig,  Eye,  FileText,  X } from "lucide-react";
import toast,{Toaster} from "react-hot-toast";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState(null);

 
    const fetchApplications = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(
          collection(db, "applications"),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);

        const apps = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setApplications(apps);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications. Please try again later.");
        toast.error("Network error: Could not fetch data.");
      } finally {
        setLoading(false);
      }
    },[]);

   useEffect(()=>{
      fetchApplications();
    }, [fetchApplications]);

  const updateStatus = async (id, newStatus) => {
    const loadingToast=toast.loading(`Updating status to ${newStatus}...`);
  try {
    const appRef = doc(db, "applications", id);

    await updateDoc(appRef, {
      status: newStatus
    });

    // Update UI without reloading
    setApplications((prev) =>
      prev.map((app) => app.id === id ? { ...app, status: newStatus } : app)
    );
    toast.success(`Candidate ${newStatus === 'accepted' ? 'Accepted' : 'Rejected'}`,{id:loadingToast,});
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Update failed. Check your permissions.",{id:loadingToast,});
  }
};

  // if (loading) return <p>Loading applications...</p>;

  return (
    <>
    <style>{`
     th{
       text-align:center;
     }
    `}</style>
    <div className="container py-2 px-0 px-md-2">
      <Toaster position="top-right" reverseOrder={false}/>

      <div className="d-flex justify-content-between align-items-center mb-4 px-2">
        <div>
          <h3 className="h4 fw-bold mb-1">Applied Candidates</h3>
          <p className="text-muted small mb-0">Manage incoming job applications</p>
        </div>
        <div className="badge bg-dark-subtle text-dark border px-3 py-2 rounded-pill shadow-sm">
          {applications.length} Total Applications
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-medium">Fetching candidate data...</p>
        </div>
      ) : error ? (
        <div className="card border-danger bg-danger-subtle p-5 text-center">
          <ArticleCircle className="text-danger mx-auto mb-3" size={48} />
          <h5 className="text-danger fw-bold">Connection Error</h5>
          <p className="text-dark mb-3">{error}</p>
          <button className="btn btn-danger w-auto mx-auto" onClick={fetchApplications}>
            Retry Fetch
          </button>
        </div>
        ) : applications.length === 0 ? (
        <div className="card shadow-sm border-0 p-5 text-center">
          <FileText className="text-muted mx-auto mb-3 opacity-25" size={60} />
          <p className="text-muted mb-0">No applications have been submitted yet.</p>
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0" style={{ minWidth: "1000px" }}>
          <thead className="table-dark">
            <tr className="text-nowrap">
              <th>Candidate</th>
              <th>Job Details</th>
              <th>Experience</th>
              <th>Notice Period</th>
              <th>Status</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>
                      <div className="fw-bold">{app.name}</div>
                      <small className="text-muted d-block">{app.email}</small>
                      <small className="text-muted">{app.phone}</small>
                  </td>
                  <td><div className="fw-semibold">{app.jobTitle}</div>
                      <small className="text-muted">{app.company}</small>
                  </td>

                  <td>{app.experience}</td>
                  <td>{app.noticeperiod}</td>

                  <td>
                    <span className={`badge rounded-pill ${
                        app.status === "accepted" ? "bg-success-subtle text-success border border-success" :
                        app.status === "rejected" ? "bg-danger-subtle text-danger border border-danger" :
                        "bg-warning-subtle text-warning border border-warning"
                      }`}>
                        {app.status}
                      </span>
                  </td>

                  <td>
                    <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1">
                        <Eye size={14} /> View
                      </a>
                  </td>

                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                        {app.status === "pending" ? (
                          <>
                            <button className="btn btn-sm btn-success p-2" onClick={() => updateStatus(app.id, "accepted")} title="Accept">
                              <CircleCheckBig size={18}/>
                            </button>
                            <button className="btn btn-sm btn-danger p-2" onClick={() => updateStatus(app.id, "rejected")} title="Reject">
                              <X size={18}/>
                            </button>
                          </>
                        ) : (
                          <small className="text-muted italic">Processed</small>
                        )}
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
    </>
  );
};

export default AdminApplications;