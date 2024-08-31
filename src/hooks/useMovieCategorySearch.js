import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useMovieCategorySearch = (searchValue) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Fetch all documents from the "movies" collection
        const moviesCollectionRef = collection(db, "movies");
        const querySnapshot = await getDocs(moviesCollectionRef);

        // Step 2: Filter documents based on the searchValue
        const matchedMovies = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const movieArray = data.categories || [];

          // Check if any object in the array contains the searchValue in the "name" field
          const hasMatchingName = movieArray.some(
            (item) => item.name === searchValue
          );

          if (hasMatchingName) {
            matchedMovies.push({ id: doc.id, ...data });
          }
        });

        setFilteredMovies(matchedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchValue) {
      fetchMovies();
    }
  }, [searchValue]);

  return { loading, error, filteredMovies };
};

export default useMovieCategorySearch;
