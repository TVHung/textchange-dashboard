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
import { Modal } from "@themesberg/react-bootstrap";
import { getCookie } from "../utils/cookie";
import Preloader from "../components/Preloader";

export default () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [showDefault, setShowDefault] = useState(false);
  const [mess, setMess] = useState({
    header: "",
    body: "",
  });
  const [data, setData] = useState({
    post_id: "",
    action: "",
  });

  const handleClose = () => setShowDefault(false);
  const handleShow = () => setShowDefault(true);

  useEffect(() => {
    fetchPosts();
    setLoaded(true);
    return () => {
      setPosts([]);
      setShowDefault(false);
      setData({});
      setMess({});
      setLoaded(false);
    };
  }, []);

  const fetchPosts = async () => {
    await axios
      .get(apiPostManager, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data.data);
        setLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setBlockPost = async (post_id) => {
    await axios
      .post(`${apiSetBlockPost}/${post_id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        fetchPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setDeletePost = async (post_id) => {
    await axios
      .delete(`${apiPost}/${post_id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        fetchPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const actionPost = (post_id, action) => {
    setData({
      post_id: post_id,
      action: action,
    });
    switch (action) {
      case "delete":
        setMess({
          header: "Bạn có chắc chắn muốn xóa vĩnh viễn bài viết này không?",
          body: "Bài viết sẽ không thể khôi phục.",
        });
        handleShow();
        break;
      case "addBlock":
        setMess({
          header: "Bạn có chắc chắn muốn khóa bài viết này không?",
          body: "Bài viết sẽ bị khóa.",
        });
        handleShow();
        break;
      case "deleteBlock":
        setMess({
          header: "Bạn có chắc chắn muốn mở khóa bài viết này không?",
          body: "Bài viết sẽ được mở khóa.",
        });
        handleShow();
        break;
      case "detailPost":
        window.location.href = `/volt-react-dashboard?#/post-manager/detail/${post_id}`;
        break;
      default:
        break;
    }
  };

  const onConfirm = () => {
    if (data.action && data.post_id)
      switch (data.action) {
        case "delete":
          setDeletePost(data.post_id);
          break;
        case "addBlock":
          setBlockPost(data.post_id);
          break;
        case "deleteBlock":
          setBlockPost(data.post_id);
          break;
        default:
          break;
      }
    handleClose();
  };
  return (
    <>
      <Preloader show={loaded} />
      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">{mess.header}</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <p>{mess.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onConfirm}>
            Xác nhận
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleClose}
          >
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
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
