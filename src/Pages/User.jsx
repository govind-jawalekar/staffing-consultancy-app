import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc,updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Building2,FileText, PencilLine, SearchCheckIcon } from "lucide-react";
import toast,{Toaster} from "react-hot-toast";





const STATUS_STYLE = {
  Pending:  { bg:"#FFF7E6", border:"#F5A623", color:"#B86B00", dot:"#F5A623" },
  Reviewed: { bg:"#E8F1FB", border:"#3A8FB5", color:"#1E4A6E", dot:"#3A8FB5" },
  Accepted: { bg:"#E8F8EF", border:"#34A85A", color:"#1E6B3A", dot:"#34A85A" },
  Rejected: { bg:"#FDECEA", border:"#E05C5C", color:"#A83232", dot:"#E05C5C" },
};

const TABS = ["All","Pending","Accepted","Rejected"];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700;800;900&family=Lato:wght@400;600;700&display=swap');
:root{--jc-navy:#12263F;--jc-steel:#1E4A6E;--jc-sky:#2D6A96;--jc-accent:#3A8FB5;--jc-mist:#E8F1F8;--jc-cloud:#F4F8FB;--jc-divider:#D0DFE9;--jc-txt-sec:#4A6A82;--jc-muted:#7A9AB0;--jc-white:#FFFFFF;}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.jcp-root{font-family:'Lato',sans-serif;background:var(--jc-cloud);min-height:100vh;color:var(--jc-navy);z-index:1;}

/* HERO */
.jcp-hero{background:linear-gradient(150deg,var(--jc-navy) 0%,var(--jc-steel) 55%,var(--jc-sky) 100%);padding:44px 80px 0;position:relative;overflow:hidden;}
.jcp-hero::before{content:'';position:absolute;top:-80px;right:-80px;width:380px;height:380px;border-radius:50%;background:rgba(58,143,181,0.10);pointer-events:none;}
.jcp-hero::after{content:'';position:absolute;bottom:-60px;left:-60px;width:240px;height:240px;border-radius:50%;background:rgba(18,38,63,0.20);pointer-events:none;}
.jcp-hero-inner{position:relative;z-index:2;max-width:1080px;margin:0 auto;display:flex;align-items:flex-end;justify-content:space-between;gap:20px;}
.jcp-hero-left{display:flex;align-items:flex-end;gap:24px;}
.jcp-avatar{width:84px;height:84px;border-radius:50%;background:linear-gradient(135deg,var(--jc-accent),var(--jc-sky));border:4px solid rgba(255,255,255,0.22);display:flex;align-items:center;justify-content:center;font-family:'Raleway',sans-serif;font-size:1.8rem;font-weight:900;color:var(--jc-white);flex-shrink:0;box-shadow:0 8px 28px rgba(18,38,63,0.28);position:relative;top:14px;}
.jcp-hero-info{padding-bottom:18px;}
.jcp-chip{display:inline-flex;align-items:center;gap:6px;background:rgba(58,143,181,0.22);border:1px solid rgba(58,143,181,0.50);color:var(--jc-mist);font-size:0.68rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-bottom:8px;}
.jcp-hero-info h1{font-family:'Raleway',sans-serif;font-size:clamp(1.3rem,3vw,1.9rem);font-weight:900;color:var(--jc-white);line-height:1.1;margin-bottom:5px;}
.jcp-hero-email{font-size:0.82rem;color:rgba(232,241,248,0.70);}
.jcp-signout{background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.22);color:rgba(232,241,248,0.85);font-family:'Lato',sans-serif;font-size:0.78rem;font-weight:700;padding:8px 18px;border-radius:8px;cursor:pointer;transition:background 0.2s;margin-bottom:22px;white-space:nowrap;}
.jcp-signout:hover{background:rgba(255,255,255,0.18);}

/* TABS */
.jcp-tabs{position:relative;z-index:2;display:flex;gap:3px;overflow-x:auto;max-width:1080px;margin:22px auto 0;scrollbar-width:none;}
.jcp-tabs::-webkit-scrollbar{display:none;-webkit-overflow-scrolling:touch;}
.jcp-tab{padding:10px 20px;border-radius:10px 10px 0 0;font-family:'Lato',sans-serif;font-size:0.80rem;font-weight:700;cursor:pointer;border:none;background:rgba(255,255,255,0.08);color:rgba(232,241,248,0.60);transition:all 0.18s;white-space:nowrap;}
.jcp-tab:hover{background:rgba(255,255,255,0.14);color:var(--jc-white);}
.jcp-tab.active{background:var(--jc-cloud);color:var(--jc-navy);}

/* BODY */
.jcp-body{max-width:1400px;margin:0 auto;padding:28px 80px 64px;display:grid;grid-template-columns:320px 1fr;gap:24px;align-items:start;}

