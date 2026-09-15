import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { AdminContext } from "./AdminContext";
import { useAuth } from "./useAuth";
import { db } from "../firebase/firebase.config";

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
        console.log("Admin check: No authenticated user.");

        setIsAdmin(false);
        setLoading(false);

        return;
      }

      console.log("Admin check - Auth user:", {
        uid: user.uid,
        email: user.email,
      });

      try {
        const userRef = doc(
          db,
          "users",
          user.uid
        );

        const snapshot = await getDoc(userRef);

        console.log(
          "Admin check - User document exists:",
          snapshot.exists()
        );

        if (!snapshot.exists()) {
          console.log(
            "No users document found for UID:",
            user.uid
          );

          setIsAdmin(false);
          return;
        }

        const userData = snapshot.data();

        console.log(
          "Admin check - Firestore user data:",
          userData
        );

        console.log(
          "Admin check - Role:",
          userData.role
        );

        setIsAdmin(userData.role === "admin");
      } catch (error) {
        console.error(
          "Admin check failed:",
          error
        );

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