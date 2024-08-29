import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useGetUserLikesAndSaves = (userId, field, limit = 10) => {
  const [sortedData, setSortedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSortData = async () => {
      if (!userId || !field) return;

      setIsLoading(true);
      setError(null);

      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const dataArray = userData[field] || [];

          // Sort the array by Firestore timestamp
          const sortedArray = dataArray
            .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis())
            .slice(0, limit); // Limit the number of items returned

          setSortedData(sortedArray);
        } else {
          setSortedData([]);
        }
      } catch (error) {
        console.error(`Error fetching and sorting ${field}: `, error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSortData();
  }, [userId, field, limit]);

  return { sortedData, isLoading, error };
};

export default useGetUserLikesAndSaves;
