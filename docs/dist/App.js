import React, {useState} from "../snowpack/pkg/react.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "../snowpack/pkg/react-router-dom.js";
import {Nav, Banner, Logout} from "./components/index.js";
import {EMAIL_ENDING, CLASSES} from "./Constants/index.js";
import {VoteLoadingContext} from "./context.js";
import "./App.css.proxy.js";
const App = () => {
  const [token, setToken] = useState(null);
  const [canVote, setCanVote] = useState(false);
  const [email, setEmail] = useState("");
  const [msalInstance, onMsalInstanceChange] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  function authHandler(err, data, instance) {
    if (!err && data) {
      setToken(data.uniqueId);
      onMsalInstanceChange(instance);
      const {
        account: {userName}
      } = data;
      setCanVote(checkValidity(userName));
      setEmail(userName);
    } else
      console.error(err);
  }
  function checkValidity(em) {
    return em.endsWith(EMAIL_ENDING);
  }
  function logoutHandler() {
    msalInstance.logout();
  }
  return /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(VoteLoadingContext.Provider, {
    value: {loading, success, setLoading, setSuccess}
  }, /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/voted"
  }, msalInstance ? /* @__PURE__ */ React.createElement(Logout, {
    ClickHandler: logoutHandler
  }) : /* @__PURE__ */ React.createElement(Redirect, {
    to: "/"
  })), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, token ? /* @__PURE__ */ React.createElement(Nav, {
    canVote,
    ...msalInstance
  }) : /* @__PURE__ */ React.createElement("div", {
    id: "landing"
  }, /* @__PURE__ */ React.createElement("h1", null, "Kérlek lépj be az iskolai email címeddel!")), canVote ? /* @__PURE__ */ React.createElement("div", {
    className: "outer-container"
  }, !loading && success === void 0 ? CLASSES.map((each, i) => /* @__PURE__ */ React.createElement(Banner, {
    cls: each.cls,
    name: each.name,
    key: i,
    image: each.image,
    email
  })) : loading ? /* @__PURE__ */ React.createElement("h1", null, "Loading...") : success ? /* @__PURE__ */ React.createElement("div", {
    className: "success-container"
  }, /* @__PURE__ */ React.createElement("h1", {
    id: "success"
  }, "Success!"), /* @__PURE__ */ React.createElement(Logout, {
    ClickHandler: logoutHandler
  })) : /* @__PURE__ */ React.createElement("h1", null, "Error!")) : null)))));
};
export default App;
