"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import classes from "./ReviewNew.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button, Container, Form } from "react-bootstrap";
import RatingComponent from "@/components/general-components/RatingComponent";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "@/app/firebase/config";
import { useAuth } from "@/context/AuthContext";

import { BsTrash } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const ReviewNew = ({ reviewId }) => {
  const router = useRouter();
  const { username } = useAuth();
  const [formData, setFormData] = useState({
    movieDirector: "",
    topCasts: "",
    title: "",
    plot: "",
    acting: "",
    characters: "",
    storytelling: "",
    verdict: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [starRating, setStarRating] = useState(null);
  const [genre, setGenre] = useState("");
  const [industry, setIndustry] = useState("");
  const [streamingPlatform, setStreamingPlatform] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      if (reviewId) {
        try {
          const reviewRef = doc(db, "reviews", reviewId);
          const reviewSnap = await getDoc(reviewRef);
          if (reviewSnap.exists()) {
            setFormData(reviewSnap.data());
            setSelectedCategory(reviewSnap.data().category);
            setStarRating(reviewSnap.data().rating);
            setSelectedImageUrl(reviewSnap.data().image);
            setGenre(reviewSnap.data().genre);
            setIndustry(reviewSnap.data().industry);
            setStreamingPlatform(reviewSnap.data().streamingPlatform);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document: ", error);
        }
      }
    };
    fetchReview();
  }, [reviewId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClear = (fieldName) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: "" }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (selectedImage) {
      const imageRef = ref(storage, `images/${selectedImage.name}`);
      await uploadBytes(imageRef, selectedImage);
      imageUrl = await getDownloadURL(imageRef);
    }

    try {
      if (reviewId) {
        // Update existing review
        const reviewRef = doc(db, "reviews", reviewId);
        await updateDoc(reviewRef, {
          ...formData,
          image: imageUrl || selectedImageUrl,
          category: selectedCategory,
          rating: starRating,
          genre,
          industry,
          streamingPlatform,
        });
        toast.success("Review updated successfully!");
      } else {
        // Create a new review
        await addDoc(collection(db, "reviews"), {
          ...formData,
          image: imageUrl,
          category: selectedCategory,
          rating: starRating,
          timestamp: Timestamp.fromDate(new Date()),
          author: username ? username : "Anon",
          genre,
          industry,
          streamingPlatform,
        });
        toast.success("Review submitted successfully!");
      }
    } catch (error) {
      console.error("Error saving document: ", error);
      toast.error("Failed to save review.");
    }
  };

  return (
    <Container fluid>
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
              {reviewId ? "Update" : "Publish"}
            </Button>
          </div>
        </section>
        <section>
          <div className="row">
            <div
              className="col-12 col-md-5 col-lg-3 py-2"
              style={{ borderRight: "1px solid #000" }}
            >
              <div className="py-2">Thumbnail</div>
              <div style={{ display: "flex", alignItems: "end" }}>
                {selectedImageUrl ? (
                  <img
                    src={selectedImageUrl}
                    alt="Thumbnail Preview"
                    style={{ width: 200, height: "auto", borderRadius: 10 }}
                  />
                ) : (
                  <div
                    style={{
                      padding: "80px 10px",
                      background: "#D9D9D9",
                      color: "#171616",
                      width: 150,
                      borderRadius: 10,
                    }}
                    className="text-center"
                  >
                    "For best results, use 480px x 600px JPG"
                  </div>
                )}
                <div style={{ marginLeft: 10 }}>
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
            </div>
            <div className="col-12 col-md-7 col-lg-9 py-2">
              <div style={{ marginBottom: 20, fontWeight: "bold" }}>
                Choose which applies
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    marginRight: 10,
                    border: "1px solid #A19F9D",
                    padding: "5px 20px",
                    borderRadius: 5,
                    marginBottom: 10,
                    backgroundColor:
                      selectedCategory === "Movies" ? "#E86C44" : "transparent",
                    color: selectedCategory === "Movies" ? "#fff" : "#000",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCategoryClick("Movies")}
                >
                  Movies
                </div>
                <div
                  style={{
                    marginRight: 10,
                    border: "1px solid #A19F9D",
                    padding: "5px 20px",
                    borderRadius: 5,
                    marginBottom: 10,
                    backgroundColor:
                      selectedCategory === "TV Shows"
                        ? "#E86C44"
                        : "transparent",
                    color: selectedCategory === "TV Shows" ? "#fff" : "#000",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCategoryClick("TV Shows")}
                >
                  TV Shows
                </div>
                <div
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    border: "1px solid #A19F9D",
                    borderRadius: 5,
                  }}
                >
                  <Form.Select
                    style={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "none",
                    }}
                    aria-label="Genre"
                    value={genre} // Set the current value from state
                    onChange={(event) => setGenre(event.target.value)}
                  >
                    <option>Genre</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Horror">Horror</option>
                    <option value="Drama">Drama</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Romance">Romance</option>
                    <option value="Crime">Crime</option>
                  </Form.Select>
                </div>
                <div
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    border: "1px solid #A19F9D",
                    borderRadius: 5,
                  }}
                >
                  <Form.Select
                    style={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "none",
                    }}
                    aria-label="Industry"
                    value={industry} // Set the current value from state
                    onChange={(event) => setIndustry(event.target.value)}
                  >
                    <option>Industry</option>
                    <option value="Nollywood">Nollywood</option>
                    <option value="Hollywood">Hollywood</option>
                    <option value="Bollywood">Bollywood</option>
                    <option value="KDrama">K-Drama</option>
                  </Form.Select>
                </div>
                <div
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    border: "1px solid #A19F9D",
                    borderRadius: 5,
                  }}
                >
                  <Form.Select
                    style={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "none",
                    }}
                    aria-label="Streaming Platforms"
                    value={streamingPlatform} // Set the current value from state
                    onChange={(event) =>
                      setStreamingPlatform(event.target.value)
                    }
                  >
                    <option>Streaming Platforms</option>
                    <option value="Netflix">Netflix</option>
                    <option value="PrimeVideo">Prime Video</option>
                    <option value="Disney+">Disney+</option>
                    <option value="ShowMax">ShowMax</option>
                    <option value="Youtube">Youtube</option>
                  </Form.Select>
                </div>
              </div>
              <Container>
                <div>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="nameOfMovieDirectorControl"
                  >
                    <Form.Label style={{ color: "#4C4A48" }}>
                      Movie Director
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the name of movie director"
                      className={classes.formsControls}
                      name="movieDirector"
                      value={formData.movieDirector}
                      onChange={handleInputChange}
                    />
                    <div className="py-2" style={{ textAlign: "right" }}>
                      <Button
                        onClick={() => handleClear("movieDirector")}
                        className={classes.deleteBtn}
                      >
                        <BsTrash color="#000" />
                      </Button>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 py-2"
                    controlId="nameOfCastsControl"
                  >
                    <Form.Label style={{ color: "#4C4A48" }}>
                      Top Casts (up to 10)
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter names of top 10 casts (separate each with a comma)"
                      className={classes.formsControls}
                      name="topCasts"
                      value={formData.topCasts}
                      onChange={handleInputChange}
                    />
                    <div className="py-2" style={{ textAlign: "right" }}>
                      <Button
                        onClick={() => handleClear("topCasts")}
                        className={classes.deleteBtn}
                      >
                        <BsTrash color="#000" />
                      </Button>
                    </div>
                  </Form.Group>
                </div>
              </Container>
            </div>
          </div>
        </section>
        <section style={{ margin: "20px 0 100px 0" }}>
          <Container>
            <Form.Group className="mb-3" controlId="titleControl">
              <Form.Control
                type="text"
                placeholder="Write title here..."
                className={classes.titleControl}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <div className="py-2" style={{ textAlign: "right" }}>
                <Button
                  onClick={() => handleClear("title")}
                  className={classes.deleteBtn}
                >
                  <BsTrash color="#000" />
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 py-2" controlId="plotsControl">
              <Form.Label style={{ color: "#4C4A48", fontWeight: "bold" }}>
                The Plot
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Start writing..."
                name="plot"
                value={formData.plot}
                onChange={handleInputChange}
                className={classes.formStroryControls}
              />
              <div className="py-2" style={{ textAlign: "right" }}>
                <Button
                  onClick={() => handleClear("plot")}
                  className={classes.deleteBtn}
                >
                  <BsTrash color="#000" />
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 py-2" controlId="actingControl">
              <Form.Label style={{ color: "#4C4A48", fontWeight: "bold" }}>
                Acting
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Start writing..."
                name="acting"
                value={formData.acting}
                onChange={handleInputChange}
                className={classes.formStroryControls}
              />
              <div className="py-2" style={{ textAlign: "right" }}>
                <Button
                  onClick={() => handleClear("acting")}
                  className={classes.deleteBtn}
                >
                  <BsTrash color="#000" />
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 py-2" controlId="charactersControl">
              <Form.Label style={{ color: "#4C4A48", fontWeight: "bold" }}>
                Characters
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Start writing..."
                name="characters"
                value={formData.characters}
                onChange={handleInputChange}
                className={classes.formStroryControls}
              />
              <div className="py-2" style={{ textAlign: "right" }}>
                <Button
                  onClick={() => handleClear("characters")}
                  className={classes.deleteBtn}
                >
                  <BsTrash color="#000" />
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 py-2" controlId="storytellingControl">
              <Form.Label style={{ color: "#4C4A48", fontWeight: "bold" }}>
                Storytelling
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Start writing..."
                name="storytelling"
                value={formData.storytelling}
                onChange={handleInputChange}
                className={classes.formStroryControls}
              />
              <div className="py-2" style={{ textAlign: "right" }}>
                <Button
                  onClick={() => handleClear("storytelling")}
                  className={classes.deleteBtn}
                >
                  <BsTrash color="#000" />
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 py-2" controlId="verdictControl">
              <Form.Label style={{ color: "#4C4A48", fontWeight: "bold" }}>
                The Verdict
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Start writing..."
                name="verdict"
                value={formData.verdict}
                onChange={handleInputChange}
                className={classes.formStroryControls}
              />
              <div className="py-2" style={{ textAlign: "right" }}>
                <Button
                  onClick={() => handleClear("verdict")}
                  className={classes.deleteBtn}
                >
                  <BsTrash color="#000" />
                </Button>
              </div>
            </Form.Group>
            <div className="py-3">
              <RatingComponent
                title="Total"
                value={starRating}
                ratingValue={(a) => setStarRating(a)}
              />
            </div>
          </Container>
        </section>
      </Form>
    </Container>
  );
};

export default ReviewNew;
