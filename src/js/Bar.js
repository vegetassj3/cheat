import React from "react";
import { Link } from "react-router-dom";
export default function Bar(props) {
  return (
    <div className="top">
      <Link
        key="connents"
        style={{ fontSize: "x-large" }}
        to={{
          pathname: "/main",
        }}
      >
        List of Contents
      </Link>
    </div>
  );
}
