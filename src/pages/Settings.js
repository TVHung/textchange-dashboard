import React, { useState, useEffect } from "react";

import { Col, Row } from "@themesberg/react-bootstrap";
import { ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";
import axios from "axios";
import { apiGetAccountProfile, apiUserProfile, headers } from "../constants";

export default () => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getAdminProfile();
    return () => {};
  }, []);

  const getAdminProfile = async (e) => {
    try {
      await axios
        .get(apiGetAccountProfile, {
          headers: headers,
        })
        .then((res) => {
          const userProfile = res.data.data;
          setUserProfile(userProfile);
        });
    } catch (error) {
      return { statusCode: 500, body: error.toString() };
    }
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <ProfileCardWidget userProfile={userProfile} />
        </Col>
        <Col xs={12}>
          <GeneralInfoForm userProfile={userProfile} />
        </Col>
      </Row>
    </>
  );
};