/* PROFILE CARD */
.jcp-card{background:var(--jc-white);border:1.5px solid var(--jc-divider);border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(18,38,63,0.07);position:sticky;top:20px;}
.jcp-card-stripe{height:52px;background:linear-gradient(135deg,var(--jc-steel),var(--jc-sky));}
.jcp-card-body{padding:20px 22px 24px;}
.jcp-field{margin-bottom:16px;}
.jcp-field-label{font-size:0.67rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--jc-muted);margin-bottom:4px;}
.jcp-field-val{font-size:0.875rem;color:var(--jc-navy);font-weight:600;line-height:1.4;word-break:break-all;}
.jcp-field-val.muted{color:var(--jc-muted);font-weight:400;font-style:italic;}
.jcp-field-val a{color:var(--jc-accent);text-decoration:none;font-weight:700;}
.jcp-field-val a:hover{color:var(--jc-steel);}
.jcp-hr{height:1px;background:var(--jc-divider);margin:18px 0;}
.jcp-input{width:100%;background:var(--jc-cloud);border:1.5px solid var(--jc-divider);border-radius:7px;padding:8px 11px;font-family:'Lato',sans-serif;font-size:0.85rem;color:var(--jc-navy);outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
.jcp-input:focus{border-color:var(--jc-accent);box-shadow:0 0 0 3px rgba(58,143,181,0.10);}
.jcp-actions{display:flex;gap:8px;margin-top:18px;}
.jcp-btn-p{flex:1;padding:9px;border-radius:8px;border:none;background:linear-gradient(135deg,var(--jc-steel),var(--jc-sky));color:var(--jc-white);font-family:'Lato',sans-serif;font-size:0.80rem;font-weight:700;cursor:pointer;transition:opacity 0.2s;}
.jcp-btn-p:hover{opacity:0.88;}
.jcp-btn-s{flex:1;padding:9px;border-radius:8px;cursor:pointer;background:var(--jc-mist);border:1.5px solid var(--jc-divider);color:var(--jc-steel);font-family:'Lato',sans-serif;font-size:0.80rem;font-weight:700;transition:background 0.2s;}
.jcp-btn-s:hover{background:var(--jc-divider);}
.jcp-btn-g{padding:9px 13px;border-radius:8px;cursor:pointer;background:none;border:1.5px solid var(--jc-divider);color:var(--jc-muted);font-family:'Lato',sans-serif;font-size:0.80rem;font-weight:700;transition:all 0.2s;}
.jcp-btn-g:hover{border-color:#E05C5C;color:#c94f4f;}
.jcp-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:18px;}
.jcp-stat{background:var(--jc-cloud);border:1.5px solid var(--jc-divider);border-radius:10px;padding:12px 8px;text-align:center;}
.jcp-stat-num{font-family:'Raleway',sans-serif;font-size:1.45rem;font-weight:900;color:var(--jc-navy);line-height:1;}
.jcp-stat-lbl{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--jc-muted);margin-top:4px;}

/* APPLICATIONS */
.jcp-apps-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.jcp-apps-title{font-family:'Raleway',sans-serif;font-size:1.05rem;font-weight:900;color:var(--jc-navy);}
.jcp-apps-badge{background:var(--jc-mist);border:1px solid var(--jc-divider);color:var(--jc-steel);font-size:0.72rem;font-weight:700;padding:3px 10px;border-radius:20px;}
.jcp-list{display:flex;flex-direction:column;gap:12px;}
.jcp-job-card{background:var(--jc-white);border:1.5px solid var(--jc-divider);border-radius:14px;padding:18px 20px;display:flex;align-items:center;gap:16px;box-shadow:0 2px 10px rgba(18,38,63,0.05);transition:transform 0.2s,box-shadow 0.2s,border-color 0.2s;}
.jcp-job-card:hover{transform:translateY(-3px);box-shadow:0 8px 26px rgba(18,38,63,0.10);border-color:var(--jc-accent);}
.jcp-co-icon{width:46px;height:46px;border-radius:12px;flex-shrink:0;background:var(--jc-mist);border:1.5px solid var(--jc-divider);display:flex;align-items:center;justify-content:center;font-size:1.2rem;}
.jcp-job-info{flex:1;min-width:0;}
.jcp-job-title{font-family:'Raleway',sans-serif;font-size:0.93rem;font-weight:800;color:var(--jc-navy);margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.jcp-job-company{font-size:0.80rem;color:var(--jc-txt-sec);font-weight:600;margin-bottom:6px;}
.jcp-job-date{font-size:0.73rem;color:var(--jc-muted);}
.jcp-badge{display:flex;align-items:center;gap:6px;padding:5px 13px;border-radius:20px;font-size:0.70rem;font-weight:700;letter-spacing:0.04em;border:1.5px solid;flex-shrink:0;white-space:nowrap;}
.jcp-badge-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}

