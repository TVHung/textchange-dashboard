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
import {
  apiPost,
  apiPostManager,
  apiSetBlockPost,
  headers,
} from "../constants";
// import { Modal } from "react-bootstrap";

export default () => {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const setBlockPost = async (post_id) => {
    await axios
      .post(`${apiSetBlockPost}/${post_id}`, { headers: headers })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setDeletePost = async (post_id) => {
    // await axios
    //   .post(`${apiSetAdminUser}/${user_id}`, { headers: headers })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const actionPost = async (post_id, action) => {
    switch (action) {
      case "delete":
        setDeletePost(post_id);
        break;
      case "addBlock":
        setBlockPost(post_id);
        break;
      case "deleteBlock":
        setBlockPost(post_id);
        break;
      case "detailPost":
        window.location.href = `/volt-react-dashboard?#/post-manager/detail/${post_id}`;
        break;
      default:
        break;
    }
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
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
