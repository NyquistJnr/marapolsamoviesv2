// hoc/withAuthorization.js

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";

const withAuthorization = (Component) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuthorization = async () => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            // Get user document from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              // Check if statusRole is "staff" or "admin"
              if (
                userData.statusRole === "staff" ||
                userData.statusRole === "admin"
              ) {
                setAuthorized(true);
              } else {
                router.push("/"); // Redirect to home page if not authorized
              }
            } else {
              router.push("/"); // Redirect to home page if no user document
            }
          } else {
            router.push("/login"); // Redirect to login if not authenticated
          }
          setLoading(false);
        });
      };

      checkAuthorization();
    }, [router]);

    if (loading) {
      return <div>Admin Page Loading...</div>; // You can replace this with a spinner or loading component
    }

    if (!authorized) {
      return null; // Optionally render nothing while redirecting
    }

    return <Component {...props} />;
  };
};

export default withAuthorization;
