import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {
        setUser(currentUser);

        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data().fullname);
        }
      } else {
        setUser(null);
        setUsername("");
      }

      setLoading(false);
    });

    return () => unsubscribe();

  }, []);

  return (
    <AuthContext.Provider value={{ user, username }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};