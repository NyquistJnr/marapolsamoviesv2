"use client";

import React from "react";

import { Badge, Form } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { GoBell } from "react-icons/go";

import classes from "./Header.module.css";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import useUserData from "@/hooks/dashboard/useUserStatusActivities";
import { capitalize } from "@/utils/number-commas";

const AdminHeader = () => {
  const [user] = useAuthState(auth);

  const { data, loading, error } = useUserData(user?.uid);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Form
          onSubmit={handleSubmit}
          className="d-flex"
          style={{ width: "70%", margin: "10px 0" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #A19F9D",
              paddingLeft: 20,
              paddingTop: 5,
              paddingBottom: 5,
              width: "70%",
              borderRadius: 10,
            }}
          >
            <FiSearch />
            <Form.Control
              type="search"
              placeholder="Search"
              className={classes.searchControl}
              aria-label="Search"
            />
          </div>
        </Form>
        <div
          style={{
            margin: "10px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: 50 }}>
            <GoBell size={25} />
            <sup>
              <Badge pill bg="warning" text="dark">
                Coming Soon
              </Badge>
            </sup>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 20 }}
          >
            <div style={{ marginRight: 20 }}>
              <Image
                width={45}
                height={45}
                alt="DPics"
                src={user?.photoURL ? user.photoURL : "/user.svg"}
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  borderRadius: 50,
                  width: 45,
                  height: 45,
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: "bold" }}>
                {user ? user.displayName : "Anon"}
              </div>
              <div style={{ fontSize: 10 }}>
                {loading ? "Loading..." : capitalize(data.statusRole)}
                {error && <div>An Error occurred, {error.message}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
