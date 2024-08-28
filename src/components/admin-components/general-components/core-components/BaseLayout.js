import AdminHeader from "../basic-components/Header";
import Sidebar from "./Sidebar";
import { Container } from "react-bootstrap";

const BaseLayout = ({ children }) => {
  return (
    <div className="layout" style={{ minHeight: "100%" }}>
      <Sidebar />
      <main className="layout__main-content other-body">
        <AdminHeader />
        <div className="scrollable-content">
          <Container fluid>{children}</Container>
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;
