import "./threshold.css";
import * as React from "react";
import {observer} from "mobx-react";
import {SidebarStore} from "../../stores/sidebar";
import ThresholdStore from "../../stores/threshold";

@observer
export default class Threshold extends React.Component<{
    store: SidebarStore
}, {}> {

    private mouseOver: boolean = false;

    //If mouse is over threshold for more then 50ms the sidebar opens
    private async handleOnMouseEnter(){
        this.mouseOver = true;
        await this.sleep(50);
        if(this.mouseOver)
            this.props.store.visible = true;
    }

    private sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return(
            <div style={{width: ThresholdStore.width + "px"}} id={"injected-threshold"} onMouseEnter={(event) => this.handleOnMouseEnter()} onMouseLeave={() => this.mouseOver = false}>

            </div>
        );
    }
}