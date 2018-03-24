import "./sidebar.css";
import * as React from "react";
import {observer} from "mobx-react";
import {SidebarStore} from "../../stores/sidebar";
import Header from "./header/header";
import Backface, {Providers} from "../../backface";

@observer
export default class Sidebar extends React.Component<{
    store: SidebarStore,
    backface: Backface
}, {}> {

    private reference: HTMLElement;

    constructor(props){
        super(props);
        this.props = props;

        //If clicked outside the sidebar close it
        window.addEventListener("click", (event) => {
                if(this.reference.compareDocumentPosition(event.target as Node) === 2){
                    this.props.store.visible = false;
                }

        });

        this.props.store.state = [
            //loading animation
        ]
    }

    componentDidMount(){
        //check cookie exists

        //not
        this.loadLoginPage();
    }

    private loadLoginPage(){
        this.props.store.state = [
            <div id={"header-logo"}>
                <div id={"svg-con"}>
                    <svg height={"50px"} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 32 37">
                        <path fill={"white"} d="M 3.76752 11.5576C 2.09619 10.5962 2.09619 8.18474 3.76752 7.2234L 12.5791 2.15499C 14.2457 1.19632 16.3256 2.39936 16.3256 4.32207L 16.3256 14.4589C 16.3256 16.3816 14.2457 17.5846 12.5791 16.626L 3.76752 11.5576Z"/>
                        <path fill={"white"} d="M 32.2325 23.3492C 33.9038 24.3105 33.9038 26.722 32.2325 27.6833L 16.3046 36.845C 14.638 37.8037 12.5581 36.6006 12.5581 34.6779L 12.5581 16.3545C 12.5581 14.4318 14.638 13.2288 16.3046 14.1875L 32.2325 23.3492Z"/>
                    </svg>
                </div>
                <div id={"span-con"}>
                    <span>
                        Barbra
                    </span>
                </div>
            </div>,
            <button className={"signInButton"} onClick={() => this.handleOnLogin(Providers.Google)}>G sign in</button>,
            <button className={"signInButton"} onClick={() => this.handleOnLogin(Providers.Facebook)}>f sign in</button>
        ]
    }

    private handleOnLogin(provider: Providers){
        this.props.store.loadLoadingPage();
        this.props.backface.login(provider, (response: JSON) => {
            let popup = open(response["url"], "Authorize", "width=800,height=600,toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no");
        });
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