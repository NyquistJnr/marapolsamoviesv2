import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useCollectionStats = () => {
  const [totalLike, setTotalLike] = useState(0);
  const [totalSave, setTotalSave] = useState(0);
  const [totalComment, setTotalComment] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCollectionStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let commentsTotal = 0;
        let likesTotal = 0;
        let savesTotal = 0;

        const collectionRef = collection(db, "reviews");
        const querySnapshot = await getDocs(collectionRef);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const commentsLength = data.comments || [];
          commentsTotal += commentsLength.length;
          const likesLength = data.likes || [];
          likesTotal += likesLength.length;
          const savesLength = data.saves || [];
          savesTotal += savesLength.length;
        });

        setTotalComment(commentsTotal);
        setTotalLike(likesTotal);
        setTotalSave(savesTotal);
      } catch (error) {
        console.error("Error fetching collection stats:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCollectionStats();
  }, []);

  return { totalLike, totalSave, totalComment, isLoading, error };
};

export default useCollectionStats;
