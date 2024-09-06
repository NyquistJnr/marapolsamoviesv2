import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useMostLikedPost = (perPage = 6) => {
  const [sortedReviews, setSortedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchAndSortReviews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, "reviews");

      // Create a query that orders by likesCount and limits to the perPage count
      let reviewsQuery = query(
        collectionRef,
        orderBy("likes", "desc"),
        limit(perPage)
      );

      // If there is a lastVisible document, start after it
      if (lastVisible) {
        reviewsQuery = query(
          collectionRef,
          orderBy("likes", "desc"),
          startAfter(lastVisible),
          limit(perPage)
        );
      }

      // Fetch the documents based on the query
      const querySnapshot = await getDocs(reviewsQuery);
      const reviewsWithLikesCount = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          likesCount: (data.likes || []).length, // Calculate the length of the likes array
        };
      });

      // Filter out any duplicate reviews based on their IDs
      setSortedReviews((prevReviews) => {
        const newReviews = reviewsWithLikesCount.filter(
          (newReview) =>
            !prevReviews.some((review) => review.id === newReview.id)
        );
        return [...prevReviews, ...newReviews];
      });

      // Update last visible document
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastDoc);

      // Check if there are more reviews to load
      setHasMore(querySnapshot.docs.length >= perPage);
    } catch (error) {
      console.error("Error fetching and sorting reviews:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial data when component mounts
  useEffect(() => {
    fetchAndSortReviews();
  }, []);

  return {
    sortedReviews,
    isLoading,
    error,
    fetchMore: fetchAndSortReviews,
    hasMore,
  };
};

export default useMostLikedPost;
