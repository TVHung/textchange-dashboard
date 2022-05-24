import React from "react";
import { Image } from "@themesberg/react-bootstrap";

import loading from "../assets/img/loading.png";

export default (props) => {
  const { show } = props;

  return (
    <div
      className={`preloader bg-soft flex-column justify-content-center align-items-center ${
        show ? "" : "show"
      }`}
    >
      <Image
        className="loader-element animate__animated animate__jackInTheBox"
        src={loading}
        height={40}
      />
    </div>
  );
};
