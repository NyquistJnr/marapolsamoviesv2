"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import LikeAndComment from "./LikeAndComment";
import useGetUserLikesAndSaves from "@/hooks/useGetUserLikesAndSaves";

const ProfileSaved = () => {
  const [user] = useAuthState(auth);

  const {
    sortedData: sortedUserSaves,
    isLoading,
    error,
  } = useGetUserLikesAndSaves(user?.uid, "userSaves");

  console.log("Hello", sortedUserSaves);
  return (
    <section>
      {isLoading ? (
        <div>Nigga I am Loading...</div>
      ) : (
        <>
          <div>
            {sortedUserSaves?.length < 1 && (
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
                  You haven&apos;t saved anything yet.
                </h4>
                <p style={{ fontSize: 13 }}>
                  Your saved reviews, news and awards will show here.
                </p>
              </div>
            )}
          </div>
          <div className="row">
            {sortedUserSaves?.length > 0 &&
              sortedUserSaves?.map((item) => (
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

export default ProfileSaved;
