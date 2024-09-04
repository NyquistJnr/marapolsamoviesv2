import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useUserData = (userId) => {
  const [data, setData] = useState({ statusRole: "", activities: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userDoc = doc(db, "users", userId);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const sortedActivities = (userData.activities || [])
            .sort((a, b) => new Date(b.when) - new Date(a.when)) // Sort by "when" field in descending order
            .slice(0, 4); // Get the top 4 items

          setData({
            statusRole: userData.statusRole || "",
            activities: sortedActivities,
          });
        } else {
          setError("No such document!");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { data, loading, error };
};

export default useUserData;
