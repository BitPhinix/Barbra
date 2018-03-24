import "./sidebar.css";
import * as React from "react";
import {observer} from "mobx-react";
import {SidebarStore} from "../stores/sidebar";

@observer
export default class Sidebar extends React.Component<{
    store: SidebarStore
}, {}> {

    public reference: HTMLElement;

    constructor(props){
        super(props)
        this.props = props;

        //If clicked outside the sidebar close it
        window.addEventListener("click", (event) => {
            if (!this.reference.contains(event.target as Node)) {
                this.props.store.visible = false;
            }
        });
    }

    render() {
        return(
            <div ref={(node) => this.reference = node}id={"injected-sidebar"} className={this.props.store.visible ? "opened" : "closed"}>
                {this.props.store.state}
            </div>
        );
    }
}