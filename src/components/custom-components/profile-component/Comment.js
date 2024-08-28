"use client";

import { useEffect, useState } from "react";
import CommentedProfile from "./CommentedProfile";
import img3 from "../../../../public/images/templates-imgs/showReview.png";
import img4 from "../../../../public/images/templates-imgs/dp.png";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const data = [
  {
    title: "Different Strokes: Same old story saved by good casting",
    author: "Chigoxx",
    date: "May 11, 2024",
    content:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut vel nunc curabitur tempus dui magna morbi. Suspendisse consectetur a proin fermentum tincidunt molestie tortor. Auctor duis lorem ultrices malesuada scelerisque...",
    imageSrc: img3,
    dpSrc: img4,
    username: "naya.azubuko",
    time: "45m",
    userComment:
      "Exactly my thought. It would have made up happier knowing atleast a little about her family and what the flashback was about.",
  },
  {
    title: "Different Strokes: Same old story saved by good casting",
    author: "Chigoxx",
    date: "May 11, 2024",
    content:
      "Lorem ipsum dolor sit amet consectetur. Bibendum ornare velit elementum tortor mattis. Lorem ipsum ut vel nunc curabitur tempus dui magna morbi. Suspendisse consectetur a proin fermentum tincidunt molestie tortor. Auctor duis lorem ultrices malesuada scelerisque...",
    imageSrc: img3,
    dpSrc: img4,
    username: "naya.azubuko",
    time: "45m",
    userComment:
      "Exactly my thought. It would have made up happier knowing atleast a little about her family and what the flashback was about.",
  },
];

const ProfileComment = () => {
  const [user] = useAuthState(auth);
  const [sortedArray, setSortedArray] = useState([]);
  const [relatedDocuments, setRelatedDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  console.log(relatedDocuments);

  return (
    <section>
      <div>
        {relatedDocuments?.length < 1 && (
          <div
            className="text-center"
            style={{
              height: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h4 style={{ fontWeight: "bold", fontSize: 16 }}>
              You haven&apos;t commented on anything yet.
            </h4>
            <p style={{ fontSize: 13 }}>
              Your comments on reviews, news and awards will show here.
            </p>
          </div>
        )}
      </div>
      <div className="row">
        {relatedDocuments?.length > 0 &&
          relatedDocuments?.map((item) => (
            <div
              className="col-12 py-2"
              key={Math.random()}
              style={{ marginBottom: 40 }}
            >
              <CommentedProfile {...item} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProfileComment;
