import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup, Breadcrumb } from "@themesberg/react-bootstrap";

import axios from "axios";
import Detail from "../components/Detail";
import ScrollUp from "../components/ScrollUp";
import Preloader from "../components/Preloader";

export default () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    return () => {
      setLoaded();
    };
  }, []);

  return (
    <>
      <Preloader show={loaded} />
      <ScrollUp />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Chi tiết bài viết</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Chi tiết bài viết</h4>
        </div>
      </div>
      <Detail setLoaded={setLoaded} />
    </>
  );
};
