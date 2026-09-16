import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { AdminContext } from "./AdminContext";
import { useAuth } from "../auth/useAuth";
import { db } from "../../firebase/firebase.config";

export const AdminProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (authLoading) {
        return;
      }

      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {
          setIsAdmin(false);
          return;
        }

        const userData = snapshot.data();

        setIsAdmin(userData.role === "admin");
      } catch (error) {
        console.error("Admin check failed:", error);

        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [user, authLoading]);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
