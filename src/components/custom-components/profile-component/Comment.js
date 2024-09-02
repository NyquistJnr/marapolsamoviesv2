"use client";

import { useEffect, useState } from "react";
import CommentedProfile from "./CommentedProfile";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import useListAllUserComments from "@/hooks/useListAllUserComments";

const ProfileComment = () => {
  const [user] = useAuthState(auth);

  const { relatedDocuments, loading, error } = useListAllUserComments(user);

  if (error) return <div>Error: {error.message}</div>;

  // console.log("Comment here", relatedDocuments);

  return (
    <section>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
};

export default ProfileComment;
