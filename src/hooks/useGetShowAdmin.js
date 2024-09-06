import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit as limitDocs,
  startAfter,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useFetchCategoryData = (category, limit = 10) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchCategoryData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create a query with ordering, filtering by category, and limiting the results
      let q = query(
        collection(db, "reviews"),
        where("category", "==", category),
        orderBy("timestamp", "desc"),
        limitDocs(limit)
      );

      // If there is a lastVisible document, paginate and fetch the next set
      if (lastVisible) {
        q = query(
          collection(db, "reviews"),
          where("category", "==", category),
          orderBy("timestamp", "desc"),
          startAfter(lastVisible), // Start after the last document fetched
          limitDocs(limit)
        );
      }

      // Fetch the documents based on the query
      const querySnapshot = await getDocs(q);
      const categoryData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update last visible document
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastDoc);

      // Filter out any duplicates and append new data
      setData((prevData) => {
        const newData = categoryData.filter(
          (newDoc) => !prevData.some((doc) => doc.id === newDoc.id)
        );
        return [...prevData, ...newData];
      });

      // Check if there are more documents to load
      setHasMore(querySnapshot.docs.length >= limit);
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial data when component mounts or when category changes
  useEffect(() => {
    fetchCategoryData();
  }, [category]);

  return { data, isLoading, error, fetchMore: fetchCategoryData, hasMore };
};

export default useFetchCategoryData;
