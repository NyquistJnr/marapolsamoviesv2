import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useAggregatedData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    totalUsers: 0,
    totalLikes: 0,
    totalSaves: 0,
    totalComments: 0,
  });

  useEffect(() => {
    const fetchAggregatedData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch total number of users
        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        const totalUsers = usersSnapshot.size;

        // Initialize total counts
        let totalLikes = 0;
        let totalSaves = 0;
        let totalComments = 0;

        // Define the collections to aggregate data from
        const collectionsToCheck = ["reviews", "news", "awards"];

        // Fetch total number of likes, saves, and comments from each collection
        for (const collectionName of collectionsToCheck) {
          const collectionRef = collection(db, collectionName);
          const snapshot = await getDocs(collectionRef);

          snapshot.forEach((doc) => {
            const data = doc.data();

            // Sum up the counts from the likes, saves, and comments arrays
            totalLikes += data.likes ? data.likes.length : 0;
            totalSaves += data.saves ? data.saves.length : 0;
            totalComments += data.comments ? data.comments.length : 0;
          });
        }

        // Update state with the fetched data
        setData({ totalUsers, totalLikes, totalSaves, totalComments });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAggregatedData();
  }, []);

  return { data, loading, error };
};

export default useAggregatedData;
