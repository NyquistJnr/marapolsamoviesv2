"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import classes from "./ReviewList.module.css";

import { FaArrowLeftLong } from "react-icons/fa6";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import SingleReview from "../../general-components/SingleReview";

import img1 from "../../../../../public/images/templates-imgs/movie-detail.png";
import { Button } from "react-bootstrap";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { GrAdd } from "react-icons/gr";

const ReviewListAdmin = () => {
  const [recentData, setRecentData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [tvShowsData, setTvShowsData] = useState([]);

  /* First Function */
  const fetchReviews = async () => {
    try {
      const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const reviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentData(reviews);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  /* Second Function */
  const fetchMovies = async () => {
    try {
      const q = query(
        collection(db, "reviews"),
        where("category", "==", "Movies"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const moviesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMoviesData(moviesData);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  /* Third Function */
  const fetchTvShows = async () => {
    try {
      const q = query(
        collection(db, "reviews"),
        where("category", "==", "TV Shows"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const tvShowsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTvShowsData(tvShowsData);
    } catch (error) {
      console.error("Error fetching tvshows:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchMovies();
    fetchTvShows();
  }, []);

  console.log(moviesData);
  // console.log(recentData);
  console.log(tvShowsData);
  return (
    <div>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                color: "#575655",
              }}
              href="/admin/reviews"
            >
              <FaArrowLeftLong style={{ marginRight: 10 }} />
              Back
            </Link>
          </div>
        </div>
        <div>
          <Link
            className="btn"
            href="/admin/reviews/new"
            style={{
              background: "#E86C44",
              color: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <GrAdd style={{ marginRight: 10 }} /> Add New
          </Link>
        </div>
      </section>
      <section>
        <div style={{ fontWeight: "bold", fontSize: 24 }}>Recent Reviews</div>
      </section>
      <section>
        <Tabs>
          <TabList>
            <Tab
              _selected={{
                borderBottom: "3px solid #e86c44",
                color: "#e86c44",
              }}
            >
              All
            </Tab>
            <Tab
              _selected={{
                borderBottom: "3px solid #e86c44",
                color: "#e86c44",
              }}
            >
              Movies
            </Tab>
            <Tab
              _selected={{
                borderBottom: "3px solid #e86c44",
                color: "#e86c44",
              }}
            >
              TV Shows
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {recentData.length > 0 ? (
                <section>
                  {recentData.map((data) => (
                    <div key={data.id}>
                      <SingleReview {...data} />
                    </div>
                  ))}
                </section>
              ) : (
                <div className="text-center">Loading...</div>
              )}
            </TabPanel>
            <TabPanel>
              {moviesData.length > 0 ? (
                <section>
                  {moviesData.map((data) => (
                    <div key={data.id}>
                      <SingleReview {...data} />
                    </div>
                  ))}
                </section>
              ) : (
                <div className="text-center">Loading...</div>
              )}
            </TabPanel>
            <TabPanel>
              {tvShowsData.length > 0 ? (
                <section>
                  {tvShowsData.map((data) => (
                    <div key={data.id}>
                      <SingleReview {...data} />
                    </div>
                  ))}
                </section>
              ) : (
                <div className="text-center">Loading...</div>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    </div>
  );
};

export default ReviewListAdmin;
