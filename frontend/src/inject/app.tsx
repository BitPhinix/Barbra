import "./app.css";
import * as React from "react";
import Sidebar from "./components/sidebar/sidebar"
import SidebarStore from "./stores/sidebar";
import Threshold from "./components/threshold/threshold";
import {observer} from "mobx-react";
import {render} from "react-dom";
import Backface, {Providers} from "../backface";

@observer
export default class App extends React.Component<{}, {}> {

    private serverDomain: string = "https://b6bce9e2.ngrok.io/";
    private backface: Backface;

    constructor(props){
        super(props);
        this.backface = new Backface(this.serverDomain, null);
        chrome.runtime.onMessage.addListener((message) => {
            if(message["error"]){
                SidebarStore.showError(message["error"]);
                throw null;
            }

            this.backface.cookie = message["cookie"] as string
        });
    }

    render() {
        return (
            <div id={"injected-app"}>
                <Threshold store={SidebarStore} />
                <Sidebar store={SidebarStore} backface={this.backface}/>
            </div>
        );
    }
}

if (window.opener || window.top !== window.self) {
    //something
} else {
    let injectDiv: HTMLElement = document.createElement("div");
    injectDiv.id = "injected-react-base";
    document.body.appendChild(injectDiv);
}

render(<App/>, document.getElementById("injected-react-base"));