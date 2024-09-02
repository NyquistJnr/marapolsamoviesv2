import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const useAutoLogout = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return; // Exit if there is no logged-in user

    const logoutTimer = setTimeout(() => {
      auth.signOut(); // Sign out the user
      console.log("User has been logged out after 5 hours.");
    }, 5 * 60 * 60 * 1000); // 5 hours in milliseconds

    // Cleanup the timer on component unmount or when the user changes
    return () => clearTimeout(logoutTimer);
  }, [user]); // Only run when the user state changes

  return null;
};

export default useAutoLogout;
