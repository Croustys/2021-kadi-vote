import React from "../../snowpack/pkg/react.js";
import Button from "../../snowpack/pkg/react-bootstrap/Button.js";
export default function Logout(Props) {
  return /* @__PURE__ */ React.createElement(Button, {
    className: "logout-btn",
    variant: "warning",
    onClick: Props.ClickHandler
  }, "Logout");
}
