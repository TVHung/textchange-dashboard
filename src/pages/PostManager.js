import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  Breadcrumb,
  FormLabel,
} from "@themesberg/react-bootstrap";
import axios from "axios";

import { PostTable } from "../components/Tables";
import {
  apiPost,
  apiPostManager,
  apiSetBlockPost,
  blockStatus,
  categoryData,
  soldStatus,
} from "../constants";
import { Modal } from "@themesberg/react-bootstrap";
import { getCookie } from "../utils/cookie";
import Preloader from "../components/Preloader";
import { toast } from "react-toastify";
import { scrollToTop } from "../utils/common";
import ScrollUp from "../components/ScrollUp";

var filter = [];

export default () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [paginateData, setPaginateData] = useState({});

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
    return () => {
      filter = [];
      setPosts([]);
      setShowDefault(false);
      setData({});
      setMess({});
      setLoaded(false);
    };
  }, []);

  const fetchPosts = async (pageNumber = 1) => {
    setLoaded(true);
    //get option from array object
    let option = "";
    for (let index = 0; index < filter.length; index++) {
      option += `${filter[index].name}=${filter[index].value}`;
      if (index < filter.length - 1) option += "&";
    }
    console.log(option);
    let apiCall = `${apiPostManager}?page=${pageNumber}&${option}`;
    await axios
      .get(apiCall, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      })
      .then((res) => {
        console.log("all post", res.data);
        setPosts(res.data.data);
        setPaginateData(res.data.meta);
        setLoaded(false);
        scrollToTop();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setBlockPost = async (post_id) => {
    await axios
      .post(
        `${apiSetBlockPost}/${post_id}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          toast.success(res.data.message);
          fetchPosts();
        } else toast.error(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Khóa bài viết không thành công");
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
        if (res.data.status == 1) {
          fetchPosts();
          toast.success(res.data.message);
        } else toast.error(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Xóa bài viết không thành công");
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
        window.location.href = `/texchange-dashboard?#/post-manager/detail/${post_id}`;
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

  const onChangeFilter = (e) => {
    const { name, value } = e.target;
    //check exist object
    const isFound = filter.some((element) => {
      return element.name === name ? true : false;
    });
    //filter if name exist
    if (isFound) {
      filter = filter.filter((item) => item.name !== name);
    }
    switch (name) {
      case "category_id":
        if (parseInt(value) > 0) {
          filter.push({
            name: name,
            value: value,
          });
        }
        break;
      case "is_block":
        if (parseInt(value) >= 0) {
          filter.push({
            name: name,
            value: value,
          });
        }
        break;
      case "sold":
        if (parseInt(value) >= 0) {
          filter.push({
            name: name,
            value: value,
          });
        }
        break;
      default:
        break;
    }
    console.log(filter, isFound);
  };

  const onSubmitFilter = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  return (
    <>
      <Preloader show={loaded} />
      <ScrollUp />
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
            <Breadcrumb.Item active>Quản lý sản phẩm</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Quản lý sản phẩm</h4>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-left align-items-end">
          <Col xs={12} md={4} lg={3} className="category-filter mb-1">
            <FormLabel>Loại sản phẩm</FormLabel>
            <Form.Select name="category_id" onChange={(e) => onChangeFilter(e)}>
              <option value={0}>Tất cả</option>
              {categoryData?.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.value}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={3} lg={2} className="category-filter mb-1">
            <FormLabel>Trạng thái khóa</FormLabel>
            <Form.Select name="is_block" onChange={(e) => onChangeFilter(e)}>
              <option value={-1}>Tất cả</option>
              {blockStatus?.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.value}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={3} lg={2} className="category-filter mb-1">
            <FormLabel>Trạng thái giao dịch</FormLabel>
            <Form.Select name="sold" onChange={(e) => onChangeFilter(e)}>
              <option value={-1}>Tất cả</option>
              {soldStatus?.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.value}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={3} lg={2} className="category-filter mb-1">
            <Button onClick={onSubmitFilter} style={{ width: "100%" }}>
              Lọc
            </Button>
          </Col>
        </Row>
      </div>

      <PostTable
        posts={posts}
        actionPost={actionPost}
        fetchPosts={fetchPosts}
        paginateData={paginateData}
      />
    </>
  );
};
