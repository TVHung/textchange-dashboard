import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Breadcrumb,
  InputGroup,
} from "@themesberg/react-bootstrap";
import axios from "axios";

import { PostTable } from "../components/Tables";
import { apiPost, apiPostManager, headers } from "../constants";

export default () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);

  const fetchPosts = async () => {
    await axios
      .get(apiPostManager, { headers: headers })
      .then((res) => {
        console.log(res);
        setPosts(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const actionPost = async (user_id, action) => {
    switch (action) {
      case "delete":
        console.log("delete");
        break;
      case "addBlock":
        console.log("addBlock");
        break;
      case "deleteBlock":
        console.log("deleteBlock");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Quản lý bài đăng</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Quản lý bài đăng</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">
              Share
            </Button>
            <Button variant="outline-primary" size="sm">
              Export
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <PostTable posts={posts} actionPost={actionPost} />
    </>
  );
};
