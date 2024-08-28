"use client";

import React from "react";

import { Dropdown, Form } from "react-bootstrap";

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

const feedList = [
  { title: "Visits", counts: 30, attend: "80%" },
  { title: "Likes", counts: 30, attend: "80%" },
  { title: "Comments", counts: 30, attend: "80%" },
  { title: "Saves", counts: 30, attend: "80%" },
  { title: "Shares", counts: 30, attend: "80%" },
  { title: "Users", counts: 30, attend: "80%" },
];

const DashboardComponent = () => {
  return (
    <div>
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
          <div style={{ color: "#575655" }}>Welcome back, Victoria!</div>
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
              <Dropdown.Item>Review</Dropdown.Item>
              <Dropdown.Item href="#/action-2">News</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Movie</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Award</Dropdown.Item>
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
          <FaCalendarAlt style={{ marginRight: 10 }} />7 Jul - 13 Jul, 2024
        </div>
        <div style={{ marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
          <Form.Select
            aria-label="Select Time Frame"
            className={classes.timeFrameControl}
          >
            <option>Choose...</option>
            <option value="week">This week</option>
            <option value="month">This Month</option>
            <option value="Last month">Last month</option>
            <option value="Last month">This quarter</option>
            <option value="Last month">Last quarter</option>
            <option value="Last month">This year</option>
            <option value="Last month">Last year</option>
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
                />
              </div>
            ))}
          </div>
          <GraphComponent />
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
              style={{ fontWeight: "bold", fontSize: 13, marginTop: 10 }}
            >
              You don&apos;t have any notifications yet.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
