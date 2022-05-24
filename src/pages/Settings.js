import React from "react";

import { Col, Row } from "@themesberg/react-bootstrap";
import { ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";

export default () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <ProfileCardWidget />
        </Col>
        <Col xs={12}>
          <GeneralInfoForm />
        </Col>
      </Row>
    </>
  );
};
