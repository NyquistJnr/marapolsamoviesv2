import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useTrendingPost = (collectionName = "reviews", limit = 6) => {
  const [sortedReviews, setSortedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSortReviews = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      setError(null); // Reset error state before fetching

      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const reviews = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const sumLength =
            (data.comments?.length || 0) +
            (data.likes?.length || 0) +
            (data.saves?.length || 0);
          return {
            id: doc.id,
            ...data,
            sumLength, // Add sum of the lengths of comments, likes, and saves
          };
        });

        // Sort the reviews by sumLength in descending order
        const sorted = reviews.sort((a, b) => b.sumLength - a.sumLength);

        // Return only the top 6 reviews
        setSortedReviews(sorted.slice(0, limit));
      } catch (error) {
        console.error("Error fetching and sorting reviews: ", error);
        setError(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching (success or error)
      }
    };

    fetchAndSortReviews();
  }, [collectionName]);

  return { sortedReviews, isLoading, error };
};

export default useTrendingPost;
