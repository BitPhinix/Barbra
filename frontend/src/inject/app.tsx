import "./app.css";
import * as React from "react";
import Sidebar from "./components/sidebar"
import SidebarStore from "./stores/sidebar";
import Threshold from "./components/threshold";
import {observer} from "mobx-react";
import {render} from "react-dom";

@observer
export default class App extends React.Component<{}, {}> {


    render() {
        return (
            <div id={"injected-app"}>
                <Threshold store={SidebarStore} />
                <Sidebar store={SidebarStore}/>
            </div>
        );
    }
}

let injectDiv: HTMLElement = document.createElement("div");
injectDiv.id = "injected-react-base";
document.body.appendChild(injectDiv);

render(<App/>, document.getElementById("injected-react-base"));
