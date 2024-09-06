"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  limit as firebaseLimit,
  startAfter as firebaseStartAfter,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useFetchRecentReviews = (id, limit = 10, collectionName = "reviews") => {
  const [recentData, setRecentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null); // For pagination
  const [hasMore, setHasMore] = useState(true); // To track if more data is available

  const fetchReviews = useCallback(
    async (startAfterDoc = null) => {
      setIsLoading(true);
      setError(null);

      try {
        let reviewsQuery = query(
          collection(db, collectionName),
          orderBy("timestamp", "desc"),
          firebaseLimit(limit)
        );

        if (startAfterDoc) {
          reviewsQuery = query(reviewsQuery, firebaseStartAfter(startAfterDoc));
        }

        const querySnapshot = await getDocs(reviewsQuery);
        const reviews = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecentData((prev) => {
          // Use a Set to avoid duplicates
          const existingIds = new Set(prev.map((item) => item.id));
          const newReviews = reviews.filter(
            (review) => !existingIds.has(review.id)
          );
          return [...prev, ...newReviews];
        });
        setHasMore(reviews.length === limit); // Check if there's more data
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Set last visible document
      } catch (error) {
        console.error("Error fetching reviews: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [limit, collectionName]
  );

  useEffect(() => {
    fetchReviews();
  }, [id, fetchReviews]);

  return {
    recentData,
    isLoading,
    error,
    fetchMore: () => fetchReviews(lastVisible),
    hasMore,
  };
};

export default useFetchRecentReviews;
