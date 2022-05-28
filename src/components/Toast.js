import React, { useState, useEffect } from "react";
import { Card, Toast, Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBootstrap } from "@fortawesome/free-brands-svg-icons";

export default function Toasts({ mess, state, setState }) {
  const [show, setShow] = useState(state);
  const handleShowDefault = () => setState(true);
  const handleCloseDefault = () => setState(false);
  useEffect(() => {
    setShow(state);
    setTimeout(() => {
      //   handleCloseDefault();
    }, 2000);
    return () => {};
  }, []);

  return (
    <div style={{ position: "absolute", bottom: 20, right: 20 }}>
      <Toast show={show} onClose={handleCloseDefault} className="my-3">
        <Toast.Header className="text-primary" closeButton={false}>
          <FontAwesomeIcon icon={faBootstrap} />
          <strong className="me-auto ms-2">Thông báo</strong>
          <Button variant="close" size="xs" onClick={handleCloseDefault} />
        </Toast.Header>
        <Toast.Body>{mess}</Toast.Body>
      </Toast>
    </div>
  );
}
