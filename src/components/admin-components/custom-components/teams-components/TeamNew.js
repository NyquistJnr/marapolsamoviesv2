"use client";

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./TeamNew.module.css"; // Assuming you have a CSS module file
import useSearchByDisplayName from "@/hooks/useFindUser";
import { toast, ToastContainer } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const TeamNew = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const { documents, loading, error } = useSearchByDisplayName(
    "users",
    inputValue
  );

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, such as selecting a user or adding them to a team
    if (documents.length === 0) {
      toast.warning("No user found with that username");
    } else {
      // Assuming you're selecting the first matching document for simplicity
      // const selectedUser = documents[0];
      // console.log("Selected User:", selectedUser);
      // alert(`Selected User: ${selectedUser.displayName}`);
      // You can further process the selected user, e.g., add them to a team
      toast.success("User(s) found!");
    }
  };

  const handleRoleChange = async (id, role, username) => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      statusRole: role,
    });
    toast.success(`Yayyy, ${username} has been made a ${role}!`);
  };

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
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
      <ToastContainer />
      <div>
        <Form onSubmit={handleSubmit} className={classes.form}>
          <Form.Group controlId="formInput">
            <Form.Control
              type="search"
              placeholder="Search username"
              value={inputValue}
              onChange={handleChange}
              className={classes.searchUserControl}
            />
          </Form.Group>
          <div style={{ textAlign: "right" }}>
            <Button
              className="my-3"
              style={{ background: "#E86C44", borderColor: "#E86C44" }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Searching..." : "Submit"}
            </Button>
          </div>
        </Form>
      </div>

      <div style={{ marginTop: 50 }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && documents.length === 0 && inputValue && (
          <p>No users found with the name "{inputValue}"</p>
        )}
        {!loading && documents.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {documents.map((data) => (
              <div
                key={data.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div
                  className="my-2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div style={{ marginRight: 10 }}>
                    <img
                      src={data.profilePicture || "/user.svg"}
                      alt={`${data.displayName} profile picture`}
                      width={80}
                      height={80}
                      style={{ borderRadius: 10 }}
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <div>
                      <b>{data.displayName}</b>
                    </div>
                    <div style={{ fontSize: 12, color: "#726F6C" }}>
                      {data.email}
                    </div>
                  </div>
                </div>
                <div
                  className="btn btn-success my-2 mx-2"
                  onClick={() =>
                    handleRoleChange(data.id, "staff", data.displayName)
                  }
                >
                  Make a Staff
                </div>
                <div
                  className="btn btn-danger my-2 mx-2"
                  onClick={() =>
                    handleRoleChange(data.id, "admin", data.displayName)
                  }
                >
                  Make an Admin
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamNew;
