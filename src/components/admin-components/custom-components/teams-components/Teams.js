"use client";

import { db } from "@/app/firebase/config";
import useUsersByRole from "@/hooks/useUserTeam";
import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import { Badge, Dropdown, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const Teams = () => {
  const { users, loading, error } = useUsersByRole();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  const handleDeleteRole = async (id) => {
    const userDocRef = doc(db, "users", id);
    await updateDoc(userDocRef, {
      statusRole: "member",
    });
    toast.success("user has been revoked his status as a staff/admin");
  };

  return (
    <div>
      <ToastContainer />
      <div
        style={{
          margin: "50px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="py-1">
          <div style={{ fontSize: 30, fontWeight: "bold" }}>Teams</div>
          <div style={{ color: "#575655" }}>An overview of the teams</div>
        </div>
        <div className="py-1">
          <Link
            style={{
              background: "#E86C44",
              color: "#fff",
              borderColor: "transparent",
              marginRight: 10,
            }}
            className="btn"
            href="/admin/team/new"
          >
            Add New Staff
          </Link>
        </div>
      </div>
      <section>
        <Table responsive hover style={{ border: "1px solid #ccc" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Seen</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>#{(index + 1).toString().padStart(3, "0")}</td>
                <td>{user.displayName}</td>
                <td>{user.statusRole}</td>
                <td>
                  <Badge pill bg="success">
                    Coming Soon
                  </Badge>
                </td>
                <td>
                  {user.lastLogin
                    ? user.lastLogin.toDate().toLocaleString()
                    : "Needs to logout first!"}
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{
                        backgroundColor: "transparent",
                        color: "#000",
                        borderColor: "transparent",
                      }}
                    >
                      More
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} href={`/admin/team/${user.id}`}>
                        View Activies
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => handleDeleteRole(user.id)}>
                        Delete Staff
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  );
};

export default Teams;
