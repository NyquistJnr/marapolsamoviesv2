import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit as firestoreLimit,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useSimilarPost = (
  id,
  { genre, industry, streamingPlatform },
  limit = null
) => {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredReviews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Start building the query
        let reviewsQuery = query(collection(db, "reviews"));

        // Add filters dynamically
        if (genre)
          reviewsQuery = query(reviewsQuery, where("genre", "==", genre));
        if (industry)
          reviewsQuery = query(reviewsQuery, where("industry", "==", industry));
        if (streamingPlatform)
          reviewsQuery = query(
            reviewsQuery,
            where("streamingPlatform", "==", streamingPlatform)
          );

        // Add sorting by timestamp
        reviewsQuery = query(reviewsQuery, orderBy("timestamp", "desc"));

        // Apply limit if specified
        if (limit) {
          reviewsQuery = query(reviewsQuery, firestoreLimit(limit));
        }

        const querySnapshot = await getDocs(reviewsQuery);

        const reviews = querySnapshot.docs
          .filter((doc) => doc.id !== id) // Exclude the current document
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setFilteredReviews(reviews);
      } catch (error) {
        console.error("Error fetching filtered reviews: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredReviews();
  }, [id, genre, industry, streamingPlatform, limit]);

  return { filteredReviews, isLoading, error };
};

export default useSimilarPost;
