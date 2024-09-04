import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useUserCreationStats = (timeframe) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);

        const counts = {
          week: Array(7).fill(0),
          month: Array(31).fill(0),
          year: Array(12).fill(0),
          lastYear: Array(12).fill(0),
        };

        snapshot.forEach((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt.toDate(); // Assuming createdAt is a Firestore Timestamp

          if (!createdAt) return;

          const currentDate = new Date();
          const year = createdAt.getFullYear();
          const month = createdAt.getMonth();
          const day = createdAt.getDate();
          const weekDay = createdAt.getDay();

          if (timeframe === "week") {
            const startOfWeek = new Date();
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            if (createdAt >= startOfWeek && createdAt <= endOfWeek) {
              counts.week[weekDay]++;
            }
          } else if (timeframe === "month") {
            if (
              createdAt.getMonth() === currentDate.getMonth() &&
              createdAt.getFullYear() === currentDate.getFullYear()
            ) {
              counts.month[day - 1]++;
            }
          } else if (timeframe === "year") {
            if (createdAt.getFullYear() === currentDate.getFullYear()) {
              counts.year[month]++;
            }
          } else if (timeframe === "lastYear") {
            if (createdAt.getFullYear() === currentDate.getFullYear() - 1) {
              counts.lastYear[month]++;
            }
          }
        });

        setData(counts[timeframe] || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeframe]);

  return { data, loading, error };
};

export default useUserCreationStats;
