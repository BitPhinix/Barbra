import "./app.css";
import * as React from "react";
import { render } from "react-dom";

class App extends React.Component {
    render() {
        return <div id={"injected-app"}>React funzt!</div>;
    }
}

const base = document.createElement("div");
base.id = "react-base";
document.appendChild(base);

render(<App />, base);
