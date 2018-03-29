import "./app.css";
import * as React from "react";
import { render } from "react-dom";

interface Props {}
interface States {}

class App extends React.Component<Props, States> {
	private selector: string;

	render() {
		if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
		} else if (navigator.userAgent.indexOf("Chrome") != -1) {
			this.selector = "chrome-extension://" + chrome.runtime.id;
		} else if (navigator.userAgent.indexOf("Safari") != -1) {
		} else if (navigator.userAgent.indexOf("Firefox") != -1) {
		} else if (navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) {
		}
		return <iframe id={"injected-iframe"} src={this.selector + "/content.html"} />;
	}
}

const base = document.createElement("div");
base.id = "react-base";
document.body.appendChild(base);

render(<App />, base);

declare var safari: { pushNotification };
declare var opr: { addons };
declare var document: document;

interface document extends Document {
	documentMode;
}
