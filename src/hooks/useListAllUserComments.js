import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; // Ensure to import Firestore functions from your Firebase setup
import { db } from "@/app/firebase/config";

const useListAllUserComments = (user) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedArray, setSortedArray] = useState([]);
  const [relatedDocuments, setRelatedDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Fetch the user's document
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const arrayToSort = data.userComments || [];

          // Step 1: Filter out duplicates based on postId
          const uniqueArray = arrayToSort.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.postId === item.postId)
          );

          // Step 2: Sort the array by the timestamp field
          const sorted = uniqueArray.sort((a, b) => a.timestamp - b.timestamp);
          setSortedArray(sorted);

          // Step 3: Fetch related documents for each item in the sorted array
          const documentPromises = sorted.map(async (item) => {
            const itemDocRef = doc(db, "reviews", item.postId);
            const itemDocSnap = await getDoc(itemDocRef);

            if (itemDocSnap.exists()) {
              const itemData = itemDocSnap.data();

              // Step 4: Get the plot, title, and total comments
              const {
                plot,
                title,
                comments = [],
                author,
                timestamp,
                image,
              } = itemData;
              const totalComments = comments.length;

              // Step 5: Filter and sort comments by user's uid
              const userComments = comments
                .filter((comment) => comment.uid === user.uid)
                .sort((a, b) => a.timestamp - b.timestamp);

              // Step 6: Return the new object with plot, title, total comments, and sorted user comments
              return {
                content: plot,
                title,
                totalComments,
                userComments,
                postId: item.postId,
                author,
                date: timestamp,
                imageSrc: image,
              };
            }
            return null;
          });

          const finalArray = await Promise.all(documentPromises);
          setRelatedDocuments(finalArray.filter((doc) => doc !== null));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return { loading, error, sortedArray, relatedDocuments };
};

export default useListAllUserComments;
