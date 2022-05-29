import React, { useState, useEffect } from "react";

import { Col, Row } from "@themesberg/react-bootstrap";
import { ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";
import axios from "axios";
import { apiChangeAvatar, apiGetAccountProfile, headers } from "../constants";
import { getCookie } from "../utils/cookie";
import Preloader from "../components/Preloader";

export default () => {
  const [userProfile, setUserProfile] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [fileAvatar, setFileAvatar] = useState();

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

  // useEffect(() => {
  //   changeAvatar(fileAvatar);
  //   return () => {};
  // }, [fileAvatar]);

  // const changeAvatar = async (fileImage) => {
  //   const formData = new FormData();
  //   formData.append("file", fileImage);
  //   console.log(formData);
  //   await axios
  //     .post(apiChangeAvatar, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${getCookie("access_token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("post image", res.data.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <>
      <Preloader show={loaded} />
      <Row>
        <Col xs={12}>
          <ProfileCardWidget
            userProfile={userProfile}
            setFileAvatar={setFileAvatar}
          />
        </Col>
        <Col xs={12}>
          <GeneralInfoForm userProfile={userProfile} />
        </Col>
      </Row>
    </>
  );
};
