import "./app.css";
import * as React from "react";
import {render} from "react-dom";

export default class Popup extends React.Component<{}, {}> {

    render() {
        return(
            <div id={"popup-base"}>
                    React funzt!
            </div>
        );
    }
}

render(<Popup/>, document.getElementById("react-base"));