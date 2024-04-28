import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import NotificationsModal from "./modals/NotificationsModal";
import { useState } from "react";
import UserUpdateModal from "./modals/UserUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { userRemoveData } from "../features/userSlice";

function NavBar() {
  const data = useSelector((state: RootState) => state.users.userDetail);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  // user
  const [userShowModal, setUserShowModal] = useState(false);

  const handleUserCloseModal = () => setUserShowModal(false);
  const handleUserShowModal = () => setUserShowModal(true);

  const logoutFunc = () => {
    dispatch(userRemoveData());
    navigate("/");
  };
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary bg-white"
      style={{
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        paddingTop: "18px",
        paddingBottom: "18px",
      }}
    >
      <Container>
        <Navbar.Brand>
          <Link to="/home"> React-Logo</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              id="basic-nav-dropdown"
              title={
                <span>
                  <img src="/assets/images/avatar.png" alt="" />
                </span>
              }
            >
              <NavDropdown.Item onClick={handleUserShowModal}>
                {data?.fullName} <span style={{ fontSize: "12px" }}></span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleShowModal}>
                All Notifications
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <button
                className="btn smallBtn"
                style={{
                  marginLeft: "15px",
                  paddingTop: "0",
                  paddingBottom: "0",
                }}
                onClick={logoutFunc}
              >
                End Session
              </button>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <NotificationsModal show={showModal} handleClose={handleCloseModal} />
      <UserUpdateModal
        show={userShowModal}
        handleClose={handleUserCloseModal}
      />
    </Navbar>
  );
}

export default NavBar;
