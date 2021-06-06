import React, {useContext} from "../../snowpack/pkg/react.js";
import {Card, Button} from "../../snowpack/pkg/react-bootstrap.js";
import "../styles/components.css.proxy.js";
import {postVote} from "../API/index.js";
import {VoteLoadingContext} from "../context.js";
const Banner = ({name, cls, image, email}) => {
  const {setLoading, setSuccess} = useContext(VoteLoadingContext);
  async function handleClick() {
    setLoading(true);
    const success = await postVote(name, email);
    setSuccess(success);
    setLoading(false);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "container"
  }, /* @__PURE__ */ React.createElement("img", {
    src: `./images/${image}`
  }), /* @__PURE__ */ React.createElement(Card, {
    style: {width: "18rem"}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "data"
  }, /* @__PURE__ */ React.createElement(Card.Body, null, /* @__PURE__ */ React.createElement(Card.Title, null, name), /* @__PURE__ */ React.createElement(Card.Text, null, cls), /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    className: "vote",
    onClick: handleClick
  }, "Vote")))));
};
export default Banner;
