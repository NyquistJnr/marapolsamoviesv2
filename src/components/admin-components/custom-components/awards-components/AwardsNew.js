"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addDoc, doc, updateDoc, getDoc, collection } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";

import RichTextEditor from "../../general-components/text-editor/TextEditor";
import { useAuthState } from "react-firebase-hooks/auth";

import classes from "./AwardsNew.module.css";

const AwardsNewAdmin = (props) => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Load existing document data if `id` is present
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
        setIsDataLoaded(true); // If no ID, mark data as loaded immediately
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        title,
        content,
        timestamp: new Date(),
        author: user?.displayName,
      };

      if (props.id) {
        // Update the existing document
        const docRef = doc(db, "awards", props.id);
        await updateDoc(docRef, formData);
        console.log("Document updated:", formData);
      } else {
        // Add a new document
        await addDoc(collection(db, "awards"), formData);
        console.log("New document submitted:", formData);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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

          {isDataLoaded ? (
            <RichTextEditor value={content} onChange={handleContentChange} />
          ) : (
            <p>Loading content editor...</p> // Fallback while data is being loaded
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
