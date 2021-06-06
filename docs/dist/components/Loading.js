import React from "../../snowpack/pkg/react.js";
import {Spinner} from "../../snowpack/pkg/react-bootstrap.js";
const Loading = () => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Spinner, {
    animation: "border",
    role: "status"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "sr-only"
  }, "Loading...")));
};
export default Loading;
