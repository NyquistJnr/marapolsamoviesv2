// hooks/useAddActivity.js
import { useState, useCallback } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useAddActivity = (userId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addActivity = useCallback(
    async (activity) => {
      setLoading(true);
      setError(null);

      try {
        const userDocRef = doc(db, "users", userId); // Reference to the user's document

        // Update the `activities` array in the user's document
        await updateDoc(userDocRef, {
          activities: arrayUnion(activity), // Adds the activity to the array without duplicating
        });

        // console.log("Activity added successfully");
      } catch (err) {
        // console.error("Error adding activity:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  return { addActivity, loading, error };
};

export default useAddActivity;
