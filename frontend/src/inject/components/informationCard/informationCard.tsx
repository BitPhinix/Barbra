import * as React from 'react';
import { action, observable } from 'mobx';
import { InformationCardHeader } from './informationCardHeader/informationCardHeader';
import { divWithClass } from '../../helpers/divWithClass';
import { ButtonCard, ButtonCardType } from './buttonCard/buttonCard';
import './informationCard.css';

const InformationCardContent  = divWithClass('information-card-content');

interface InformationCardProps {
    topic: string;
    source: string;
    title: string;
    description: string;
}

export class InformationCard extends React.Component<InformationCardProps, any> {

    @observable stringMaxLength: number;

    constructor(props:any) {
        super(props);
        this.stringMaxLength = 130;
    }

    @action('handle onClick')
    onClickExpand = () => {
        this.stringMaxLength = 700;
    };

    @action('bookmark card')
    onClickBookmark = () => {
        // STORE
    };

    @action('delete card')
    onClickDelete = () => {
        // UNMOUNT
        // GENERATE DELETED OBJECT (UNDO) BANNER
    };

    render() {
        return(
            <div className="information-card">
                <span onClick={this.onClickExpand}>
                    <InformationCardHeader topic={this.props.topic} source={this.props.source}/>
                    <InformationCardContent>
                        <h5>
                            {this.props.title}
                        </h5>
                        <p>
                            {this.props.description.substr(0, this.stringMaxLength) + '...'}
                        </p>
                    </InformationCardContent>
                </span>

                <span onClick={this.onClickBookmark}>
                     <ButtonCard buttonType={ButtonCardType.Bookmark}/>
                </span>

                <span onClick={this.onClickDelete}>
                    <ButtonCard buttonType={ButtonCardType.Delete}/>
                </span>
            </div>
        );
    }
}