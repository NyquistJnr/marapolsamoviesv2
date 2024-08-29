"use client";

import Link from "next/link";
import classes from "./ReviewList.module.css";

import { FaArrowLeftLong } from "react-icons/fa6";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import SingleReview from "../../general-components/SingleReview";

import { GrAdd } from "react-icons/gr";
import useFetchRecentReviews from "@/hooks/useFetchRecentReviews";
import useFetchCategoryData from "@/hooks/useGetShowAdmin";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

const ReviewListAdmin = () => {
  const router = useRouter();
  const {
    recentData,
    isLoading: mainLoading,
    error: mainError,
  } = useFetchRecentReviews();
  const { data: moviesData, isLoading, error } = useFetchCategoryData("Movies");
  const {
    data: tvShowsData,
    isLoading: tvshowLoading,
    error: tvshowError,
  } = useFetchCategoryData("TV Shows");

  // console.log(moviesData);
  // console.log(recentData);
  // console.log(tvShowsData);
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
              {mainLoading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <>
                  {recentData.length > 0 ? (
                    <section>
                      {recentData.map((data) => (
                        <div key={data.id}>
                          <SingleReview {...data} />
                        </div>
                      ))}
                    </section>
                  ) : (
                    <div className="text-center">No Review yet</div>
                  )}
                </>
              )}
              {mainError && (
                <div className="text-center">
                  An Error Occured
                  <hr />
                  Reload your browser.
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {isLoading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <>
                  {moviesData.length > 0 ? (
                    <section>
                      {moviesData.map((data) => (
                        <div key={data.id}>
                          <SingleReview {...data} />
                        </div>
                      ))}
                    </section>
                  ) : (
                    <div className="text-center">No Movie Reviews yet!</div>
                  )}
                </>
              )}
              {error && (
                <div className="text-center">
                  An Error Occured
                  <hr />
                  Reload your browser.
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {tvshowLoading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <>
                  {tvShowsData.length > 0 ? (
                    <section>
                      {tvShowsData.map((data) => (
                        <div key={data.id}>
                          <SingleReview {...data} />
                        </div>
                      ))}
                    </section>
                  ) : (
                    <div className="text-center">No TV Shows Reviews yet!</div>
                  )}
                </>
              )}
              {tvshowError && (
                <div className="text-center">
                  An Error Occured
                  <hr />
                  Reload your browser.
                </div>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    </div>
  );
};

export default ReviewListAdmin;
