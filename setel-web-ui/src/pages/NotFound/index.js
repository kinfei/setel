import React from "react";

import { Link } from "react-router-dom";

import css from "./index.less";

function NotFound() {
  return (
    <div className={css.wrapper}>
      404 | Page not found. <Link to="/">Back to home</Link>
    </div>
  );
}

export default NotFound;
