import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCog,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Breadcrumb,
  InputGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";

import { UserTable } from "../components/Tables";
import axios from "axios";
import {
  apiGetUser,
  apiSetBlockUser,
  headers,
  apiSetAdminUser,
} from "../constants";
import { Modal } from "@themesberg/react-bootstrap";
import { getCookie } from "../utils/cookie";
import Preloader from "../components/Preloader";
import { toast } from "react-toastify";

export default () => {
  const [users, setUsers] = useState([]);
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
    setLoaded(true);
    console.log("user manager");
    return () => {
      setUsers([]);
      setShowDefault(false);
      setData({});
      setMess({});
      setLoaded(false);
    };
  }, []);

  const fetchUsers = async () => {
    console.log("user", headers);
    await axios
      .get(apiGetUser, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data.data);
        setLoaded(false);
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
          toast.success(res.data.mess);
          fetchUsers();
        } else toast.error(res.data.message);
      })
      .catch((error) => {
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
          toast.success(res.data.mess);
          fetchUsers();
        } else toast.error(res.data.message);
      })
      .catch((error) => {
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
          toast.success(res.data.mess);
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
          body: "Người dùng sẽ không thể đăng nhập và quản lý các bài viết của họ.",
        });
        break;
      case "deleteBlock":
        setMess({
          header: "Bạn có chắc chắn muốn xóa khóa người dùng này không?",
          body: "Người dùng sẽ có thể đăng nhập và quản lý các bài viết của họ.",
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
            <Breadcrumb.Item active>Quản lý người dùng</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Quản lý người dùng</h4>
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
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  Show
                </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10{" "}
                  <span className="icon icon-small ms-auto">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <UserTable users={users} actionUser={actionUser} />
    </>
  );
};
