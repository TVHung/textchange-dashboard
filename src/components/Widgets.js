import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faChartArea,
  faChartBar,
  faChartLine,
  faFlagUsa,
  faFolderOpen,
  faGlobeEurope,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAngular,
  faBootstrap,
  faReact,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  ListGroup,
  ProgressBar,
} from "@themesberg/react-bootstrap";
import {
  CircleChart,
  BarChart,
  SalesValueChart,
  SalesValueChartphone,
} from "./Charts";
import teamMembers from "../data/teamMembers";
import { apiChangeAvatar, headerFiles, maxSizeImage } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "../utils/cookie";

export const ProfileCardWidget = ({ userProfile }) => {
  const [fileImage, setfileImage] = useState();
  const [fileImageUrl, setfileImageUrl] = useState("");
  const [validate, setValidate] = useState("");

  const setUploadFile = (e) => {
    let fileImage = e.target.files[0];
    if (fileImage.size <= maxSizeImage) {
      setfileImage(fileImage);
      changeAvatar(fileImage);
      setValidate("");
    } else setValidate("Bạn chỉ được đăng ảnh kích thước tối đa 2mb");
  };

  useEffect(() => {
    return () => {
      setfileImage();
      setfileImageUrl();
      setValidate();
    };
  }, []);

  const changeAvatar = async (fileImage) => {
    const formData = new FormData();
    formData.append("file", fileImage);
    console.log("call api");
    await axios
      .post(apiChangeAvatar, formData, {
        headers: headerFiles,
      })
      .then((res) => {
        console.log("post image", res.data);
        if (res.data.status == 1) {
          setfileImageUrl(res.data.data);
          toast.success(res.data.message);
        } else {
          toast.error("Cập nhật ảnh đại hiện không thành công");
        }
      })
      .catch((error) => {
        toast.error("Cập nhật ảnh đại hiện không thành công");
        console.error(error);
      });
  };

  return (
    <Card border="light" className="text-center p-0 mb-4">
      <div
        style={{
          backgroundImage: `url(${userProfile && userProfile.avatar_url})`,
        }}
        className="profile-cover rounded-top"
      />
      <Card.Body className="pb-0">
        <div className="position-relative">
          <input
            type="file"
            className="custom-file-input"
            id="avatar-upload-profile"
            hidden
            accept="image/*"
            onChange={(e) => setUploadFile(e)}
            style={{ zIndex: 100 }}
          />
          <Card.Img
            src={
              fileImageUrl
                ? fileImageUrl
                : userProfile && userProfile.avatar_url
            }
            alt="Neil Portrait"
            className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
            style={{ zIndex: 10 }}
          />
          <label
            style={{
              position: "absolute",
              top: 70,
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              color: "#fff",
            }}
            htmlFor="avatar-upload-profile"
          >
            <FontAwesomeIcon icon={faPen} className="ms-2 fa-2x" />
          </label>
        </div>
        {validate != "" && (
          <Card.Text style={{ color: "red", marginBottom: 0 }}>
            {validate}
          </Card.Text>
        )}
        <Card.Title>{userProfile && userProfile.name}</Card.Title>
        <Card.Text className="text-gray mb-2">
          {userProfile && userProfile.address}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export const CounterWidget = (props) => {
  const { icon, iconColor, category, title, period, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <div
              className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}
            >
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className="d-sm-none">
              <h5>{category}</h5>
              <h3 className="mb-1">{title}</h3>
            </div>
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <div className="d-none d-sm-block">
              <h5>{category}</h5>
              <h3 className="mb-1">{title}</h3>
            </div>
            <small>
              {period}, <FontAwesomeIcon icon={faGlobeEurope} size="xs" />{" "}
              WorldWide
            </small>
            <div className="small mt-2">
              <FontAwesomeIcon
                icon={percentageIcon}
                className={`${percentageColor} me-1`}
              />
              <span className={`${percentageColor} fw-bold`}>
                {percentage}%
              </span>{" "}
              Since last month
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const CircleChartWidget = (props) => {
  const { title, data = [] } = props;
  const series = data.map((d) => d.value);

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xs={12}
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <CircleChart series={series} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>

            {data.map((d) => (
              <h6
                key={`circle-element-${d.id}`}
                className="fw-normal text-gray"
              >
                <FontAwesomeIcon
                  icon={d.icon}
                  className={`icon icon-xs text-${d.color} w-20 me-1`}
                />
                {` ${d.label} `}
                {`${d.value}%`}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const BarChartWidget = (props) => {
  const { title, value, percentage, data = [] } = props;
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const series = data.map((d) => d.value);
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="d-flex flex-row align-items-center flex-0 border-bottom">
        <div className="d-block">
          <h6 className="fw-normal text-gray mb-2">{title}</h6>
          <h3>{value}</h3>
          <small className="mt-2">
            <FontAwesomeIcon
              icon={percentageIcon}
              className={`${percentageColor} me-1`}
            />
            <span className={`${percentageColor} fw-bold`}>{percentage}%</span>
          </small>
        </div>
        <div className="d-block ms-auto">
          {data.map((d) => (
            <div
              key={`bar-element-${d.id}`}
              className="d-flex align-items-center text-end mb-2"
            >
              <span className={`shape-xs rounded-circle bg-${d.color} me-2`} />
              <small className="fw-normal">{d.label}</small>
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Body className="p-2">
        <BarChart labels={labels} series={series} />
      </Card.Body>
    </Card>
  );
};

export const TeamMembersWidget = () => {
  const TeamMember = (props) => {
    const { name, statusKey, image, icon, btnText } = props;
    const status = {
      online: { color: "success", label: "Online" },
      inMeeting: { color: "warning", label: "In a meeting" },
      offline: { color: "danger", label: "Offline" },
    };

    const statusColor = status[statusKey] ? status[statusKey].color : "danger",
      statusLabel = status[statusKey] ? status[statusKey].label : "Offline";

    return (
      <ListGroup.Item className="px-0">
        <Row className="align-items-center">
          <Col className="col-auto">
            <a href="#top" className="user-avatar">
              <Image src={image} className="rounded-circle" />
            </a>
          </Col>
          <Col className="ms--2">
            <h4 className="h6 mb-0">
              <a href="#!">{name}</a>
            </h4>
            <span className={`text-${statusColor}`}>● </span>
            <small>{statusLabel}</small>
          </Col>
          <Col className="col-auto">
            <Button variant="tertiary" size="sm">
              <FontAwesomeIcon icon={icon} className="me-1" /> {btnText}
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light d-flex justify-content-between">
        <h5 className="mb-0">Team members</h5>
        <Button variant="secondary" size="sm">
          See all
        </Button>
      </Card.Header>
      <Card.Body>
        <ListGroup className="list-group-flush list my--3">
          {teamMembers.map((tm) => (
            <TeamMember key={`team-member-${tm.id}`} {...tm} />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export const ProgressTrackWidget = () => {
  const Progress = (props) => {
    const { title, percentage, icon, color, last = false } = props;
    const extraClassName = last ? "" : "mb-2";

    return (
      <Row className={`align-items-center ${extraClassName}`}>
        <Col xs="auto">
          <span className={`icon icon-md text-${color}`}>
            <FontAwesomeIcon icon={icon} className="me-1" />
          </span>
        </Col>
        <Col>
          <div className="progress-wrapper">
            <div className="progress-info">
              <h6 className="mb-0">{title}</h6>
              <small className="fw-bold text-dark">
                <span>{percentage} %</span>
              </small>
            </div>
            <ProgressBar variant={color} now={percentage} min={0} max={100} />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Progress track</h5>
      </Card.Header>
      <Card.Body>
        <Progress
          title="Rocket - SaaS Template"
          color="purple"
          icon={faBootstrap}
          percentage={34}
        />
        <Progress
          title="Pixel - Design System"
          color="danger"
          icon={faAngular}
          percentage={60}
        />
        <Progress
          title="Spaces - Listings Template"
          color="tertiary"
          icon={faVuejs}
          percentage={45}
        />
        <Progress
          title="Stellar - Dashboard"
          color="info"
          icon={faReact}
          percentage={35}
        />
        <Progress
          last
          title="Volt - Dashboard"
          color="purple"
          icon={faBootstrap}
          percentage={34}
        />
      </Card.Body>
    </Card>
  );
};

export const RankingWidget = () => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
          <div>
            <h6>
              <FontAwesomeIcon
                icon={faGlobeEurope}
                className="icon icon-xs me-3"
              />{" "}
              Global Rank
            </h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary fw-bold">
              #755 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6 className="mb-0">
              <FontAwesomeIcon icon={faFlagUsa} className="icon icon-xs me-3" />
              Country Rank
            </h6>
            <div className="small card-stats">
              United States{" "}
              <FontAwesomeIcon
                icon={faAngleUp}
                className="icon icon-xs text-success ms-2"
              />
            </div>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              #32 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-3">
          <div>
            <h6 className="mb-0">
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="icon icon-xs me-3"
              />
              Category Rank
            </h6>
            <Card.Link href="#top" className="small card-stats">
              Travel &gt; Accomodation
            </Card.Link>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              #16 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidget = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";
  const [type, setType] = useState("week");

  const setTypeGraph = (e) => {
    const { name } = e.target;
    setType(name);
  };

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h5 className="fw-normal mb-2">{title}</h5>
          <h3>{value} Lượt</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon
              icon={percentageIcon}
              className={`${percentageColor} me-1`}
            />
            <span className={percentageColor}>{percentage}%</span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button
            name="week"
            size="sm"
            className={
              type == "week" ? "me-3 btn-secondary" : "me-3 btn-primary"
            }
            onClick={(e) => setTypeGraph(e)}
          >
            Week
          </Button>
          <Button
            name="month"
            size="sm"
            className={
              type == "month" ? "me-2 btn-secondary" : "me-2 btn-primary"
            }
            onClick={(e) => setTypeGraph(e)}
          >
            Month
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChart type={type} />
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidgetPhone = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  const [type, setType] = useState("week");

  const setTypeGraph = (e) => {
    const { name } = e.target;
    setType(name);
  };

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-md-flex flex-row align-items-center flex-0">
        <div className="d-block mb-3 mb-md-0">
          <h5 className="fw-normal mb-2">{title}</h5>
          <h3>{value} Lượt</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon
              icon={percentageIcon}
              className={`${percentageColor} me-1`}
            />
            <span className={percentageColor}>{percentage}%</span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button
            size="sm"
            name="week"
            className={
              type == "week" ? "me-3 btn-secondary" : "me-3 btn-primary"
            }
            onClick={(e) => setTypeGraph(e)}
          >
            Week
          </Button>
          <Button
            size="sm"
            name="month"
            className={
              type == "month" ? "me-2 btn-secondary" : "me-2 btn-primary"
            }
            onClick={(e) => setTypeGraph(e)}
          >
            Month
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChartphone type={type} />
      </Card.Body>
    </Card>
  );
};

export const AcquisitionWidget = () => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <h5>Acquisition</h5>
        <p>
          Tells you where your visitors originated from, such as search engines,
          social networks or website referrals.
        </p>
        <div className="d-block">
          <div className="d-flex align-items-center pt-3 me-5">
            <div className="icon icon-shape icon-sm icon-shape-danger rounded me-3">
              <FontAwesomeIcon icon={faChartBar} />
            </div>
            <div className="d-block">
              <label className="mb-0">Bounce Rate</label>
              <h4 className="mb-0">33.50%</h4>
            </div>
          </div>
          <div className="d-flex align-items-center pt-3">
            <div className="icon icon-shape icon-sm icon-shape-quaternary rounded me-3">
              <FontAwesomeIcon icon={faChartArea} />
            </div>
            <div className="d-block">
              <label className="mb-0">Sessions</label>
              <h4 className="mb-0">9,567</h4>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
