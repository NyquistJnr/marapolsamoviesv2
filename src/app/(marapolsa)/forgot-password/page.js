"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Container, Form } from "react-bootstrap";

import classes from "./page.module.css";

import emailImage from "../../../../public/images/icons/email.svg";
import { toast, ToastContainer } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const emailRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, emailRef.current.value);

      toast.success("A password reset link has been sent to your email!", {
        position: "top-center",
      });
      setIsSubmitting(false); // Reset submitting state after success
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error) {
      console.error("Forgot password request failed:", error);
      toast.error("Error sending reset link!", {
        position: "top-center",
      });
      setIsSubmitting(false); // Reset submitting state on error
    }
  };

  return (
    <Container fluid>
      <div className="row" style={{ marginTop: -20 }}>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "95vh",
            }}
          >
            <div className={classes.loginWidth}>
              <ToastContainer />
              {/* Login form content */}
              <h3>Forgot Password</h3>
              <p>Please enter your email address to proceed</p>
              <Form onSubmit={handleSubmitForgotPassword}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <div className={`${classes["email-parent"]} mb-3`}>
                    <Image
                      src={emailImage}
                      className={classes["email-icon"]}
                      priority
                      alt="email Icon"
                    />
                    <Form.Control
                      ref={emailRef}
                      type="email"
                      placeholder="Enter your email address"
                      className={classes.inputSpace}
                      style={{ height: 50, paddingLeft: 40 }}
                      required
                    />
                  </div>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    width: "100%",
                    background: "#E86C44",
                    border: "none",
                    marginTop: 30,
                    height: 55,
                  }}
                  disabled={isSubmitting}
                >
                  {!isSubmitting
                    ? "Send Reset Link"
                    : isSubmitting === "Redirecting..."
                    ? "Redirecting..."
                    : "Reset Link Sending..."}
                </Button>
              </Form>
            </div>
          </section>
        </div>
        <div
          className={`col-12 col-sm-12 col-md-6 col-lg-6 ${classes.backGroundImage} d-none d-md-block`}
        ></div>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;
