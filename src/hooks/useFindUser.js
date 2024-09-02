import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useSearchByDisplayName = (collectionName, displayName) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);

      try {
        const q = query(
          collection(db, collectionName),
          where("displayName", "==", displayName)
        );

        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDocuments(results);
      } catch (err) {
        setError("Failed to fetch documents. Please try again.");
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    };

    if (displayName) {
      fetchDocuments();
    }
  }, [collectionName, displayName]);

  return { documents, loading, error };
};

export default useSearchByDisplayName;
