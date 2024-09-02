"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";

import LikeAndComment from "./LikeAndComment";
import useGetUserLikesAndSaves from "@/hooks/useGetUserLikesAndSaves";

const ProfileLikes = () => {
  const [user] = useAuthState(auth);

  const {
    sortedData: sortedUserLikes,
    isLoading,
    error,
  } = useGetUserLikesAndSaves(user?.uid, "userLikes");

  // console.log("hello likes", sortedUserLikes);
  return (
    <section>
      {isLoading ? (
        <div
          className="text-center"
          style={{
            height: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h4 style={{ fontWeight: "bold", fontSize: 16 }}>Loading...</h4>
        </div>
      ) : (
        <>
          {sortedUserLikes?.length < 1 && (
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
                You haven&apos;t liked anything yet.
              </h4>
              <p style={{ fontSize: 13 }}>
                Your liked reviews, news and awards will show here.
              </p>
            </div>
          )}
          <div className="row">
            {sortedUserLikes?.length > 0 &&
              sortedUserLikes?.map((item) => (
                <div
                  className="col-12 col-md-6 col-lg-4 py-2"
                  key={Math.random()}
                >
                  <LikeAndComment {...item} />
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ProfileLikes;
