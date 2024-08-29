import { useState, useEffect } from "react";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useReviewYouMightLike = (numberOfDocs = 5) => {
  const [randomReviews, setRandomReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomReviews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const reviewsCollection = collection(db, "reviews");
        // Use a query to fetch a limited number of random documents
        const q = query(
          reviewsCollection,
          orderBy("timestamp"), // Sort by a field (timestamp here) to randomize selection
          limit(numberOfDocs)
        );

        const querySnapshot = await getDocs(q);
        const reviews = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Shuffle the results to further randomize
        const shuffledReviews = reviews.sort(() => 0.5 - Math.random());

        setRandomReviews(shuffledReviews);
      } catch (error) {
        console.error("Error fetching random reviews:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomReviews();
  }, [numberOfDocs]);

  return { randomReviews, isLoading, error };
};

export default useReviewYouMightLike;
