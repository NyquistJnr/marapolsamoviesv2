"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

// import { useColorMode } from "@chakra-ui/react";

import classes from "./Header.module.css";

import logo from "../../../public/images/logos/logo-light.png";

// Profile Picture Icon here (dummy)
import dpIcon from "../../../public/images/icons/dp.svg";

import SignUp from "@/components/custom-components/sign-up/SignUp";
import Login from "@/components/custom-components/sign-in/Login";

import { FaRegUserCircle } from "react-icons/fa";

// Toggle Icon
import { CiMenuFries } from "react-icons/ci";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

// Modal to Pop Sign In or Sign Up

// From AuthContext API
import { useAuth } from "@/context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

// NavBar Component
const expand = "lg";
const Header = () => {
  const router = useRouter();
  const { isAuthenticated, logout, username, profilePicture } = useAuth();
  const currentPath = usePathname();
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar
        key={expand}
        expand={expand}
        className="mb-3"
        style={{ background: "#fff" }}
        sticky="top"
      >
        <Container>
          <Navbar.Brand as={Link} href="/">
            <Image
              src={logo}
              alt="Marapolsa Logo"
              width={140}
              height="auto"
              priority
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            className={classes.toggle}
          >
            <CiMenuFries
              size={25}
              style={{ fontWeight: "bold", color: "#e86c44" }}
            />
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            style={{ width: "65%" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <Image
                  src={logo}
                  alt="Marapolsa Logo"
                  width={140}
                  height="auto"
                  priority
                />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link
                  as={Link}
                  href="/reviews"
                  className={
                    /^\/reviews(\/list\/[^/]+|\/[^/]+)?$/.test(currentPath)
                      ? `${classes.activeLink} ${classes.links}`
                      : `${classes.notActiveLink} ${classes.links}`
                  }
                >
                  Reviews
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="/news"
                  className={
                    /^\/news(\/result\/[^/]+|\/[^/]+)?$/.test(currentPath)
                      ? `${classes.activeLink} ${classes.links}`
                      : `${classes.notActiveLink} ${classes.links}`
                  }
                >
                  News
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="/movies"
                  className={
                    /^\/movies(\/list\/[^/]+|\/[^/]+)?$/.test(currentPath)
                      ? `${classes.activeLink} ${classes.links}`
                      : `${classes.notActiveLink} ${classes.links}`
                  }
                >
                  Movies
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="/awards"
                  className={
                    currentPath === "/awards"
                      ? `${classes.activeLink} ${classes.links}`
                      : `${classes.notActiveLink} ${classes.links}`
                  }
                >
                  Awards
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  href="/about-us"
                  className={
                    currentPath === "/about-us"
                      ? `${classes.activeLink} ${classes.links}`
                      : `${classes.notActiveLink} ${classes.links}`
                  }
                >
                  About Us
                </Nav.Link>
              </Nav>
              <Nav style={{ marginTop: 10 }}>
                {!isAuthenticated ? (
                  <>
                    <Button
                      className={classes["sign-in"]}
                      onClick={() => router.push("/login")}
                    >
                      Sign In
                    </Button>
                    <Button
                      className={classes["sign-up"]}
                      onClick={() => router.push("/sign-up")}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <Menu>
                    <MenuButton>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 5,
                        }}
                      >
                        {user?.photoURL ? (
                          <Image
                            src={user?.photoURL}
                            alt="Profile Picture"
                            width={30}
                            height={30}
                            style={{
                              objectFit: "cover",
                              width: 40,
                              height: 40,
                              objectPosition: "50% 5%",
                              borderRadius: "100%",
                            }}
                          />
                        ) : (
                          <FaRegUserCircle size={30} />
                        )}
                        <span style={{ marginLeft: 10 }}>
                          {user?.displayName}
                        </span>
                      </div>
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title="Profile">
                        <MenuItem onClick={() => router.push("/profile")}>
                          My Account
                        </MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup title="">
                        <MenuItem onClick={() => logout()}>Sign Out</MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
