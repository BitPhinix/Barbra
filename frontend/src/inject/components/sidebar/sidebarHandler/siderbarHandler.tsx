import * as React from 'react';
import './sidebarHandler.css';
import { CSSTransitionGroup } from 'react-transition-group';


export class SiderbarHandler extends React.Component {

    // map new data that comes async
    // onDelete display Banner and unmount
    // onBookmark

    render() {

        return(

            <ReactCSSTransitionComponent
                transitionName="card-animation"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>

            </ReactCSSTransitionComponent>
        );
    }
}