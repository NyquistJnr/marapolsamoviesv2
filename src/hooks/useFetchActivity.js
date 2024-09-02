// hooks/useUserActivities.js
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useUserActivities = (userId) => {
  const [activities, setActivities] = useState([]);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(""); // Added state for profile picture
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userDocRef = doc(db, "users", userId); // Reference to the user's document

    const unsubscribe = onSnapshot(
      userDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setActivities(data.activities || []); // Get activities or default to an empty array
          setUsername(data.displayName || ""); // Get username or default to an empty string
          setProfilePicture(data.profilePicture || ""); // Get profile picture or default to an empty string
        } else {
          setActivities([]); // If the document doesn't exist, set activities to an empty array
          setUsername(""); // If the document doesn't exist, set username to an empty string
          setProfilePicture(""); // If the document doesn't exist, set profile picture to an empty string
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching user data:", err);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, [userId]);

  return { activities, username, profilePicture, loading, error };
};

export default useUserActivities;
