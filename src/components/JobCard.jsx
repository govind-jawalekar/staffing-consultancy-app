import React from "react";
import { useState } from "react";
import { MapPin, IndianRupee, Building2, FileText,ChevronDown, ChevronUp } from "lucide-react";

const JobCard = ({ job, onApply }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = job.status?.toLowerCase() === "active";


  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  

  return (
    <div className="jcjc-card">
      <style>{`
     
      `}</style>

      {/* Header */}
      <div className="jcjc-header">
        <div className="jcjc-title">{job.title}</div>
        <span className={`jcjc-status ${isActive ? "open" : "closed"}`}>
          {isActive ? "Open" : "Closed"}
        </span>
      </div>

      {/* Meta */}
      <div className="jcjc-meta">
        <div className="jcjc-meta-row">
          <Building2 size={15} color="#3A8FB5" />
          {job.company}
        </div>
        <div className="jcjc-meta-row">
          <MapPin size={15} color="#c94f4f" />
          {job.location}
        </div>
        <div className="jcjc-meta-row jcjc-salary">
          <IndianRupee size={15} color="#1E4A6E" />
          {job.salary}
        </div>
      </div>

      {/* Description */}
      <div className="jcjc-desc">
      <FileText size={15} color="#7A9AB0" />
      <span
        className={`jcjc-desc-text ${isExpanded ? "expanded" : ""}`}
      >
        {job.description}
      </span>

      <button className="jcjc-see-more" onClick={toggleDescription}>
         {isExpanded ? (
            <>
              <ChevronUp size={18} strokeWidth={4}/>
            </>
          ) : (
            <>
              <ChevronDown size={18} strokeWidth={4}  />
            </>
          )}
        </button>
    </div>

      {/* Job type chip */}
      <span className="jcjc-type">{job.type}</span>

      {/* Apply button */}
      <button
        className={`jcjc-btn ${isActive ? "active" : "closed"}`}
        disabled={!isActive}
        onClick={() => {
          // console.log("Apply clicked:", job);
          onApply(job);
        }}
      >
        {isActive ? "Apply Now →" : "Position Closed"}
      </button>
    </div>
  );
};

export default JobCard;