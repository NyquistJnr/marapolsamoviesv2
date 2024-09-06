"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  limit as firebaseLimit,
  startAfter,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useRecentNews = (collectionName = "news", limit = 10) => {
  const [recentNews, setRecentNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedIds, setFetchedIds] = useState(new Set()); // Set to track fetched IDs

  const fetchNews = async (startAfterDoc = null) => {
    setIsLoading(true);
    setError(null);

    try {
      let newsQuery = query(
        collection(db, collectionName),
        orderBy("timestamp", "desc"),
        firebaseLimit(limit)
      );

      if (startAfterDoc) {
        newsQuery = query(newsQuery, startAfter(startAfterDoc));
      }

      const querySnapshot = await getDocs(newsQuery);
      const newDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter out already fetched items
      const newNews = newDocs.filter(
        (newsItem) => !fetchedIds.has(newsItem.id)
      );

      if (newNews.length > 0) {
        setRecentNews((prevNews) => {
          const prevNewsIds = new Set(prevNews.map((item) => item.id));
          const uniqueNewNews = newNews.filter(
            (item) => !prevNewsIds.has(item.id)
          );
          return [...prevNews, ...uniqueNewNews];
        });

        setFetchedIds(
          (prevIds) => new Set([...prevIds, ...newNews.map((item) => item.id)])
        );
      }

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(newNews.length === limit);
    } catch (error) {
      console.error(`Error fetching ${collectionName}: `, error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [collectionName, limit]);

  return {
    recentNews,
    isLoading,
    error,
    fetchMore: () => {
      if (hasMore) {
        fetchNews(lastVisible);
      }
    },
    hasMore,
  };
};

export default useRecentNews;
