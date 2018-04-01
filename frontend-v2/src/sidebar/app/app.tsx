import * as React from "react";
import { render } from "react-dom";

class App extends React.Component<{}, {}> {

	private thresholdCss: React.CSSProperties = {};

	render() {
		return (
			<div id={"app-base"}>
				Sidebar funzt!
			</div>
		);
	}
}

render(<App />, document.getElementById("react-base"));
