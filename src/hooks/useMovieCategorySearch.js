import { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useMovieCategorySearch = (searchValue, itemsPerPage = 10) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchMovies = async (startAfterDoc = null) => {
    setLoading(true);
    setError(null);

    try {
      const moviesCollectionRef = collection(db, "movies");

      // Step 1: Build query with pagination support
      let moviesQuery = query(
        moviesCollectionRef,
        orderBy("timestamp"),
        limit(itemsPerPage)
      );

      // Add pagination support if there's a starting point
      if (startAfterDoc) {
        moviesQuery = query(
          moviesCollectionRef,
          orderBy("timestamp"),
          startAfter(startAfterDoc),
          limit(itemsPerPage)
        );
      }

      // Step 2: Execute query
      const querySnapshot = await getDocs(moviesQuery);

      // Step 3: Filter documents based on the searchValue
      const matchedMovies = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((movie) => {
          const movieCategories = movie.categories || [];
          return movieCategories.some(
            (category) => category.name === searchValue
          );
        });

      // Step 4: Update filteredMovies and ensure no duplicates
      setFilteredMovies((prevMovies) => [
        ...prevMovies,
        ...matchedMovies.filter(
          (movie) => !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
        ),
      ]);

      // Step 5: Handle pagination by capturing the last visible document
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc || null);

      // Step 6: Check if there are more movies to load
      // Ensure both snapshot and matchedMovies are considered
      setHasMore(
        querySnapshot.docs.length === itemsPerPage && matchedMovies.length > 0
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue) {
      // Reset the state when searchValue changes
      setFilteredMovies([]);
      setLastVisible(null);
      setHasMore(false);
      fetchMovies();
    }
  }, [searchValue]);

  // Function to load more movies when needed
  const loadMoreMovies = () => {
    if (hasMore && !loading) {
      fetchMovies(lastVisible);
    }
  };

  return { loading, error, filteredMovies, hasMore, loadMoreMovies };
};

export default useMovieCategorySearch;
