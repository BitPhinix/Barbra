// @flow

import "./app.css";
import * as React from "react";
import { render } from "react-dom";

class App extends React.Component<{}, {}> {
	render() {
		return <div id={"injected-app"}>React funzt!</div>;
	}
}

window.onload = () => {
	const root = document.getElementById("react-base");
	if (root instanceof HTMLDivElement) render(<App />, root);
	else console.error('Container "react-base" not found!');
};
