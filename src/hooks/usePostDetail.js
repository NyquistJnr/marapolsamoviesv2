import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const usePostDetails = (collectionName, documentId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
          setError(new Error("No such document!"));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (documentId) {
      fetchData();
    }
  }, [collectionName, documentId]);

  // Format the date if available
  const formattedDate = data?.timestamp
    ? data.timestamp.toDate().toLocaleString()
    : "";

  return { data, loading, error, formattedDate };
};

export default usePostDetails;
