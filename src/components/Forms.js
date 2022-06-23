import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { apiUserProfile, headers, sexData } from "../constants";
import { toast } from "react-toastify";

export const GeneralInfoForm = ({ userProfile }) => {
  const [profile, setProfile] = useState({
    name: "",
    sex: null,
    avatar_url: "",
    phone: "",
    address: "",
    facebook_url: "",
  });
  const [validateProfile, setValidateProfile] = useState({
    name: "",
    sex: "",
    avatar_url: "",
    phone: "",
    address: "",
    facebook_url: "",
  });

  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.name,
        sex: userProfile.sex,
        avatar_url: userProfile.avatar_url,
        phone: userProfile.phone,
        address: userProfile.address,
        facebook_url: userProfile.facebook_url,
      });
    }
    return () => {};
  }, [userProfile]);

  const handleOnChangeProfile = (e) => {
    const { name, value } = e.target;
    if (name == "sex") {
      let val = Number(value);
      setProfile((prevState) => ({
        ...prevState,
        [name]: val,
      }));
    } else {
      setProfile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmitProfile = (e) => {
    console.log("data cap nhat", profile);
    updateUserProfile(profile);
  };

  const updateUserProfile = async (data) => {
    console.log("update profile");
    try {
      await axios
        .put(apiUserProfile, data, {
          headers: headers,
        })
        .then((res) => {
          console.log("data cap nhat", res.data);
          if (res.data.status == 1) {
            toast.success(res.data.message);
          } else {
            handleValidate(res.data);
          }
        });
    } catch (error) {
      toast.error("Cập nhật thất bại");
      return { statusCode: 500, body: error.toString() };
    }
  };

  const handleValidate = (validateData) => {
    Object.keys(validateData).forEach(function (key) {
      console.log(key, validateData[key]);
      setValidateProfile((prevState) => ({
        ...prevState,
        [key]: validateData[key][0],
      }));
    });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Thông tin người quản trị</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={userProfile && userProfile.name}
                  placeholder="Nhập tên của bạn"
                  onChange={(e) => handleOnChangeProfile(e)}
                  name="name"
                  className={
                    validateProfile.name
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                <span style={{ color: "red" }}>{validateProfile.name}</span>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  defaultValue={"hungday@gmail.com"}
                  placeholder="Email"
                  name="email"
                  className={"form-control"}
                  readOnly
                />
                <span style={{ color: "red" }}>{validateProfile.name}</span>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={profile.sex || 0}
                  name="sex"
                  onChange={(e) => handleOnChangeProfile(e)}
                >
                  {sexData.map((data, index) => (
                    <option value={data.id} key={index}>
                      {data.value}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={userProfile && userProfile.address}
                  placeholder="Enter your home address"
                  name="address"
                  className={
                    validateProfile.address
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={(e) => handleOnChangeProfile(e)}
                />
                <span style={{ color: "red" }}>{validateProfile.address}</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={userProfile && userProfile.phone}
                  placeholder="0123456789"
                  name="phone"
                  className={
                    validateProfile.phone
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={(e) => handleOnChangeProfile(e)}
                />
                <span style={{ color: "red" }}>{validateProfile.phone}</span>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Link facebook</Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={userProfile && userProfile.facebook_url}
                  name="facebook_url"
                  className={
                    validateProfile.facebook_url
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="https://facebook.com/yourid"
                  onChange={(e) => handleOnChangeProfile(e)}
                />
                <span style={{ color: "red" }}>
                  {validateProfile.facebook_url}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" onClick={(e) => handleSubmitProfile(e)}>
              Lưu
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
