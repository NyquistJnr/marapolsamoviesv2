import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useFetchCategoryData = (category) => {
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
          orderBy("timestamp", "desc")
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
  }, [category]);

  return { data, isLoading, error };
};

export default useFetchCategoryData;
