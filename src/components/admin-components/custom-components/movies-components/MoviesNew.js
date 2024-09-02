"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import styles from "./MoviesNew.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { auth, db, storage } from "@/app/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import useAddActivity from "@/hooks/useActivities";
import { toast, ToastContainer } from "react-toastify";

const MoviesNewAdmin = ({ movieId }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  /* Start User Notification */
  const { addActivity, loading, error } = useAddActivity(user?.uid);
  /* End User Notification */

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    movieStory: "",
    movieDirector: "",
    movieProducer: "",
    releaseDate: "",
    movieTrailer: "",
    topCasts: "",
  });
  const [selectedType, setSelectedType] = useState(""); // Track selected type

  useEffect(() => {
    // Fetch existing movie details if updating
    const fetchMovieDetails = async () => {
      if (movieId) {
        const movieRef = doc(db, "movies", movieId);
        const movieSnap = await getDoc(movieRef);
        if (movieSnap.exists()) {
          const data = movieSnap.data();
          setMovieDetails(data);
          setCategories(data.categories || []);
          setSelectedType(data.selectedType || "");
          if (data.image) setPreviewImage(data.image); // Set preview image if exists
        }
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setMovieDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the file directly
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleCategorySelect = (selectedList) => {
    setCategories(selectedList);
  };

  const handleCategoryRemove = (selectedList) => {
    setCategories(selectedList);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type); // Set the clicked type as selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = movieDetails.image; // Use existing image URL if not uploading a new one

      if (selectedImage) {
        const storageRef = ref(storage, `movies/${selectedImage.name}`);
        const snapshot = await uploadBytes(storageRef, selectedImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Collect all the form data along with the image URL
      const data = {
        ...movieDetails,
        categories,
        image: imageUrl, // Add the image URL to the data
        selectedType, // Add the selected type to the form data
        timestamp: Timestamp.fromDate(new Date()),
        author: user?.displayName,
      };

      if (movieId) {
        // Update the existing movie document
        const movieRef = doc(db, "movies", movieId);
        await updateDoc(movieRef, data);
        await addActivity({
          description: "Updated a movie post",
          when: new Date(),
          title: data.title,
        });
        // console.log("Movie updated successfully:", data);
        toast.success("Movie updated successfully!");
      } else {
        // Add a new movie document
        await addDoc(collection(db, "movies"), data);
        await addActivity({
          description: "New movie posted",
          when: new Date(),
          title: data.title,
        });
        // console.log("Data submitted successfully:", data);
        toast.success("Movie added successfully!");
      }
    } catch (error) {
      // console.error("Error uploading image or saving data:", error);
      // alert("Failed to upload image or save data. Please try again.");
      toast.error("Failed to upload image or save data. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        {/* Your form structure remains the same */}
        <div className="row" style={{ marginBottom: 60 }}>
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
              >
                {movieId ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
          <div
            className="col-12 col-md-6 col-lg-4"
            style={{ borderRight: "1px solid #000" }}
          >
            <div className="py-3">Thumbnail</div>
            <div style={{ display: "flex", alignItems: "end" }}>
              <div className={styles.thumbnail}>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Thumbnail Preview"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <p>For best results, use 480px x 600px JPG</p>
                )}
              </div>
              <label className={styles.uploadButton} style={{ marginLeft: 10 }}>
                <u>Upload</u>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-8">
            <div className="py-3">Choose which applies</div>
            <div className={styles.chooseApplies}>
              <div
                className={`${styles.allFormControl} ${
                  selectedType === "Movies" ? styles.selectedType : ""
                }`}
                onClick={() => handleTypeClick("Movies")}
                style={{
                  backgroundColor:
                    selectedType === "Movies" ? "#E86C44" : "transparent",
                  cursor: "pointer",
                  color: selectedType === "Movies" ? "#fff" : "#000",
                }}
              >
                Movies
              </div>
              <div
                className={`${styles.allFormControl} ${
                  selectedType === "TV Shows" ? styles.selectedType : ""
                }`}
                onClick={() => handleTypeClick("TV Shows")}
                style={{
                  backgroundColor:
                    selectedType === "TV Shows" ? "#E86C44" : "transparent",
                  cursor: "pointer",
                  color: selectedType === "TV Shows" ? "#fff" : "#000",
                }}
              >
                TV Shows
              </div>
              <Form.Select
                aria-label="Genre"
                style={{ width: 120 }}
                className={styles.allFormControl}
                id="genre"
                onChange={handleInputChange}
                value={movieDetails?.genre}
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
              <Form.Select
                aria-label="Industry"
                style={{ width: 130 }}
                className={styles.allFormControl}
                id="industry"
                onChange={handleInputChange}
                value={movieDetails?.industry}
              >
                <option>Industry</option>
                <option value="Nollywood">Nollywood</option>
                <option value="Hollywood">Hollywood</option>
                <option value="Bollywood">Bollywood</option>
                <option value="KDrama">K-Drama</option>
              </Form.Select>
              <Form.Select
                aria-label="Streaming Platforms"
                style={{ width: 220 }}
                className={styles.allFormControl}
                id="streamingPlatform"
                onChange={handleInputChange}
                value={movieDetails?.streamingPlatform}
              >
                <option>Streaming Platforms</option>
                <option value="Netflix">Netflix</option>
                <option value="PrimeVideo">Prime Video</option>
                <option value="Disney+">Disney+</option>
                <option value="ShowMax">ShowMax</option>
                <option value="Youtube">Youtube</option>
              </Form.Select>
            </div>
            <div className={styles.inputGroup}>
              <Form.Group
                className="mb-3"
                controlId="movieDirector"
                style={{ width: "100% !important" }}
              >
                <Form.Label>Movie Director</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter name of movie director"
                  className={styles.allFormControl}
                  onChange={handleInputChange}
                  value={movieDetails.movieDirector}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="movieProducer"
                style={{ width: "100% !important" }}
              >
                <Form.Label>Movie Producer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter name of movie producer"
                  className={styles.allFormControl}
                  onChange={handleInputChange}
                  value={movieDetails.movieProducer}
                />
              </Form.Group>
            </div>
            <div className={styles.inputGroup}>
              <Form.Group
                className="mb-3"
                controlId="releaseDate"
                style={{ width: "100% !important" }}
              >
                <Form.Label>Release Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter release date"
                  className={styles.allFormControl}
                  onChange={handleInputChange}
                  value={movieDetails.releaseDate}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="movieTrailer"
                style={{ width: "100% !important" }}
              >
                <Form.Label>Movie Trailer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Paste trailer link here"
                  className={styles.allFormControl}
                  onChange={handleInputChange}
                  value={movieDetails.movieTrailer}
                />
              </Form.Group>
            </div>
            <Form.Group
              className="mb-3"
              controlId="topCasts"
              style={{ width: "100% !important" }}
            >
              <Form.Label>Top Casts (up to 20)</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter names of top 20 casts (separate each with a comma)"
                as="textarea"
                rows={5}
                className={styles.allFormControl}
                onChange={handleInputChange}
                value={movieDetails.topCasts}
              />
            </Form.Group>
          </div>
          <section style={{ marginTop: 50 }}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Control
                type="text"
                placeholder="Write title here..."
                className={styles.titleControl}
                onChange={handleInputChange}
                value={movieDetails.title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="movieStory">
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="Start writing..."
                className={styles.allFormControl}
                onChange={handleInputChange}
                value={movieDetails.movieStory}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="categoriesNameControl">
              <Form.Label>Add Categories</Form.Label>
              <Multiselect
                options={[
                  { name: "Top Rated Movies", id: 1 },
                  { name: "Most Popular Movies In Nigeria 2024", id: 2 },
                  { name: "Best Movies Of 2024", id: 3 },
                  { name: "Most Popular Hollywood Movies 2024", id: 4 },
                  { name: "Most Popular Nollywood Movies 2024", id: 5 },
                  { name: "Movies Based On A True Story", id: 6 },
                  { name: "Movies For The Weekend", id: 7 },
                  { name: "Top Movies On Prime", id: 8 },
                ]}
                displayValue="name"
                selectedValues={categories}
                onSelect={handleCategorySelect}
                onRemove={handleCategoryRemove}
                className={styles.allFormControlCategory}
              />
            </Form.Group>
          </section>
        </div>
      </Form>
    </div>
  );
};

export default MoviesNewAdmin;
