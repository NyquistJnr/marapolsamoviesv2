"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  limit as firebaseLimit,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useRecentNews = (collectionName = "news", limit = null) => {
  const [recentNews, setRecentNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const newsQuery = limit
          ? query(
              collection(db, collectionName),
              orderBy("timestamp", "desc"),
              firebaseLimit(limit)
            )
          : query(collection(db, collectionName), orderBy("timestamp", "desc"));

        const querySnapshot = await getDocs(newsQuery);
        const news = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecentNews(news);
      } catch (error) {
        console.error(`Error fetching ${collectionName}: `, error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [collectionName, limit]);

  return { recentNews, isLoading, error };
};

export default useRecentNews;
