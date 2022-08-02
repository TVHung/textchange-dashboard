import React, { useState, useEffect } from "react";
import { faCashRegister, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "@themesberg/react-bootstrap";
import {
  CounterWidget,
  CircleChartWidget,
  BarChartWidget,
  TeamMembersWidget,
  SalesValueWidget,
  SalesValueWidgetPhone,
  AcquisitionWidget,
  PostWidget,
} from "../../components/Widgets";
import { trafficShares, totalOrders } from "../../data/charts";
import Preloader from "../../components/Preloader";
import ScrollUp from "../../components/ScrollUp";
import {
  apiFetchMostView,
  apiRecently,
  headers,
  typePostInfor,
  apiUserRecently,
  apiViewStatic,
  apiProductStatic,
  apiUserStatic,
} from "../../constants";
import axios from "axios";

export default () => {
  const [loaded, setLoaded] = useState(false);
  const [productRecently, setProductRecently] = useState([]);
  const [productMostView, setProductMostView] = useState([]);
  const [userRecently, setUserRecently] = useState([]);
  const [newProductStatic, setNewProductStatic] = useState([]);
  const [newUserStatic, setNewUserStatic] = useState([]);

  useEffect(() => {
    getAllDataDashboard();
    setLoaded(true);
    return () => {
      setLoaded(false);
      setProductMostView();
      setProductRecently();
      setUserRecently();
      setNewProductStatic();
      setNewUserStatic();
    };
  }, []);

  const getAllDataDashboard = async () => {
    let apiMostView = `${apiFetchMostView}`;
    let apiRecent = `${apiRecently}`;
    let apiUserRecent = `${apiUserRecently}`;
    let apiStaticProduct = `${apiProductStatic}`;
    let apiStaticUser = `${apiUserStatic}`;
    const requestPost = axios.get(apiMostView, { headers: headers });
    const requestView = axios.get(apiRecent, { headers: headers });
    const requestUser = axios.get(apiUserRecent, { headers: headers });
    const requestStaticProduct = axios.get(apiStaticProduct, {
      headers: headers,
    });
    const requestStaticUser = axios.get(apiStaticUser, { headers: headers });

    await axios
      .all([
        requestPost,
        requestView,
        requestUser,
        requestStaticProduct,
        requestStaticUser,
      ])
      .then(
        axios.spread((...responses) => {
          setProductMostView(responses[0].data.data);
          setProductRecently(responses[1].data.data);
          setUserRecently(responses[2].data.data);
          setNewProductStatic(responses[3].data.data);
          setNewUserStatic(responses[4].data.data);
          setLoaded(false);
        })
      )
      .catch((errors) => {
        console.error(errors);
        setLoaded(false);
      });
  };

  return (
    <>
      <Preloader show={loaded} />
      <ScrollUp />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>

      <Row className="justify-content-md-center">
        <Col xs={12} lg={6} className="mb-4 d-sm-block">
          <SalesValueWidget
            title="Biểu đồ hiển thị số người dùng mới"
            value="10,567"
            percentage={10.57}
            data={newUserStatic}
            typeName="người dùng mới"
          />
        </Col>
        <Col xs={12} lg={6} className="mb-4 d-sm-block">
          <SalesValueWidget
            title="Biểu đồ hiển thị số sản phẩm mới"
            value="10,567"
            percentage={10.57}
            data={newProductStatic}
            typeName="sản phẩm mới"
          />
        </Col>
        {/* <Col xs={12} className="mb-4">
          <BarChartWidget
            title="Lượng giao dịch"
            value={452}
            percentage={18.2}
            data={totalOrders}
          />
        </Col> */}
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Customers"
            title="345k"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue"
            title="$43,594"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget title="Traffic Share" data={trafficShares} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={6} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PostWidget
                    type={typePostInfor.recently}
                    data={productRecently}
                  />
                </Col>

                <Col xs={12} className="mb-4">
                  <TeamMembersWidget data={userRecently} />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={6}>
              <Row>
                <Col xs={12} className="mb-4">
                  <PostWidget
                    type={typePostInfor.mostView}
                    data={productMostView}
                  />
                </Col>
                <Col xs={12} className="mb-4">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
