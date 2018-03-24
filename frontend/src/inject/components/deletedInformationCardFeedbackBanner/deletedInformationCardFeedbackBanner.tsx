import * as React from 'react';
import './deletedInformationCardFeedbackBanner.css';
import { action, observable } from "mobx";
import { observer } from "mobx-react";

export enum FeedbackBannerType {
    DeletedInformationCard = 'Card removed',
    Undone = 'Action undone',
    Loading = 'Loading...'
}

@observer
export class DeletedInformationCardFeedbackBanner extends React.Component {
    @observable isUndone: boolean;
    @observable feedbackMessage: string;

    constructor(props) {
        super(props);
        this.isUndone = false;
        this.feedbackMessage = FeedbackBannerType.DeletedInformationCard;
    }

    @action('change state of isUndone')
    handleUndo = () => {
        this.isUndone = !this.isUndone;
        this.feedbackMessage = FeedbackBannerType.Loading;
        setTimeout(() => {
            this.feedbackMessage = FeedbackBannerType.Undone
        }, 2000);
    };

    render() {
        return (
            <div className="feedback-banner">
                <div className="text-12">
                    {this.feedbackMessage}
                    <span className="feedback-banner-button" onClick={this.handleUndo}>
                        {this.feedbackMessage === FeedbackBannerType.DeletedInformationCard ? ' Undo.' : null}
                    </span>
                </div>
            </div>
        );
    }
}