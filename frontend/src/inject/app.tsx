import "./app.css";
import * as React from "react";
import Sidebar from "./components/sidebar/sidebar"
import SidebarStore from "./stores/sidebar";
import Threshold from "./components/threshold/threshold";
import {observer} from "mobx-react";
import {render} from "react-dom";
import * as BackDispatcher from "./backDispatcher";
import * as Background from "../background";

@observer
export default class App extends React.Component<{}, {}> {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id={"injected-app"}>
                <Threshold store={SidebarStore} />
                <Sidebar store={SidebarStore}/>
            </div>
        );
    }
}

if (!window.opener && window.top === window.self) {
    let injectDiv: HTMLElement = document.createElement("div");
    injectDiv.id = "injected-react-base";
    document.body.appendChild(injectDiv);
}

render(<App/>, document.getElementById("injected-react-base"));