"use client";

import React, { useEffect, useState } from "react";

import { Alert, Dropdown, Form } from "react-bootstrap";

import { FaCalendarAlt } from "react-icons/fa";

import classes from "./Dashboard.module.css";
import FeedBox from "./FeedBox";
import GraphComponent from "./graph/Graph";
import {
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { MdOutlineRateReview } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { FaAward } from "react-icons/fa6";
import useAggregatedData from "@/hooks/dashboard/useTotalLikesSavesCommentUsers";
import getDateRange from "@/utils/week-month-year";
import useUserData from "@/hooks/dashboard/useUserStatusActivities";
import { shortenText } from "@/utils/text-shortener";

const DashboardComponent = () => {
  const [show, setShow] = useState(true);
  const [user] = useAuthState(auth);

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserData(user?.uid);

  const user_activities = [...userData.activities].reverse();

  const { data, loading, error } = useAggregatedData();

  const feedList = [
    { title: "Likes", counts: data.totalLikes, attend: "coming soon" },
    { title: "Comments", counts: data.totalComments, attend: "coming soon" },
    { title: "Saves", counts: data.totalSaves, attend: "coming soon" },
    { title: "Users", counts: data.totalUsers, attend: "coming soon" },
  ];

  const [timePeriod, setTimePeriod] = useState("year"); // Default to 'year'

  const [timeRange, setTimeRange] = useState("");

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const dateRanges = getDateRange(new Date());

  useEffect(() => {
    if (timePeriod === "week") {
      setTimeRange(`${dateRanges.week.start} - ${dateRanges.week.end}`);
    } else if (timePeriod === "month") {
      setTimeRange(`${dateRanges.month.start} - ${dateRanges.month.end}`);
    } else if (timePeriod === "year") {
      setTimeRange(`${dateRanges.year.start} - ${dateRanges.year.end}`);
    }
  }, [timePeriod]);

  return (
    <div>
      <div className="d-block d-md-none">
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Warning, Oh snap!</Alert.Heading>
          <p>
            Please use a big screen for the admin and staff function for a
            better experience!
          </p>
        </Alert>
      </div>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="py-1">
          <div style={{ fontSize: 28, fontWeight: "bold" }}>Dashboard</div>
          <div style={{ color: "#575655" }}>
            Welcome back, {user ? user?.displayName : "Loading..."}!
          </div>
        </div>
        <div className="py-1">
          <Dropdown>
            <Dropdown.Toggle
              style={{ background: "#E86C44", borderColor: "#E86C44" }}
              id="dropdown-basic"
            >
              Add New
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                style={{ display: "flex", alignItems: "center" }}
                as={Link}
                href="/admin/reviews/new"
              >
                <MdOutlineRateReview style={{ marginRight: 5 }} /> Review
              </Dropdown.Item>
              <Dropdown.Item
                style={{ display: "flex", alignItems: "center" }}
                as={Link}
                href="/admin/news/new"
              >
                <IoBookOutline style={{ marginRight: 5 }} /> News
              </Dropdown.Item>
              <Dropdown.Item
                style={{ display: "flex", alignItems: "center" }}
                as={Link}
                href="/admin/movies/new"
              >
                <BiMoviePlay style={{ marginRight: 5 }} /> Movie
              </Dropdown.Item>
              <Dropdown.Item
                style={{ display: "flex", alignItems: "center" }}
                as={Link}
                href="/admin/awards/new"
              >
                <FaAward style={{ marginRight: 5 }} /> Awards
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </section>
      <div
        style={{
          display: "flex",
          marginTop: 10,
          alignItems: "center",
          flexWrap: "wrap",
          color: "#575655",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #D0CFCE",
            padding: "7px 20px",
            borderRadius: 10,
            margin: "10px 0",
          }}
        >
          <FaCalendarAlt style={{ marginRight: 10 }} />
          {timeRange}
        </div>
        <div style={{ marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
          <Form.Select
            aria-label="Select Time Frame"
            className={classes.timeFrameControl}
            value={timePeriod}
            onChange={handleTimePeriodChange}
          >
            <option>Choose...</option>
            <option value="week">This week</option>
            <option value="month">This Month</option>
            <option value="year">Year</option>
          </Form.Select>
        </div>
      </div>
      <div className="row py-2">
        <div className="col-12 col-md-7 col-lg-8 py-2">
          <div className="row">
            {feedList.map((data) => (
              <div className="col-6 col-md-4 col-lg-2 py-2" key={data.title}>
                <FeedBox
                  title={data.title}
                  counts={data.counts}
                  attend={data.attend}
                  loading={loading}
                  error={error}
                />
              </div>
            ))}
          </div>
          <GraphComponent timeFrame={timePeriod} />
          <div className="row py-3">
            <div className="col-12 col-md-7 col-lg-8 py-1">
              <div
                style={{
                  background: "#fff",
                  padding: "30px 20px",
                  borderRadius: 10,
                }}
              >
                <div style={{ color: "#898784" }}>User Location</div>
                <div
                  className="btn"
                  style={{
                    color: "#fff",
                    marginTop: 10,
                  }}
                ></div>
                <Tabs variant="soft-rounded" colorScheme="orange">
                  <TabList>
                    <Tab>Cities</Tab>
                    <Tab>Coutries</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <div style={{ padding: "50px 0" }}>
                        <span style={{ fontWeight: "bold", fontSize: 12 }}>
                          You don&apos;t have any users yet.
                        </span>
                        <br />
                        <span style={{ fontSize: 12 }}>
                          When you do, you can learn about their location will
                          show here.
                        </span>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div style={{ padding: "50px 0" }}>
                        <span style={{ fontWeight: "bold", fontSize: 12 }}>
                          You don&apos;t have any users yet.
                        </span>
                        <br />
                        <span style={{ fontSize: 12 }}>
                          When you do, you can learn about their location will
                          show here.
                        </span>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </div>
            <div className="col-12 col-md-5 col-lg-4 py-1">
              <div
                style={{
                  background: "#fff",
                  padding: "20px 20px",
                  borderRadius: 10,
                }}
              >
                <div style={{ color: "#898784" }}>Traffic Source</div>
                <div>
                  <div className="py-2">
                    <div>Instagram</div>
                    <div>
                      <Progress colorScheme="orange" value={5} />
                    </div>
                  </div>
                  <div className="py-2">
                    <div>Google</div>
                    <div>
                      <Progress colorScheme="orange" value={90} />
                    </div>
                  </div>
                  <div className="py-2">
                    <div>Twitter</div>
                    <div>
                      <Progress colorScheme="orange" value={10} />
                    </div>
                  </div>
                  <div className="py-2">
                    <div>YouTube</div>
                    <div>
                      <Progress colorScheme="orange" value={40} />
                    </div>
                  </div>
                  <div className="py-2">
                    <div>Facebook</div>
                    <div>
                      <Progress colorScheme="orange" value={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-5 col-lg-4 py-2">
          <div
            style={{
              border: "1px solid #B8B7B5",
              padding: "20px 10px",
              borderRadius: 10,
            }}
          >
            <div style={{ fontWeight: "bold" }}>Notifications</div>
            <div
              className="text-center"
              style={{ fontWeight: "bold", fontSize: 13, marginTop: 10 }}
            >
              You don&apos;t have any notifications yet.
            </div>
          </div>
          {/* Second Notification */}
          <div
            style={{
              border: "1px solid #B8B7B5",
              padding: "20px 10px",
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <div style={{ fontWeight: "bold" }}>Activites</div>
            <div
              className="text-center"
              style={{ fontSize: 13, marginTop: 10 }}
            >
              {userError && (
                <div className="py-5 text-center">
                  An Error occurred, {userError.message}
                </div>
              )}
              {userData.activities.length < 1 && (
                <div>You don&apos;t have any notifications yet.</div>
              )}
              {userLoading ? (
                <div>Loading...</div>
              ) : (
                <div style={{ marginTop: 20 }}>
                  {user_activities.map((data) => (
                    <div key={Math.random()}>
                      <hr />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          marginBottom: 5,
                        }}
                      >
                        <div className="py-2">
                          <div style={{ fontWeight: "bold" }}>
                            {data.description}
                          </div>
                          <div style={{ fontSize: 10 }}>
                            {data.when.toDate().toLocaleString()}
                          </div>
                        </div>
                        <div className="py-2">{shortenText(data.title, 3)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
