// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".App {\n  text-align: center;\n}\n#landing {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  background-color: hsl(0, 0%, 17%);\n  height: 100vh;\n  justify-content: center;\n  align-items: center;\n}\n.App code {\n  background: #fff3;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n.App p {\n  margin: 0.4rem;\n}\n\n.App-logo {\n  height: 40vmin;\n  pointer-events: none;\n}\n\nh1 {\n  color: white;\n}\n\np {\n  color: white;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  .App-logo {\n    animation: App-logo-spin infinite 20s linear;\n  }\n}\n\n.App-header {\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n}\n\n.App-link {\n  color: #61dafb;\n}\n\n#success {\n  font-size: 10em;\n}\n.success-container {\n  display: flex;\n  flex-direction: column;\n  height: 92vh;\n  justify-content: space-evenly;\n  align-items: center;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}