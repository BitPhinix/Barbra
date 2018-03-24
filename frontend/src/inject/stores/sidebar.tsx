import {observable, computed} from "mobx";
import * as React from "react";

export class SidebarStore{
    @observable visible: boolean = false;
    @observable state: JSX.Element[] = [];
    @observable laodState(state: SidebarStates){
        switch (state){
            case SidebarStates.Login:{
                this.state = [
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
                    <button className={"signInButton"}>G sign in</button>
                ];
                break;
            }
        }
    }
}

export enum SidebarStates{
    Login,
}

var store = new SidebarStore();

export default store