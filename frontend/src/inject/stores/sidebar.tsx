import {observable, computed} from "mobx";
import * as React from "react";

export class SidebarStore{
    @observable visible: boolean = false;
    @observable showHeader: boolean = false;
    @observable state: JSX.Element[] = [];
    public loadLoadingPage(){
        this.state = [
            <div id="injected-spinner-con">
                <div id="injected-spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        ];
    }
}

var store = new SidebarStore();

export default store