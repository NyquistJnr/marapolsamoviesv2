"use client";

import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

const JoinConversation = () => {
  const router = useRouter();
  return (
    <section
      style={{
        background: "#E86C44",
        height: "250px",
        paddingTop: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="text-center" style={{ color: "white" }}>
        <h3>Join the conversation.</h3>
        <p>
          Write and share your comments on movies and TV shows. Sign up and
          start talking.
        </p>
        <Button
          style={{ color: "#E86C44" }}
          onClick={() => router.push("/sign-up")}
        >
          Sign Up
        </Button>
      </div>
    </section>
  );
};

export default JoinConversation;
