"use client";

import { Card, Image } from "react-bootstrap";
import styles from "./CommentList.module.css";

const CommentList = (props) => {
  return (
    <div className={styles.commentListContainer}>
      {props.value?.length > 0 ? (
        <>
          {props.value?.map((comment, index) => (
            <Card key={index} className={`p-3 mb-3 ${styles.commentCard}`}>
              <div className="d-flex align-items-center mb-2">
                <Image
                  src={comment.profile_pic}
                  roundedCircle
                  className={styles.avatar}
                  alt="dp profile"
                  style={{
                    width: 45,
                    height: 45,
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <div className="ml-2">
                  <span className={styles.username}>@{comment.username}</span> |{" "}
                  <span className={styles.time}>
                    {comment.timestamp?.toDate()?.toLocaleString()}
                  </span>
                </div>
              </div>
              <Card.Text className={styles.content}>{comment.text}</Card.Text>
              <div className="d-flex justify-content-start align-items-center">
                <span className={styles.replies}>
                  {comment.replies} <i className="bi bi-chat"></i>
                </span>
                <span className={styles.likes}>
                  {comment.likes} <i className="bi bi-heart"></i>
                </span>
              </div>
              <hr />
            </Card>
          ))}
        </>
      ) : (
        <div className="text-center">No comment yet!</div>
      )}
    </div>
  );
};

export default CommentList;
