import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faEnvelopeOpen,
  faSearch,
  faSignOutAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Row,
  Col,
  Nav,
  Form,
  Image,
  Navbar,
  Dropdown,
  Container,
  ListGroup,
  InputGroup,
} from "@themesberg/react-bootstrap";

import NOTIFICATIONS_DATA from "../data/notifications";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { deleteCookie, getCookie } from "../utils/cookie";
import axios from "axios";
import {
  apiGetAccountProfile,
  apiLogout,
  apiUserProfile,
  headers,
} from "../constants";

export default (props) => {
  const [userProfile, setUserProfile] = useState({});

  const logout = async (e) => {
    e.preventDefault();
    if (getCookie("access_token") != "") {
      try {
        await axios
          .post(
            apiLogout,
            { data: "mydata" },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
              },
            }
          )
          .then((res) => {
            deleteCookie("access_token");
            setTimeout(() => {
              window.location.href = `/volt-react-dashboard?#/auth/sign-in`;
            }, 1000);
          });
      } catch (error) {
        deleteCookie("access_token");
        return { statusCode: 500, body: error.toString() };
      }
    } else {
      window.location.href = `/volt-react-dashboard?#/auth/sign-in`;
    }
  };

  useEffect(() => {
    getAdminProfile();
    return () => {};
  }, []);

  const getAdminProfile = async (e) => {
    if (getCookie("access_token") != "") {
      try {
        await axios
          .get(apiGetAccountProfile, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${getCookie("access_token")}`,
            },
          })
          .then((res) => {
            const userProfile = res.data.data;
            setUserProfile(userProfile);
            console.log(userProfile);
          });
      } catch (error) {
        return { statusCode: 500, body: error.toString() };
      }
    } else {
      window.location.href = `/volt-react-dashboard?#/auth/sign-in`;
    }
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image
                    src={userProfile && userProfile.avatar_url}
                    className="user-avatar md-avatar rounded-circle"
                  />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">
                      {userProfile && userProfile.name}
                    </span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    (window.location.href = "/volt-react-dashboard?#/profile")
                  }
                >
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My
                  Profile
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserShield} className="me-2" />{" "}
                  Support
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="fw-bold" onClick={(e) => logout(e)}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="text-danger me-2"
                  />{" "}
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
