import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useTopDocuments = () => {
  const [topDocuments, setTopDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const collections = ["news", "reviews", "movies"];

  useEffect(() => {
    const fetchTopDocuments = async () => {
      setLoading(true);
      setError(null);

      try {
        let topDocs = [];

        for (let collectionName of collections) {
          const colRef = collection(db, collectionName);
          const snapshot = await getDocs(colRef);

          let maxSum = 0;
          let topDoc = null;

          snapshot.forEach((doc) => {
            const data = doc.data();
            const savesCount = data.saves ? data.saves.length : 0;
            const likesCount = data.likes ? data.likes.length : 0;
            const commentsCount = data.comments ? data.comments.length : 0;

            const sum = savesCount + likesCount + commentsCount;

            if (sum > maxSum) {
              maxSum = sum;
              topDoc = { id: doc.id, ...data, collectionName };
            }
          });

          if (topDoc) {
            topDocs.push(topDoc);
          }
        }

        setTopDocuments(topDocs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDocuments();
  }, []);

  return { topDocuments, loading, error };
};

export default useTopDocuments;
