import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

const HRRoute = ({ children }) => {
  const [checking, setChecking] = useState(true); // loading state
  const [allowed, setAllowed] = useState(false);  // permission state

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Not logged in
        setAllowed(false);
        setChecking(false);
        return;
      }

      try {
        // Fetch user data from Firestore
        const snap = await getDoc(doc(db, "Users", user.uid));

        if (snap.exists() && snap.data().role === "hr") {
          setAllowed(true);
        } else {
          setAllowed(false);
        }

      } catch (error) {
        console.error("Error checking HR role:", error);
        setAllowed(false);
      }

      setChecking(false);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  if (checking) return <h3>Loading...</h3>;

  if (!allowed) return <Navigate to="/login" replace />;

  return children;
};

export default HRRoute;