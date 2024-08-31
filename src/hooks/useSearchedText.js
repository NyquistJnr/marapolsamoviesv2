import { useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useSearchTextPost = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchReviews = async (searchInput, collectionName = "reviews") => {
    if (searchInput.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const collectionRef = collection(db, collectionName);

      // Query the specified collection and order by timestamp
      const q = query(collectionRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      // Convert search input to lowercase for case-insensitive comparison
      const lowerCaseSearchInput = searchInput.toLowerCase();

      // Determine the fields to search based on the collection name
      let searchFields;
      if (collectionName === "movies") {
        searchFields = [
          "title",
          "genre",
          "streamingPlatform",
          "movieDirector",
          "author",
          "industry",
        ];
      } else if (collectionName === "news") {
        searchFields = ["title", "author"];
      } else {
        searchFields = [
          "title",
          "category",
          "streamingPlatform",
          "genre",
          "industry",
        ];
      }

      // Filter results based on the search input
      const filteredResults = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((doc) =>
          searchFields.some((field) =>
            doc[field]?.toLowerCase().includes(lowerCaseSearchInput)
          )
        );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error(`Error searching ${collectionName}:`, error);
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
