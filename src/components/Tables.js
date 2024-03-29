import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faLock,
  faLockOpen,
  faTrashAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import avt from "../assets/img/avt.jpg";
import { formatPrice } from "../utils/common";
import Pagination from "react-js-pagination";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return value ? (
    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}
        {suffix}
      </span>
    </span>
  ) : (
    "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon
            icon={bounceIcon}
            className={`${bounceTxtColor} me-3`}
          />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">
              See all
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map((pv) => (
            <TableRow key={`page-visit-${pv.id}`} {...pv} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const {
      id,
      source,
      sourceIcon,
      sourceIconColor,
      sourceType,
      category,
      rank,
      trafficShare,
      change,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {id}
          </Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon
            icon={sourceIcon}
            className={`icon icon-xs text-${sourceIconColor} w-30`}
          />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar
                variant="primary"
                className="progress-lg mb-0"
                now={trafficShare}
                min={0}
                max={100}
              />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map((pt) => (
              <TableRow key={`page-traffic-${pt.id}`} {...pt} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const {
      country,
      countryImage,
      overallRank,
      overallRankChange,
      travelRank,
      travelRankChange,
      widgetsRank,
      widgetsRankChange,
    } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image
              src={countryImage}
              className="image-small rounded-circle me-2"
            />
            <div>
              <span className="h6">{country}</span>
            </div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">{overallRank ? overallRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">{travelRank ? travelRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">{widgetsRank ? widgetsRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel &amp; Local</th>
              <th className="border-0">Travel &amp;Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const PostTable = ({ posts, actionPost, fetchPosts, paginateData }) => {
  const totalPosts = posts?.length;

  const TableRow = (props) => {
    const { id, images, name, category, price, sold, is_block } = props;
    const statusVariant = is_block === 1 ? "success" : "warning";
    const statusSold = sold === 1 ? "Đã bán" : "Chưa bán";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            <Image
              src={images[0] ? images[0].image_url : avt}
              height={50}
              alt="post-image"
            />
          </span>
        </td>
        <td>
          <span className="fw-normal">{category}</span>
        </td>
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <span className="fw-normal">{statusSold}</span>
        </td>
        <td>
          <span className="fw-normal">
            {formatPrice(parseFloat(price).toFixed(0))} vnđ
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {is_block == 0 ? "Không" : "Có"}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => actionPost(id, "detailPost")}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> Xem chi tiết
              </Dropdown.Item>
              {is_block == 1 ? (
                <Dropdown.Item
                  className="text-success"
                  onClick={() => actionPost(id, "deleteBlock")}
                >
                  <FontAwesomeIcon icon={faLockOpen} className="me-2" /> Mở khóa
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => actionPost(id, "addBlock")}
                >
                  <FontAwesomeIcon icon={faLock} className="me-2" /> Khóa
                </Dropdown.Item>
              )}
              <Dropdown.Item
                className="text-danger"
                onClick={() => actionPost(id, "delete")}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Xóa
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">ID</th>
              <th className="border-bottom">Hình ảnh</th>
              <th className="border-bottom">Loại sản phẩm</th>
              <th className="border-bottom">Tên</th>
              <th className="border-bottom">Tình trạng giao dịch</th>
              <th className="border-bottom">Giá</th>
              <th className="border-bottom">Khóa</th>
              <th className="border-bottom">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((t, index) => (
              <TableRow key={`transaction-${index}`} {...t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Pagination
            activePage={paginateData?.current_page}
            itemsCountPerPage={paginateData?.per_page}
            totalItemsCount={paginateData?.total || 0}
            onChange={(pageNumber) => {
              fetchPosts(pageNumber);
            }}
            pageRangeDisplayed={5}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="Trang đầu"
            lastPageText="Trang cuối"
          />
          <small className="fw-bold">
            Showing <b>{totalPosts}</b> out of <b>{paginateData?.total}</b>{" "}
            entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const UserTable = ({ users, actionUser, fetchUsers, paginateData }) => {
  const totalUsers = users.length;

  const TableRow = (props) => {
    const { id, name, email, is_admin, is_block } = props;
    const statusVariant = is_block === 1 ? "success" : "warning";
    const statusAdmin = is_admin === 1 ? "success" : "warning";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <span className="fw-normal">{email}</span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {is_block == 1 ? "Có" : "Không"}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusAdmin}`}>
            {is_admin == 0 ? "Không" : "Có"}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {is_block == 1 ? (
                <Dropdown.Item
                  className="text-success"
                  onClick={() => actionUser(id, "deleteBlock")}
                >
                  <FontAwesomeIcon icon={faLockOpen} className="me-2" /> Mở khóa
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => actionUser(id, "addBlock")}
                >
                  <FontAwesomeIcon icon={faLock} className="me-2" /> Khóa
                </Dropdown.Item>
              )}
              {is_admin == 1 ? (
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => actionUser(id, "deleteAdmin")}
                >
                  <FontAwesomeIcon icon={faUserShield} className="me-2" /> Xóa
                  quyền quản trị
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  className="text-success"
                  onClick={() => actionUser(id, "addAdmin")}
                >
                  <FontAwesomeIcon icon={faUserShield} className="me-2" /> Chỉ
                  định làm quản trị viên
                </Dropdown.Item>
              )}
              <Dropdown.Item
                className="text-danger"
                onClick={() => actionUser(id, "delete")}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Xóa
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">ID</th>
              <th className="border-bottom">Tên</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Khóa</th>
              <th className="border-bottom">Quản trị viên</th>
              <th className="border-bottom">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((t, index) => (
              <TableRow key={`user-${index}`} {...t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Pagination
            activePage={paginateData?.current_page}
            itemsCountPerPage={paginateData?.per_page}
            totalItemsCount={paginateData?.total || 0}
            onChange={(pageNumber) => {
              fetchUsers(pageNumber);
            }}
            pageRangeDisplayed={5}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="Trang đầu"
            lastPageText="Trang cuối"
          />
          <small className="fw-bold">
            Showing <b>{totalUsers}</b> out of <b>{paginateData?.total}</b>{" "}
            entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {
  const totalTransactions = transactions.length;

  const TableRow = (props) => {
    const { id, images, name, address, category, price, is_sold, is_block } =
      props;
    const statusVariant = is_block === 0 ? "success" : "warning";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            <Image src={images[0].image_url} height={50} alt="post-image" />
          </span>
        </td>
        <td>
          <span className="fw-normal">{category}</span>
        </td>
        <td>
          <span className="fw-normal">{name}</span>
        </td>
        <td>
          <span className="fw-normal">{address}</span>
        </td>
        <td>
          <span className="fw-normal">
            {formatPrice(parseFloat(price).toFixed(0))} vnđ
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {is_block == 0 ? "Không" : "Có"}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">ID</th>
              <th className="border-bottom">Hình ảnh</th>
              <th className="border-bottom">Loại sản phẩm</th>
              <th className="border-bottom">Tên</th>
              <th className="border-bottom">Địa chỉ</th>
              <th className="border-bottom">Giá</th>
              <th className="border-bottom">Khóa</th>
              <th className="border-bottom">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <TableRow key={`transaction-${index}`} {...t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: "5%" }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: "5%" }}>
          <ul className="ps-0">
            {usage.map((u) => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: "50%" }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: "40%" }}>
          <pre>
            <Card.Link href={link} target="_blank">
              Read More{" "}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" />
            </Card.Link>
          </pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table
          responsive
          className="table-centered rounded"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: "5%" }}>
                Name
              </th>
              <th className="border-0" style={{ width: "5%" }}>
                Usage
              </th>
              <th className="border-0" style={{ width: "50%" }}>
                Description
              </th>
              <th className="border-0" style={{ width: "40%" }}>
                Extra
              </th>
            </tr>
          </thead>
          <tbody>
            {commands.map((c) => (
              <TableRow key={`command-${c.id}`} {...c} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
