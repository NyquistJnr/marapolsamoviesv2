"use client";

import { useAuth } from "@/context/AuthContext";
import withAuthorization from "@/hoc/withAuthorization";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const Logout = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleCancel = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "55vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Are you sure you want to log out?</h1>
        <div style={{ marginTop: "20px" }}>
          <Button
            variant="danger"
            style={{ marginRight: "10px" }}
            onClick={handleLogout}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(Logout);
