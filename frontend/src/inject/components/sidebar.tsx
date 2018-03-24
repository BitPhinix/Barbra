import "./sidebar.css";
import * as React from "react";
import {observer} from "mobx-react";
import {SidebarStore, SidebarStates} from "../stores/sidebar";
import Header from "./header";

@observer
export default class Sidebar extends React.Component<{
    store: SidebarStore
}, {}> {

    private reference: HTMLElement;

    constructor(props){
        super(props);
        this.props = props;

        //If clicked outside the sidebar close it
        window.addEventListener("click", (event) => {
            if (!this.reference.contains(event.target as Node)) {
                this.props.store.visible = false;
            }
        });

        this.props.store.state = [
            //loading animation
        ]
    }

    componentDidMount(){
        //check session exists

        //not
        this.props.store.laodState(SidebarStates.Login);
    }

    render() {
        return(
            <div ref={(node) => this.reference = node} id={"injected-sidebar"} className={this.props.store.visible ? "opened" : "closed"}>
                <Header/>
                {this.props.store.state}
            </div>
        );
    }
}