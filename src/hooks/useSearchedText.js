import { useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useSearchTextPost = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchReviews = async (searchInput) => {
    if (searchInput.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, "reviews");

      // Query the reviews collection and order by timestamp
      const q = query(collectionRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      // Convert search input to lowercase for case-insensitive comparison
      const lowerCaseSearchInput = searchInput.toLowerCase();

      // Filter results based on the search input
      const filteredResults = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (doc) =>
            doc.title?.toLowerCase().includes(lowerCaseSearchInput) ||
            doc.category?.toLowerCase().includes(lowerCaseSearchInput) ||
            doc.streamingPlatform
              ?.toLowerCase()
              .includes(lowerCaseSearchInput) ||
            doc.genre?.toLowerCase().includes(lowerCaseSearchInput) ||
            doc.industry?.toLowerCase().includes(lowerCaseSearchInput)
        );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error searching reviews:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchResults,
    isLoading,
    error,
    searchReviews,
  };
};

export default useSearchTextPost;
