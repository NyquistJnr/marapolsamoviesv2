"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  limit as firebaseLimit,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useFetchRecentReviews = (id, limit = null) => {
  const [recentData, setRecentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      setError(null); // Reset error state before fetching

      try {
        // Construct the query with optional limit
        const reviewsQuery = limit
          ? query(
              collection(db, "reviews"),
              orderBy("timestamp", "desc"),
              firebaseLimit(limit)
            )
          : query(collection(db, "reviews"), orderBy("timestamp", "desc"));

        const querySnapshot = await getDocs(reviewsQuery);
        const reviews = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecentData(reviews);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
        setError(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching (success or error)
      }
    };

    fetchReviews();
  }, [id, limit]);

  return { recentData, isLoading, error };
};

export default useFetchRecentReviews;
