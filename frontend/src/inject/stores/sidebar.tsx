import {observable, computed} from "mobx";
import * as React from "react";

export class SidebarStore{
    @observable visible: boolean = false;
    @observable state: JSX.Element[] = [];

}

var store = new SidebarStore();

export default store