"use client";
// components/CommentBox.js
import { useState } from "react";
import Image from "next/image";
import { Form, Button, InputGroup } from "react-bootstrap";
import { auth, db } from "@/app/firebase/config"; // Ensure you have the correct path to your Firebase config
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import styles from "./CommentBox.module.css";

import dpImage from "../../../public/images/icons/dp.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaRegUserCircle } from "react-icons/fa";

const CommentBox = (props) => {
  const [comment, setComment] = useState("");

  const [user, loading] = useAuthState(auth);

  const handleChange = (e) => {
    if (e.target.value.length <= 1000) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (comment.length === 0) return;

    if (!user) {
      alert("You need to be logged in to submit a comment.");
      return;
    }

    try {
      const commentData = {
        text: comment.trim(),
        timestamp: Timestamp.fromDate(new Date()),
        uid: user.uid,
        profile_pic: user.photoURL,
        username: user.displayName,
      };

      const docRef = doc(db, "reviews", props.id);
      await updateDoc(docRef, {
        comments: arrayUnion(commentData),
      });

      const userCommentsRef = doc(db, "users", user.uid);
      await updateDoc(userCommentsRef, {
        userComments: arrayUnion({
          timestamp: new Date(),
          postId: props.id,
        }),
      });

      props.onSaveComment(commentData);
      alert("Comment submitted successfully!");
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("There was an error submitting your comment.");
    }
  };

  return (
    <div className={`p-3 ${styles.commentBox}`}>
      <InputGroup className="mb-3">
        <InputGroup>
          {user?.photoURL ? (
            <Image
              src={user?.photoURL}
              className={styles.avatar}
              alt="Profile Picture"
              width={60}
              height={60}
              style={{
                borderRadius: 50,
                objectFit: "cover",
                objectPosition: "center",
                width: 50,
                height: 50,
              }}
            />
          ) : (
            <FaRegUserCircle size={30} />
          )}
        </InputGroup>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Add a comment..."
          value={comment}
          onChange={handleChange}
          className={styles.textArea}
          maxLength="1000"
        />
      </InputGroup>
      <div className="d-flex justify-content-between align-items-center">
        <span className={styles.charCount}>{comment.length}/1000</span>
        <Button
          variant="outline-secondary"
          disabled={comment.length === 0}
          className={styles.commentButton}
          onClick={handleSubmit} // Attach the submit handler
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentBox;
