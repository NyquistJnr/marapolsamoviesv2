"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Container } from "react-bootstrap";

import classes from "./MainProfile.module.css";

import ProfileTabs from "./ProfileTabs";
import { useAuth } from "@/context/AuthContext";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import userDP from "../../../../public/images/userDP.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";

const MainProfile = () => {
  const router = useRouter();

  const { isAuthenticated } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [userData, setUserData] = useState(null);
  const auth = getAuth();

  const getUserData = async (uid) => {
    try {
      // Reference to the user's document in Firestore
      const userDocRef = doc(db, "users", uid);

      // Fetch the document from Firestore
      const userDocSnap = await getDoc(userDocRef);

      // Check if the document exists
      if (userDocSnap.exists()) {
        // Return the user data
        return userDocSnap.data();
      } else {
        // If the document does not exist
        // console.log("No such document!");
        return null;
      }
    } catch (error) {
      // console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user data from Firestore
          const data = await getUserData(user.uid);
          setUserData(data);
        } catch (error) {
          // console.error("Failed to retrieve user data:", error);
        }
      } else {
        // console.log("User is not logged in");
        setUserData(null);
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, [auth]);

  if (!userData) {
    return (
      <Container style={{ height: "55vh" }}>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "50px 0",
          }}
        >
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <>
              <Box padding="6" width="100%">
                <SkeletonCircle size="130" />
                <SkeletonText
                  mt="4"
                  noOfLines={3}
                  spacing="4"
                  skeletonHeight="4"
                />
              </Box>
            </>
          </div>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        onClick={() => router.back()}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "transparent",
          borderColor: "transparent",
          color: "#000",
        }}
      >
        <FaArrowLeftLong style={{ marginRight: 10 }} />
        Back
      </Button>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 0",
        }}
      >
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <>
            <Image
              src={userData.profilePicture ? userData?.profilePicture : userDP}
              alt={`${userData.displayName} Image`}
              className={classes.imgStyle}
              // priority
              width={200}
              height={200}
              style={{ borderRadius: 10 }}
            />
            <div style={{ marginTop: 20, fontWeight: "bold", fontSize: 20 }}>
              Welcome {userData.displayName}!
            </div>
            <div style={{ marginBottom: 10, fontSize: 13 }}>{email}</div>
            <Link href="/profile/edit" className={`${classes.editBtn} btn`}>
              Edit Profile
            </Link>
            <div style={{ marginTop: 40 }}>
              {(userData?.statusRole === "admin" ||
                userData?.statusRole === "staff") && (
                <Link href="/admin" className={`${classes.editBtn} btn`}>
                  Go to Admin
                </Link>
              )}
            </div>
          </>
        </div>
      </section>
      <section style={{ marginTop: 20 }}>
        <ProfileTabs />
      </section>
    </Container>
  );
};

export default MainProfile;
