import * as React from 'react';
import './sidebarHandler.css';
import { CSSTransitionGroup } from 'react-transition-group';
import { observer } from "mobx-react";
import { DeletedInformationCardFeedbackBanner } from '../../deletedInformationCardFeedbackBanner/deletedInformationCardFeedbackBanner';

@observer
export class SiderbarHandler extends React.Component {

    // map data into informationcards
    // onCardDelete display FeedbackBanner and unmount Card
    // if isUndone then remount deleted component
    // unmount feedbackBanner after 3 seconds

    render() {

        return(
            <CSSTransitionGroup
                transitionName="card-animation"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>

            </CSSTransitionGroup>
        );
    }
}