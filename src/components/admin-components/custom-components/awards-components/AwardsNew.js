"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addDoc, doc, updateDoc, getDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "@/app/firebase/config";

import RichTextEditor from "../../general-components/text-editor/TextEditor";
import { useAuthState } from "react-firebase-hooks/auth";

import classes from "./AwardsNew.module.css";
import { toast, ToastContainer } from "react-toastify";
import useAddActivity from "@/hooks/useActivities";

const AwardsNewAdmin = (props) => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null); // New state for storing selected image
  const [imageUrl, setImageUrl] = useState(""); // State to store the uploaded image URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [user] = useAuthState(auth);

  const {
    addActivity,
    loading: activityLoading,
    error: activityError,
  } = useAddActivity(user?.uid);

  useEffect(() => {
    const loadDocumentData = async () => {
      if (props.id) {
        setLoading(true);
        try {
          const docRef = doc(db, "awards", props.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title || "");
            setContent(data.content || "");
            setImageUrl(data.imageUrl || ""); // Load existing image URL if available
          } else {
            console.error("No such document!");
          }
        } catch (err) {
          console.error("Error loading document:", err);
          setError("Failed to load the document. Please try again.");
        } finally {
          setLoading(false);
          setIsDataLoaded(true);
        }
      } else {
        setIsDataLoaded(true);
      }
    };

    loadDocumentData();
  }, [props.id]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };

  const uploadImage = async () => {
    if (!image) return "";

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${Date.now()}-${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error("Failed to upload image. Please try again.");
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedImageUrl = await uploadImage();
      const formData = {
        title,
        content,
        imageUrl: uploadedImageUrl || imageUrl, // Use new image URL or keep the existing one
        timestamp: new Date(),
        author: user?.displayName,
      };

      if (props.id) {
        const docRef = doc(db, "awards", props.id);
        await updateDoc(docRef, formData);
        await addActivity({
          description: "Updated an awards post",
          when: new Date(),
          title: formData.title,
        });
        toast.success("Awards Updated Successfully!");
      } else {
        await addDoc(collection(db, "awards"), formData);
        await addActivity({
          description: "New Post on awards",
          when: new Date(),
          title: formData.title,
        });
        toast.success("Awards Posted Successfully!");
      }
    } catch (err) {
      toast.error(
        "An Error Occured while trying to Post, contact your IT Department Immediately."
      );
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ marginBottom: 40 }}>
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
          <div>
            <Button
              className="btn"
              style={{
                background: "#E86C44",
                color: "#fff",
                borderColor: "#E86C44",
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : props.id ? "Update" : "Publish"}
            </Button>
          </div>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="titleControl">
            <Form.Control
              type="text"
              placeholder="Write title here..."
              className={classes.titleControl}
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="imageControl">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>

          {isDataLoaded ? (
            <RichTextEditor value={content} onChange={handleContentChange} />
          ) : (
            <p>Loading content editor...</p>
          )}

          {imageUrl && (
            <div style={{ marginTop: 20 }}>
              <h5>Current Image:</h5>
              <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
            </div>
          )}

          <div>{error && <div style={{ color: "red" }}>{error}</div>}</div>
          <div style={{ marginTop: 60 }}>
            <h3>Preview Output:</h3>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AwardsNewAdmin;
