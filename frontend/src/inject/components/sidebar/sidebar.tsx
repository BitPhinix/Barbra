import "./sidebar.css";
import * as React from "react";
import {observer} from "mobx-react";
import {SidebarStore} from "../../stores/sidebar";
import Header from "./header/header";
import * as BackDispatcher from "../../backDispatcher";

@observer
export default class Sidebar extends React.Component<{
    store: SidebarStore
}, {}> {

    private reference: HTMLElement;
    private initial: boolean = true;

    constructor(props){
        super(props);
        this.props = props;

        //If clicked outside the sidebar close it
        window.addEventListener("click", (event) => {
                if(this.reference.compareDocumentPosition(event.target as Node) === 2){
                    this.props.store.visible = false;
                }

        });

        BackDispatcher.addListener("return_initial", (message) => {
            if(message && this.initial){
                this.loadEmptyPage(message["surname"]);
                this.props.store.showHeader = true;
                this.initial = false;
            }
            else
                this.props.store.loadLoadingPage();
        });
        BackDispatcher.addListener("return_login", (message) => {
            if(message["surname"]){
                this.loadEmptyPage(message["surname"]);
                this.props.store.showHeader = true;
            }
            else
                this.loadLoginPage();
        });
    }

    componentDidMount(){
        this.loadLoginPage();
        BackDispatcher.sendMessage("get_initial");
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
            <button className={"signInButton"} onClick={() => this.handleOnLogin("google")}>G sign in</button>,
            <button className={"signInButton"} onClick={() => this.handleOnLogin("facebook")}>f sign in</button>
        ]
    }

    private loadEmptyPage(surname: string){
        this.props.store.state = [
            <div id={"empty-header"}>
                Hi {surname}
            </div>,
            <div id={"empty-base"}>
                Browse around and we'll find<br/>content that you will like
            </div>
        ];
    }

    private handleOnLogin(provider: string){
        this.props.store.loadLoadingPage();
        BackDispatcher.sendMessage("get_login", {provider: provider})
    }

    render() {
        return(
            <div ref={(node) => this.reference = node} id={"injected-sidebar"} className={this.props.store.visible ? "opened" : "closed"}>
                <Header visible={this.props.store.showHeader}/>
                {this.props.store.state}
            </div>
        );
    }
}