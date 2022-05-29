import React, { useState, useEffect } from "react";

import { Col, Row } from "@themesberg/react-bootstrap";
import { ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";
import axios from "axios";
import { apiChangeAvatar, apiGetAccountProfile, headers } from "../constants";
import { getCookie } from "../utils/cookie";
import Preloader from "../components/Preloader";
import ScrollUp from "../components/ScrollUp";

export default () => {
  const [userProfile, setUserProfile] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAdminProfile();
    setLoaded(true);
    return () => {
      setLoaded(false);
      setUserProfile({});
    };
  }, []);

  const getAdminProfile = async (e) => {
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
          setLoaded(false);
        });
    } catch (error) {
      return { statusCode: 500, body: error.toString() };
    }
  };

  return (
    <>
      <Preloader show={loaded} />
      <ScrollUp />
      <Row>
        <Col xs={12}>
          <ProfileCardWidget userProfile={userProfile} setLoaded={setLoaded} />
        </Col>
        <Col xs={12}>
          <GeneralInfoForm userProfile={userProfile} />
        </Col>
      </Row>
    </>
  );
};
