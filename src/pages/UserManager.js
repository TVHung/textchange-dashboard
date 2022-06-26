import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  FormLabel,
  Breadcrumb,
} from "@themesberg/react-bootstrap";

import { UserTable } from "../components/Tables";
import axios from "axios";
import {
  apiGetUser,
  apiSetBlockUser,
  headers,
  apiSetAdminUser,
  blockStatus,
  roleStatus,
} from "../constants";
import { Modal } from "@themesberg/react-bootstrap";
import { getCookie } from "../utils/cookie";
import Preloader from "../components/Preloader";
import { toast } from "react-toastify";
import { scrollToTop } from "../utils/common";
import ScrollUp from "../components/ScrollUp";

var filter = [];

export default () => {
  const [users, setUsers] = useState([]);
  const [paginateData, setPaginateData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const [showDefault, setShowDefault] = useState(false);
  const [mess, setMess] = useState({
    header: "",
    body: "",
  });
  const [data, setData] = useState({
    user_id: "",
    action: "",
  });

  const handleClose = () => setShowDefault(false);
  const handleShow = () => setShowDefault(true);

  useEffect(() => {
    fetchUsers();
    console.log("user manager");
    return () => {
      setUsers([]);
      setShowDefault(false);
      setData({});
      setMess({});
      setLoaded(false);
      filter = [];
    };
  }, []);

  const fetchUsers = async (pageNumber = 1) => {
    setLoaded(true);
    //get option from array object
    let option = "";
    for (let index = 0; index < filter.length; index++) {
      option += `${filter[index].name}=${filter[index].value}`;
      if (index < filter.length - 1) option += "&";
    }
    let apiCall = `${apiGetUser}?page=${pageNumber}&${option}`;
    await axios
      .get(apiCall, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data.data);
        setPaginateData(res.data.meta);
        setLoaded(false);
        scrollToTop();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setBlockUser = async (user_id) => {
    await axios
      .post(
        `${apiSetBlockUser}/${user_id}`,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          toast.success(res.data.message);
          fetchUsers();
        } else toast.error(res.data.message);
      })
      .catch((error) => {
        toast.error("Chỉnh sửa khóa người dùng không thành công");
        console.error(error);
      });
  };

  const setAdminUser = async (user_id) => {
    await axios
      .post(
        `${apiSetAdminUser}/${user_id}`,
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          toast.success(res.data.message);
          fetchUsers();
        } else toast.error(res.data.message);
      })
      .catch((error) => {
        toast.error("Chỉnh sửa quyền người dùng không thành công");
        console.error(error);
      });
  };

  const setDeleteUser = async (user_id) => {
    await axios
      .delete(`${apiGetUser}/${user_id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          toast.success(res.data.message);
          fetchUsers();
        } else toast.error(res.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const actionUser = async (user_id, action) => {
    setData({
      user_id: user_id,
      action: action,
    });
    switch (action) {
      case "delete":
        setMess({
          header: "Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này không?",
          body: "Thông tin người dùng và tất cả thông tin các bài viết của họ sẽ bị xóa .",
        });
        break;
      case "addAdmin":
        setMess({
          header:
            "Bạn có chắc chắn muốn thêm người dùng làm quản trị viên không?",
          body: "Người dùng sẽ có quyền xem các thông tin khác.",
        });
        break;
      case "deleteAdmin":
        setMess({
          header:
            "Bạn có chắc chắn muốn xóa quyền quản trị của người dùng này không?",
          body: "Người dùng sẽ mất các quyền.",
        });
        break;
      case "addBlock":
        setMess({
          header: "Bạn có chắc chắn muốn khóa người dùng này không?",
          body: "Người dùng sẽ không thể đăng nhập và quản lý các sản phẩm của họ.",
        });
        break;
      case "deleteBlock":
        setMess({
          header: "Bạn có chắc chắn muốn xóa khóa người dùng này không?",
          body: "Người dùng sẽ có thể đăng nhập và quản lý các sản phẩm của họ.",
        });
        break;
      default:
        break;
    }
    handleShow();
  };

  const onConfirm = () => {
    if (data.action && data.user_id)
      switch (data.action) {
        case "delete":
          setDeleteUser(data.user_id);
          break;
        case "addAdmin":
          setAdminUser(data.user_id);
          break;
        case "deleteAdmin":
          setAdminUser(data.user_id);
          break;
        case "addBlock":
          setBlockUser(data.user_id);
          break;
        case "deleteBlock":
          setBlockUser(data.user_id);
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
      case "is_block":
        if (parseInt(value) >= 0) {
          filter.push({
            name: name,
            value: value,
          });
        }
        break;
      case "is_admin":
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
    fetchUsers();
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
            <Breadcrumb.Item active>Quản lý người dùng</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Quản lý người dùng</h4>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-left align-items-end">
          <Col xs={6} md={3} lg={2} className="user-filter mb-1">
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
          <Col xs={6} md={3} lg={2} className="user-filter mb-1">
            <FormLabel>Vai trò</FormLabel>
            <Form.Select name="is_admin" onChange={(e) => onChangeFilter(e)}>
              <option value={-1}>Tất cả</option>
              {roleStatus?.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.value}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={3} lg={2} className="user-filter mb-1">
            <Button onClick={onSubmitFilter} style={{ width: "100%" }}>
              Lọc
            </Button>
          </Col>
        </Row>
      </div>

      <UserTable
        users={users}
        actionUser={actionUser}
        fetchUsers={fetchUsers}
        paginateData={paginateData}
      />
    </>
  );
};
