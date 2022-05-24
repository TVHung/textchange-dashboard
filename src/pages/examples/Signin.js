import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import { apiLogin } from "../../constants";
import axios from "axios";
import { setCookie } from "../../utils/cookie";

export default () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [userValidation, setUserValidation] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(user);
  };

  //check login
  const handleSubmitLogin = async (e) => {
    if (e) e.preventDefault();
    let userLogin = {
      email: user.email,
      password: user.password,
    };
    console.log(userLogin);
    setUserValidation({
      user: "",
      password: "",
      error: "",
    });
    await axios
      .post(apiLogin, userLogin)
      .then((res) => {
        const data = res.data;
        console.log(data);
        handleValidate(data);
        if (data.access_token && data.user.is_admin === 1) {
          setCookie("access_token", data.access_token, 3600);
          setCookie("is_admin", data.user.is_admin, 3600);
          window.location.href = "/volt-react-dashboard?#/dashboard/overview";
        }
      })
      .catch((e) => {
        console.error(e);
        let error = "error";
        setUserValidation((prevState) => ({
          ...prevState,
          [error]: "Email hoặc mật khẩu không đúng.",
        }));
      });
  };

  const handleValidate = (validateData) => {
    Object.keys(validateData).forEach(function (key) {
      console.log(key, validateData[key]);
      setUserValidation((prevState) => ({
        ...prevState,
        [key]: validateData[key][0],
      }));
    });
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.DashboardOverview.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
              homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image">
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Đăng nhập vào trang quản lý</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text
                        style={{
                          borderColor: userValidation.email ? "red" : "",
                        }}
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        onChange={(e) => handleOnChange(e)}
                        className={userValidation.email ? "is-invalid" : ""}
                      />
                    </InputGroup>
                    <p style={{ color: "red" }}>{userValidation.email}</p>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text
                          style={{
                            borderColor: userValidation.password ? "red" : "",
                          }}
                        >
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={(e) => handleOnChange(e)}
                          className={
                            userValidation.password ? "is-invalid" : ""
                          }
                        />
                      </InputGroup>
                      <p style={{ color: "red" }}>{userValidation.password}</p>
                      <p style={{ color: "red" }}>{userValidation.error}</p>
                    </Form.Group>
                    {/* <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          Remember me
                        </FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">
                        Lost password?
                      </Card.Link>
                    </div> */}
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    onClick={(e) => handleSubmitLogin(e)}
                  >
                    Đăng nhập{" "}
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">Hoặc đăng nhập với</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-facebook me-2 w-100"
                  >
                    <FontAwesomeIcon icon={faGoogle} /> Tiếp tục với Google
                  </Button>
                </div>
                {/* <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link
                      as={Link}
                      to={Routes.Signup.path}
                      className="fw-bold"
                    >
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
