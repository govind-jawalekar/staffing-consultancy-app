import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseconfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp, deleteApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseconfig";

const AddHrModal = ({ show, onClose, onSuccess, hrData }) => {

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hrData) {
      setFormData({
        name: hrData.name || "",
        mobile: hrData.mobile || "",
        email: hrData.email || "",
        password: ""
      });
    } else {
      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: ""
      });
    }
  }, [hrData]);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {

      setLoading(true);

      /* EDIT HR */
      if (hrData) {

        await updateDoc(doc(db, "Users", hrData.id), {
          name: formData.name,
          mobile: formData.mobile
        });

      } else {

        /* Secondary Firebase app so admin session doesn't change */
        const secondaryApp = initializeApp(firebaseConfig, "Secondary");
        const secondaryAuth = getAuth(secondaryApp);

        const userCredential = await createUserWithEmailAndPassword(
          secondaryAuth,
          formData.email,
          formData.password
        );

        const uid = userCredential.user.uid;

        await setDoc(doc(db, "Users", uid), {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          role: "hr",
          createdAt: new Date()
        });

        /* Important: remove secondary app */
        await deleteApp(secondaryApp);
      }

      onSuccess();
      onClose();

    } catch (err) {

      console.error(err);

      /* Professional Firebase error handling */

      switch (err.code) {

        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;

        case "auth/invalid-email":
          setError("Invalid email address.");
          break;

        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet.");
          break;

        default:
          setError("Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {hrData ? "Edit HR" : "Add HR"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={hrData}
                  required
                />
              </div>

              {!hrData && (
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="d-flex justify-content-end gap-2">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : hrData
                    ? "Save Changes"
                    : "Add HR"}
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHrModal;