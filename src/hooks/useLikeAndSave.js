import { useState, useEffect, useCallback } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const useReviewActions = (
  reviewId,
  user,
  optionalData,
  collectionName = "reviews"
) => {
  const [likedPost, setLikedPost] = useState(false);
  const [bookmarkPost, setBookmarkPost] = useState(false);

  const fetchReviewData = useCallback(async () => {
    try {
      const docRef = doc(db, collectionName, reviewId); // Use dynamic collection name
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const reviewData = docSnap.data();
        setLikedPost(reviewData.likes?.some((like) => like.uid === user?.uid));
        setBookmarkPost(
          reviewData.saves?.some((bookmark) => bookmark.uid === user?.uid)
        );
      }
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  }, [reviewId, user?.uid, collectionName]);

  const handleLike = useCallback(async () => {
    const docRef = doc(db, collectionName, reviewId); // Use dynamic collection name
    const userRef = doc(db, "users", user?.uid);

    const likeData = {
      image: optionalData.image,
      title: optionalData.title,
      timestamp: optionalData.timestamp,
      postType: collectionName,
      postID: reviewId,
    };

    try {
      if (likedPost) {
        // Unlike the review
        await updateDoc(docRef, {
          likes: arrayRemove({ uid: user?.uid }),
        });
        await updateDoc(userRef, {
          userLikes: arrayRemove(likeData),
        });
        setLikedPost(false);
      } else {
        // Like the review
        await updateDoc(docRef, {
          likes: arrayUnion({ uid: user?.uid }),
        });
        await updateDoc(userRef, {
          userLikes: arrayUnion(likeData),
        });
        setLikedPost(true);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  }, [reviewId, user?.uid, likedPost, optionalData, collectionName]);

  const handleBookmark = useCallback(async () => {
    const docRef = doc(db, collectionName, reviewId); // Use dynamic collection name
    const userRef = doc(db, "users", user?.uid);

    const bookmarkData = {
      image: optionalData.image,
      title: optionalData.title,
      timestamp: optionalData.timestamp,
      postType: collectionName,
      postID: reviewId,
    };

    try {
      if (bookmarkPost) {
        // Unbookmark the review
        await updateDoc(docRef, {
          saves: arrayRemove({ uid: user?.uid }),
        });
        await updateDoc(userRef, {
          userSaves: arrayRemove(bookmarkData),
        });
        setBookmarkPost(false);
      } else {
        // Bookmark the review
        await updateDoc(docRef, {
          saves: arrayUnion({ uid: user?.uid }),
        });
        await updateDoc(userRef, {
          userSaves: arrayUnion(bookmarkData),
        });
        setBookmarkPost(true);
      }
    } catch (error) {
      console.error("Error updating bookmark status:", error);
    }
  }, [reviewId, user?.uid, bookmarkPost, optionalData, collectionName]);

  useEffect(() => {
    if (user) {
      fetchReviewData();
    }
  }, [fetchReviewData, user]);

  return { likedPost, bookmarkPost, handleLike, handleBookmark };
};

export default useReviewActions;
