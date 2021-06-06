import React from "../../snowpack/pkg/react.js";
import {Navbar} from "../../snowpack/pkg/react-bootstrap.js";
const Nav = ({canVote, account}) => {
  return /* @__PURE__ */ React.createElement(Navbar, {
    className: "hght",
    bg: "dark",
    variant: "dark"
  }, /* @__PURE__ */ React.createElement("h2", null, canVote ? account?.name : "Sajnos nem Boronkays email címmel jelentkeztél be, így nem vagy jogosult a szavazásra!"));
};
export default Nav;
