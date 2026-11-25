import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

const AdminRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        setAllowed(false);
        setChecking(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "Users", user.uid));

        if (snap.exists() && snap.data().role === "admin") {
          setAllowed(true);
        } else {
          setAllowed(false);
        }

      } catch (error) {
        setAllowed(false);
      }

      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) return <h3>Loading...</h3>;

  if (!allowed) return <Navigate to="/login" replace />;

  return children;
};

export default AdminRoute;