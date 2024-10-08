"use client";

import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "@/app/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import classes from "./NewsNew.module.css";
import { toast, ToastContainer } from "react-toastify";
import useAddActivity from "@/hooks/useActivities";
import RichTextEditor from "../../general-components/text-editor/TextEditor";

const NewsNewAdminComponent = ({ docId }) => {
  const [user] = useAuthState(auth);
  /* Start User Notification */
  const { addActivity, loading, error } = useAddActivity(user?.uid);
  /* End User Notification */
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (docId) {
      // Fetch the document data if we're editing
      const fetchDocument = async () => {
        const docRef = doc(db, "news", docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDescription(data.description);
          setThumbnail(data.image);
        } else {
          console.error("Document does not exist!");
        }
        setIsDataLoaded(true);
      };

      fetchDocument();
    } else {
      setIsDataLoaded(true); // Mark data as loaded if no docId is provided
    }
  }, [docId]);

  const handleDelete = (setState) => {
    setState("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
      setThumbnailFile(file); // Store the file for later upload
    }
  };

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !description || (!thumbnailFile && !docId)) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    try {
      let imageUrl = thumbnail;

      if (thumbnailFile) {
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `news/${thumbnailFile.name}`);
        await uploadBytes(storageRef, thumbnailFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      if (docId) {
        // Update existing document
        const docRef = doc(db, "news", docId);
        await updateDoc(docRef, {
          title,
          description,
          image: imageUrl,
          timestamp: serverTimestamp(),
          author: user?.displayName,
        });
        await addActivity({
          description: "Updated a News post",
          when: new Date(),
          title: title,
        });
        toast.success("News successfully updated!");
      } else {
        // Add new document to Firestore
        await addDoc(collection(db, "news"), {
          title,
          description,
          image: imageUrl,
          timestamp: serverTimestamp(),
          author: user?.displayName,
        });
        await addActivity({
          description: "New News posted!",
          when: new Date(),
          title: title,
        });
        toast.success("News successfully published!");
      }

      // router.back(); // Navigate back after successful submission
    } catch (error) {
      toast.error("Failed to post the news, contact IT.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
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
            >
              {docId ? "Update" : "Publish"}
            </Button>
          </div>
        </section>
        <section>
          <div className="py-4">Thumbnail</div>
          <div style={{ display: "flex", alignItems: "end", flexWrap: "wrap" }}>
            <div
              style={{
                padding: "100px 10px",
                background: "#D9D9D9",
                color: "#171616",
                width: "80%",
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="Thumbnail"
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    height: 300,
                    objectFit: "cover",
                    objectPosition: "25% 5%",
                  }}
                />
              ) : (
                '"For best results, use 1200px x 400px JPG"'
              )}
            </div>
            <div className="py-2" style={{ marginLeft: 20 }}>
              <label>
                <u style={{ cursor: "pointer" }}>Upload</u>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </section>
        <section style={{ marginTop: 40, width: "80%" }}>
          <Form.Group className="mb-3" controlId="titleControl">
            <Form.Control
              type="text"
              placeholder="Write title here..."
              className={classes["titleControl"]}
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="py-2" style={{ textAlign: "right" }}>
              <Button
                onClick={() => handleDelete(setTitle)}
                className={classes["deleteBtn"]}
                style={{
                  backgroundColor: "transparent",
                  color: "#000",
                  borderColor: "transparent",
                }}
              >
                <BsTrash color="#000" />
              </Button>
            </div>
          </Form.Group>
          {isDataLoaded ? (
            <RichTextEditor
              value={description}
              onChange={handleDescriptionChange}
            />
          ) : (
            <p>Loading content editor...</p>
          )}
          <div className="py-2" style={{ textAlign: "right" }}>
            <Button
              onClick={() => handleDelete(setDescription)}
              className={classes["deleteBtn"]}
            >
              <BsTrash color="#000" />
            </Button>
          </div>
        </section>
      </Form>
    </div>
  );
};

export default NewsNewAdminComponent;
