import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import JobCard from "../components/JobCard";
import ApplyModal from "../components/ApplyModal";
import Footer from "../components/Footer";
import { Search,SearchCheckIcon } from "lucide-react";
import toast,{Toaster} from "react-hot-toast";
import { Helmet } from "react-helmet-async";



export default function Jobs() {
   const [jobs, setJobs] = useState([]);
   const [loading, setLoading] = useState(true);
   const [query, setQuery] = useState("");
   const [cat, setCat] = useState("all");
   const [selectedJob, setSelectedJob] = useState(null);

  // 🔥 Fetch from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "jobs"),
      (snapshot) => {
        const jobsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJobs(jobsData);
        setLoading(false);
        // console.log("Jobs component mounted");
      },
      (error) => {
        // Handle Firestore permission or connection errors
        console.error("Firestore Error:", error);
        setLoading(false);
        toast.error("Failed to load jobs. Please check your connection.");
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔥 Filter logic (same UI behavior)
  const filtered = jobs.filter((j) => {
    const jobCategory = j.category?.toLowerCase() || "";
    const jobType = j.type?.toLowerCase() || "";
    const matchCat = cat === "all" || jobCategory === cat;
    const matchStatus = j.status === "active";
    const matchQ =
      !query ||
      `${j.title} ${j.company} ${j.location} ${jobType}`
        .toLowerCase()
        .includes(query.toLowerCase());

  return matchCat && matchQ && matchStatus;
});

const handleOpenApply = (job) => {
    if (job.status !== "active") {
      toast.error("This job is no longer accepting applications.");
      return;
    }
    setSelectedJob(job);
  };

  

  return (
    <>
     <Helmet>
      <title>Browse Latest Jobs | Freshers & Experienced Roles</title>
      <meta name="description" content="Explore verified job openings across IT, Finance, and Marketing. Apply now to kickstart your career with top companies." />
    </Helmet>

    
    <div className="jcj-root" id="jobs">
      <style>{`
       
      `}</style>

      {/* ── HERO ── */}
      <section className="jcj-hero">
        <div className="jcj-hero-chip">✦ Job Listings</div>
        <h1>Find Your <span>Dream Job</span></h1>
        <p className="jcj-hero-sub">Explore curated opportunities across India's top companies</p>
        <div className="jcj-search-wrap">
          <span className="jcj-search-icon"><Search size={20}/></span>
          <input
            type="text"
            placeholder="Search by job title, company, or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="jcj-search-btn" onClick={() => {
            if(!query) toast("Enter a keyword to narrow results", { icon: '🔍' });
          }}>
            Search Jobs
          </button>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="jcj-body">
        <div className="jcj-toolbar">
          <div className="jcj-tabs">
            {[["all","All Jobs"],["technical","Technical"],["non-technical","Non-Technical"]].map(([v,l]) => (
              <button key={v} className={`jcj-tab${cat === v ? " active" : ""}`} onClick={() => setCat(v)}>
                {l}
              </button>
            ))}
          </div>
          <div className="jcj-count">
            Showing <strong>{filtered.length}</strong> job{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="jcj-grid">
          {loading ? (
              <h3 className="text-center mt-5">Loading jobs...</h3>
            ) : filtered.length > 0 ? (
              filtered.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleOpenApply}
                />
              ))
            ) : (
              <div className="jcj-empty">
                <div className="jcj-empty-icon"><SearchCheckIcon size={60}/></div>
                <h3>No jobs found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
              </div>
           )}
      </div>
        {selectedJob && (
        <ApplyModal
          job={selectedJob}
          show={true}
          onClose={() => setSelectedJob(null)}
        />
      )}
      </div>
      <Footer />
    </div>
  </>
  );
}