"use client";

import Image from "next/image";

import { FaRegHeart } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";

import classes from "./SingleAward.module.css";

import copy from "clipboard-copy";

import React, { useState } from "react";
import { Badge, Button, Dropdown } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { shortenText } from "@/utils/text-shortener";

const SingleAward = (props) => {
  const [show, setShow] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleCopyClick = async (text) => {
    try {
      await copy(text);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(props.timestamp.toDate());
  let formattedDate = "";
  if (props.timestamp) {
    const date = props.timestamp.toDate();
    formattedDate = date.toLocaleString();
  }

  const handleDelete = async (documentId) => {
    try {
      let collectionName = "reviews";
      if (props.type) {
        collectionName = props.type;
      }
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      setDeleted(true);
      console.log("Document deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this staff? You can&apos;t undo this
            action
          </Modal.Body>
          <Modal.Footer>
            <Button
              className={classes.deleteBtn}
              onClick={() => {
                handleDelete(props.id);
                handleClose();
              }}
            >
              Delete
            </Button>
            <Button className={classes.cancelBtn} onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <div
          className="py-2"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            className="py-2"
          >
            <div className="py-1" style={{ fontWeight: "bold", fontSize: 20 }}>
              {shortenText(props.title, 7)}
              {deleted && (
                <Badge pill bg="danger" style={{ marginLeft: 10 }}>
                  Deleted
                </Badge>
              )}
            </div>
            <div className="py-1">
              by <b>{props.author}</b> {formattedDate}
            </div>
            <div style={{ display: "flex" }} className="py-1">
              <div
                style={{
                  marginRight: 10,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaRegHeart style={{ marginRight: 10 }} />{" "}
                {props.likes ? props.likes.length : 0}
              </div>
              <div
                style={{
                  marginRight: 10,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <MdOutlineComment style={{ marginRight: 10 }} />{" "}
                {props.comments ? props.comments.length : 0}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaRegBookmark style={{ marginRight: 10 }} />{" "}
                {props.saves ? props.saves.length : 0}
              </div>
            </div>
          </div>
        </div>
        <div
          className="py-2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div
            className="py-1"
            style={{ marginRight: 20, textAlign: "center" }}
          >
            <div style={{ fontWeight: "bold" }}>175</div>
            <div style={{ fontSize: 10, color: "#5F5D5A" }}>Views</div>
          </div>
          <div
            className="py-1"
            style={{ marginRight: 20, textAlign: "center" }}
          >
            <div style={{ fontWeight: "bold" }}>34</div>
            <div style={{ fontSize: 10, color: "#5F5D5A" }}>Shares</div>
          </div>
          <div
            className="py-1"
            style={{ marginRight: 20, textAlign: "center" }}
          >
            <div style={{ fontWeight: "bold" }}>4</div>
            <div style={{ fontSize: 10, color: "#5F5D5A" }}>New Users</div>
          </div>
          <div className="py-1">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  background: "transparent",
                  color: "#000",
                  borderColor: "#5F5D5A",
                }}
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  href={
                    props.type
                      ? `/admin/${props.type}/${props.id}`
                      : `/admin/reviews/${props.id}`
                  }
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    if (props.type) {
                      handleCopyClick(`/admin/${props.type}/${props.id}`);
                    } else {
                      handleCopyClick(`/admin/reviews/${props.id}`);
                    }
                  }}
                >
                  Copy link
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">Share</Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  Turn off comments
                </Dropdown.Item>
                <hr />
                <Dropdown.Item onClick={handleShow}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleAward;
