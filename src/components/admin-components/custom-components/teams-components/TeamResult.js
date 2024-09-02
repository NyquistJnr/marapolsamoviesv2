"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import useUserActivities from "@/hooks/useFetchActivity";
import { Button } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";

const TeamResult = () => {
  const router = useRouter("");
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const { activities, username, profilePicture, loading, error } =
    useUserActivities(id);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p>Error loading activities: {error.message}</p>;
  return (
    <div>
      <div style={{ margin: "20px 0", color: "#575655" }}>
        Team &gt; View Activities
      </div>
      <div style={{ marginBottom: 30 }}>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            color: "#575655",
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          onClick={() => router.back()}
        >
          <FaArrowLeftLong style={{ marginRight: 10 }} />
          Back
        </Button>
      </div>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 25, fontWeight: "bold" }}>
          {username}'s Activities
        </div>
        <div style={{ color: "#575655" }}>
          An overview of {username}&apos;s activities
        </div>
      </div>
      <div>
        {activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          activities.map((activity, index) => (
            <div key={index}>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: 10 }}>
                  <img
                    src={profilePicture ? profilePicture : "/user.svg"}
                    alt={`${username} profile picture`}
                    width={50}
                    height={50}
                    style={{ borderRadius: 10 }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <div>
                    <b>
                      {activity.description} by {username}
                    </b>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ color: "#726F6C" }}>
                      <i>Title: "{activity.title}"</i>
                    </div>
                    <div style={{ fontSize: 12, color: "#726F6C" }}>
                      <b>{new Date(activity.when.toDate()).toLocaleString()}</b>
                    </div>
                  </div>
                </div>
              </div>
              <hr style={{ color: "#726F6C", marginBottom: 5 }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeamResult;
