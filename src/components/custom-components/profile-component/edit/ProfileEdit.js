"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Container, Form } from "react-bootstrap";
import classes from "./ProfileEdit.module.css";
import changeDpIcon from "../../../../../public/images/icons/change-dp.svg";
import emailIcon from "../../../../../public/images/icons/email.svg";
import userNameIcon from "../../../../../public/images/icons/user-profile.svg";
import { Skeleton } from "@chakra-ui/react";
import {
  getAuth,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/app/firebase/config";
import { toast, ToastContainer } from "react-toastify";

const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [userData, setUserData] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // State for preview
  const [uploading, setUploading] = useState(false);
  const auth = getAuth();
  const router = useRouter();

  const getUserData = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        return userDocSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const data = await getUserData(user.uid);
          setUserData(data);
          setName(data?.displayName || "");
          setEmail(user.email);
          setGender(data?.gender || "");
          setCountry(data?.country || "");

          // Set the initial values
          setInitialValues({
            name: data?.displayName || "",
            gender: data?.gender || "",
            country: data?.country || "",
          });
        } catch (error) {
          console.error("Failed to retrieve user data:", error);
        }
      } else {
        console.log("User is not logged in");
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    // Check if any field has changed from its initial value
    setIsChanged(
      name !== initialValues.name ||
        gender !== initialValues.gender ||
        country !== initialValues.country ||
        !!file // Mark as changed if a new file is selected
    );
  }, [name, gender, country, file, initialValues]);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl); // Set the preview URL when a new file is selected

      // Cleanup the preview URL when the component is unmounted or file is changed
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null); // Reset preview if no file is selected
    }
  }, [file]);

  const handleSendPasswordResetEmail = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset email sent", {
          position: "top-center",
        });
      } catch (error) {
        console.error("Error sending password reset email:", error);
        toast.error("Failed to send password reset email.", {
          position: "top-center",
        });
      }
    } else {
      toast.error("Email address is not available.", {
        position: "top-center",
      });
    }
  };

  const uploadImage = async (file, userId) => {
    const storageRef = ref(storage, `users/${userId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading image:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            reject(error);
          }
        }
      );
    });
  };

  const handleUpdateUserDetails = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      let imageURL = userData?.profilePicture || ""; // Existing image URL or empty string
      try {
        if (file) {
          setUploading(true);
          imageURL = await uploadImage(file, auth.currentUser.uid);
          setUploading(false);
        }

        await updateDoc(userDocRef, {
          displayName: name,
          gender: gender,
          country: country,
          profilePicture: imageURL, // Store the image URL in Firestore
        });

        // Update the user's profile in Firebase Authentication
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imageURL,
        });

        toast.success("User details updated successfully!", {
          position: "top-center",
        });

        // Update initial values after successful update
        setInitialValues({ name, gender, country });
        setIsChanged(false);
        setFile(null); // Reset the file input after successful update
        setPreview(null); // Reset the preview after successful update
      } catch (error) {
        console.error("Error updating user details:", error);
        toast.error("Failed to update user details.", {
          position: "top-center",
        });
        setUploading(false);
      }
    } else {
      alert("User is not logged in.");
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <Container>
      <ToastContainer />
      <section>
        <h1 style={{ fontWeight: "bold" }}>Profile</h1>
        <div style={{ position: "relative" }}>
          <Image
            src={preview || userData?.profilePicture} // Show preview if a file is selected, otherwise show the existing image
            alt={`${name} Image`}
            className={classes.imgStyle}
            priority
            width={200}
            height={200}
          />
          <label
            htmlFor="fileInput"
            style={{
              position: "absolute",
              left: 65,
              top: 65,
              cursor: "pointer",
            }}
          >
            <Image src={changeDpIcon} alt="change dp icon" priority />
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <h2 style={{ fontWeight: "bold", fontSize: 25 }}>
            Personal Information
          </h2>
          <section>
            <div style={{ color: "#4C4A48", marginBottom: 7, marginTop: 30 }}>
              Email address
            </div>
            <div
              className="col-12 col-md-6 col-lg-4"
              style={{
                border: "1px solid #A19F9D",
                padding: "8px 10px",
                borderRadius: 10,
              }}
            >
              <div style={{ display: "flex" }}>
                <Image
                  src={emailIcon}
                  alt="Email Icon"
                  priority
                  style={{ marginRight: 10 }}
                />
                {userData ? (
                  <span>{userData.email}</span>
                ) : (
                  <Skeleton width="100%">
                    <div>contents wrapped</div>
                  </Skeleton>
                )}
              </div>
            </div>
          </section>
          <section style={{ marginTop: 20 }}>
            <div style={{ color: "#4C4A48", marginBottom: 7 }}>Username</div>
            <div
              className="col-12 col-md-6 col-lg-4"
              style={{
                border: "1px solid #A19F9D",
                padding: "8px 10px",
                borderRadius: 10,
              }}
            >
              <div style={{ display: "flex" }}>
                <Image
                  src={userNameIcon}
                  alt="Username Icon"
                  priority
                  style={{ marginRight: 10 }}
                />
                {userData ? (
                  <span>{userData.displayName}</span>
                ) : (
                  <Skeleton width="100%">
                    <div>contents wrapped</div>
                  </Skeleton>
                )}
              </div>
            </div>
          </section>
          <section style={{ marginTop: 20 }}>
            <div style={{ color: "#4C4A48", marginBottom: 7 }}>Gender</div>
            <div
              className="col-12 col-md-6 col-lg-4"
              style={{
                border: "1px solid #A19F9D",
                padding: "4px 10px",
                borderRadius: 10,
              }}
            >
              <Form.Select
                aria-label="Default select example"
                className={classes.genderField}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </Form.Select>
            </div>
          </section>
          <section style={{ marginTop: 20 }}>
            <Form.Label style={{ color: "#4C4A48", marginBottom: 7 }}>
              Country
            </Form.Label>
            <div
              className="col-12 col-md-6 col-lg-4"
              style={{
                border: "1px solid #A19F9D",
                padding: "6px 10px",
                borderRadius: 10,
              }}
            >
              <Form.Control
                className={classes.genderField}
                type="text"
                placeholder="Enter your country e.g. Nigeria"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </section>
          <h2
            style={{
              fontWeight: "bold",
              fontSize: 25,
              marginBottom: 20,
              marginTop: 30,
            }}
          >
            Password
          </h2>
          <section style={{ margin: "50px 0" }}>
            <Button
              className={`${classes.changePasswordBtn} col-12 col-md-6 col-lg-4`}
              onClick={handleSendPasswordResetEmail}
            >
              Send Password Reset Email
            </Button>
          </section>
          <div style={{ marginBottom: 50 }}>
            <Button
              className={`${classes.saveChangesBtn} col-12 col-md-4 col-lg-3`}
              onClick={handleUpdateUserDetails}
              disabled={!isChanged || uploading} // Disable the button if no changes or while uploading
            >
              {uploading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ProfileEdit;
