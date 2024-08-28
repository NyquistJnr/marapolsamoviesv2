"use client";

import { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import styles from "./NewsSearchFilter.module.css";

const NewsSearchFilterBar = (props) => {
  const searchRef = useRef();

  const handleSearchedSection = (item) => {
    props.searchedSection(item);
    console.log(item);
  };

  return (
    <main className={styles.searchFilterContainer}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={12} className="d-flex">
            <div
              style={{
                border: "1.3px solid #ccc",
                width: "100%",
                padding: "10px 10px 10px 2px",
                borderRadius: 10,
              }}
            >
              <Form
                className="flex-grow-1 d-flex align-items-center position-relative"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <FiSearch
                  className={styles.searchIcon}
                  size={25}
                  color="#888"
                />
                <Form.Control
                  type="search"
                  placeholder="Search all news"
                  className={styles.searchInput}
                  ref={searchRef}
                />
                <Button
                  className={styles.searchButton}
                  onClick={() => {
                    if (searchRef.current.value.length === 0) {
                    } else {
                      handleSearchedSection(searchRef.current.value);
                    }
                  }}
                >
                  Search
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default NewsSearchFilterBar;
