import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit as limitDocs,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useFetchCategoryData = (category, limit = 10) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const q = query(
          collection(db, "reviews"),
          where("category", "==", category),
          orderBy("timestamp", "desc"),
          limitDocs(limit) // Use the limitDocs function to limit the number of documents returned
        );
        const querySnapshot = await getDocs(q);
        const categoryData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(categoryData);
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, [category, limit]);

  return { data, isLoading, error };
};

export default useFetchCategoryData;
