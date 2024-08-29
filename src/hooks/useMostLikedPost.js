import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useMostLikedPost = () => {
  const [sortedReviews, setSortedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSortReviews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const collectionRef = collection(db, "reviews");
        const querySnapshot = await getDocs(collectionRef);
        const reviewsWithLikesCount = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            likesCount: (data.likes || []).length, // Calculate the length of the likes array
          };
        });

        // Sort the reviews by likesCount in descending order
        const sortedReviews = reviewsWithLikesCount.sort(
          (a, b) => b.likesCount - a.likesCount
        );

        setSortedReviews(sortedReviews);
      } catch (error) {
        console.error("Error fetching and sorting reviews:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSortReviews();
  }, []);

  return { sortedReviews, isLoading, error };
};

export default useMostLikedPost;