/* EMPTY */
.jcp-empty{text-align:center;padding:52px 24px;background:var(--jc-white);border:1.5px solid var(--jc-divider);border-radius:16px;}
.jcp-empty-icon{width:60px;height:60px;background:var(--jc-mist);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin:0 auto 14px;}
.jcp-empty h4{font-family:'Raleway',sans-serif;font-size:0.95rem;font-weight:800;color:var(--jc-navy);margin-bottom:8px;}
.jcp-empty p{font-size:0.83rem;color:var(--jc-txt-sec);line-height:1.6;}
.jcp-browse-btn{display:inline-block;margin-top:16px;padding:10px 26px;border-radius:8px;border:none;background:linear-gradient(135deg,var(--jc-steel),var(--jc-sky));color:var(--jc-white);font-family:'Lato',sans-serif;font-size:0.83rem;font-weight:700;cursor:pointer;transition:opacity 0.2s;}
.jcp-browse-btn:hover{opacity:0.88;}

button{cursor:pointer; touch-action:manipulation;}

/* RESPONSIVE */
@media(max-width:960px){.jcp-hero{padding:32px 32px 0;}.jcp-body{padding:22px 32px 48px;grid-template-columns:1fr;}.jcp-card{position:static;}}
@media(max-width:600px){.jcp-hero{padding:20px 18px 0;}.jcp-hero-inner{flex-direction:column;align-items:flex-start;gap:12px;}.jcp-signout{margin-bottom:0;}.jcp-avatar{width:68px;height:68px;font-size:1.4rem;top:0;}.jcp-tab{padding:8px 13px;font-size:0.73rem;}.jcp-body{padding:18px 14px 48px;gap:16px;}.jcp-job-card{flex-wrap:wrap;}.jcp-badge{margin-left:auto;}}
`;

export default function UserProfile() {
  const navigate     = useNavigate();
  const [activeTab,  setActiveTab]  = useState("All");
  const [editing,    setEditing]    = useState(false);
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState("");
  const [tmpPhone, setTmpPhone] = useState("");
  const [tmpResume, setTmpResume] = useState("");
  const [userData, setUserData] = useState(null);
  const [applications, setApplications] = useState([]);

  const initials = userData?.fullname?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "";
  const filtered  = activeTab === "All" ? applications : applications.filter(a => a.status?.toLowerCase() === activeTab.toLowerCase())
  const count     = (t) => t === "All" ? applications.length : applications.filter((a) => a.status?.toLowerCase() === t.toLowerCase()).length;


  // Update Profile
  const handleSave = async () => {

    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

        if (!user){
          toast.error("You must be logged in to make changes");
          return;
        } 

       const updateTask = async () => {
          const userRef = doc(db, "Users", user.uid);
          await updateDoc(userRef, {
            phone: tmpPhone,
            resumeLink: tmpResume
          });
          
          setPhone(tmpPhone);
          setResume(tmpResume);
          setEditing(false);
        };

        // Use toast.promise for a high-end feel (Loading -> Success/Error)
        toast.promise(updateTask(), {
          loading: 'Saving changes...',
          success: <b>Profile updated successfully!</b>,
          error: <b>Could not save changes.</b>,
        });
      };

        const handleCancel = () => { 
             setTmpPhone(phone); 
             setTmpResume(resume); 
             setEditing(false); 
             toast("Changes discarded", { icon: 'ℹ️' });
            };

   useEffect(() => {
      const auth = getAuth();
      const db = getFirestore();
      const fetchProfile = async () => {
        const user = auth.currentUser;
        if (!user) return;

        // Fetch user profile
        try {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        const q = query(collection(db, "applications"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const apps = [];
        let latestPhone = "";
        let latestResume = "";

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          apps.push({ id: doc.id, ...data });
          if (data.phone) latestPhone = data.phone;
          if (data.resumeLink) latestResume = data.resumeLink;
        });

        setApplications(apps);
        setPhone(latestPhone);
        setResume(latestResume);
        setTmpPhone(latestPhone);
        setTmpResume(latestResume);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile data");
      }
    };
    
    fetchProfile();
}, []);

    const auth = getAuth();

    const handleLogout = async () => {
      try {
        await signOut(getAuth());
        toast.success("Logged out successfully");
        setTimeout(() => {
          navigate("/login");
        }, 800);
      } catch (error) {
      toast.error("Error signing out");
    }
    };

  return (
    <div className="jcp-root">
      <style>{CSS}</style>
      <Toaster position="top-center" reverseOrder={false} />

      {/* HERO */}
      <div className="jcp-hero">
        <div className="jcp-hero-inner">
          <div className="jcp-hero-left">
            <div className="jcp-avatar">{initials}</div>
            <div className="jcp-hero-info">
              <div className="jcp-chip">✦ My Profile</div>
              <h1>{userData?.fullname}</h1>
              <div className="jcp-hero-email">{userData?.email}</div>
            </div>
          </div>
          <button className="jcp-signout" onClick={handleLogout}>Sign Out →</button>
        </div>
        <div className="jcp-tabs">
          {TABS.map(tab => (
            <button key={tab} className={`jcp-tab${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>
              {tab === "All" ? "All Applications" : tab} ({count(tab)})
            </button>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div className="jcp-body">

        {/* Profile Card */}
        <div className="jcp-card">
          <div className="jcp-card-stripe" />
          <div className="jcp-card-body">

            <div className="jcp-field">
              <div className="jcp-field-label">Full Name</div>
              <div className="jcp-field-val">{userData?.fullname}</div>
            </div>

            <div className="jcp-field">
              <div className="jcp-field-label">Email Address</div>
              <div className="jcp-field-val">{userData?.email}</div>
            </div>

            <div className="jcp-field">
              <div className="jcp-field-label">Phone Number</div>
              {editing
                ? <input className="jcp-input" value={tmpPhone} placeholder="+91 98765 43210" onChange={e => setTmpPhone(e.target.value)} />
                : <div className={`jcp-field-val${!phone ? " muted" : ""}`}>{phone || "Not added"}</div>
              }
            </div>

            <div className="jcp-field">
              <div className="jcp-field-label">Resume Link</div>
              {editing
                ? <input className="jcp-input" value={tmpResume} placeholder="https://drive.google.com/..." onChange={e => setTmpResume(e.target.value)} />
                : resume
                  ? <div className="jcp-field-val"><a href={resume} target="_blank" rel="noopener noreferrer"><FileText size={18}/> View Resume</a></div>
                  : <div className="jcp-field-val muted">Not added</div>
              }
            </div>

            {editing ? (
              <div className="jcp-actions">
                <button className="jcp-btn-p" onClick={handleSave}>Save Changes</button>
                <button className="jcp-btn-g" onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <div className="jcp-actions">
                <button className="jcp-btn-s" onClick={() => setEditing(true)}><PencilLine size={16}/> Edit Profile</button>
              </div>
            )}

            <div className="jcp-hr" />

            <div className="jcp-stats">
            {[
                { num: applications.length, lbl: "Applied" },
                { num: applications.filter(a => a.status?.toLowerCase() === "accepted").length, lbl: "Accepted" },
                { num: applications.filter(a => a.status?.toLowerCase() === "pending").length, lbl: "Pending" },
                { num: applications.filter(a => a.status?.toLowerCase() === "rejected").length, lbl: "Rejected" },
              ].map((s,i) => (
                <div key={i} className="jcp-stat">
                  <div className="jcp-stat-num">{s.num}</div>
                  <div className="jcp-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Applications */}
        <div>
          <div className="jcp-apps-hdr">
            <div className="jcp-apps-title">
              {activeTab === "All" ? "All Applications" : `${activeTab} Applications`}
            </div>
            <div className="jcp-apps-badge">{filtered.length} job{filtered.length !== 1 ? "s" : ""}</div>
          </div>

          {filtered.length === 0 ? (
            <div className="jcp-empty">
              <div className="jcp-empty-icon"><SearchCheckIcon size={40}/></div>
              <h4>No {activeTab.toLowerCase()} applications</h4>
              <p>You don't have any {activeTab.toLowerCase()} applications at the moment.</p>
              {activeTab === "All" && (
                <button className="jcp-browse-btn" onClick={() => navigate("/jobs")}>Browse Jobs →</button>
              )}
            </div>
          ) : (
            <div className="jcp-list">
              {filtered.map(app => {
                const st = STATUS_STYLE[app.status] || STATUS_STYLE.Pending;
                return (
                  <div key={app.id} className="jcp-job-card">
                    <div className="jcp-co-icon"><Building2 size={30}/></div>
                    <div className="jcp-job-info">
                      <div className="jcp-job-title">{app.jobTitle}</div>
                      <div className="jcp-job-company">{app.company}</div>
                      <div className="jcp-job-date"> Applied on {app.createdAt?.toDate().toLocaleDateString()}</div>
                    </div>
                    <div className="jcp-badge" style={{background:st.bg,borderColor:st.border,color:st.color}}>
                      <span className="jcp-badge-dot" style={{background:st.dot}} />
                      {app.status}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
