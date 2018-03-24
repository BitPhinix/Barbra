import * as React from 'react';
import { action, observable } from 'mobx';
import { InformationCardHeader } from './informationCardHeader/informationCardHeader';
import { divWithClass } from '../../helpers/divWithClass';
import { ButtonCard, ButtonCardType } from './buttonCard/buttonCard';
import './informationCard.css';
import {observer} from 'mobx-react';

const InformationCardContent  = divWithClass('information-card-content');

interface InformationCardProps {
    topic: string;
    source: string;
    title: string;
    description: string;
}

@observer
export class InformationCard extends React.Component<InformationCardProps, any> {

    @observable isHovering: boolean;
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

    @action('display buttons on hover')
    onHoverDisplayButtons = () =>  {
        this.isHovering = !this.isHovering;
    };

    render() {

        let buttons;

        if(this.isHovering) {
            buttons = <span className="button-card-span-parent">
                         <span onClick={this.onClickBookmark} className="button-card-span-left">
                            <ButtonCard buttonType={ButtonCardType.Bookmark}/>
                         </span>

                        <span onClick={this.onClickDelete} className="button-card-span-right">
                            <ButtonCard buttonType={ButtonCardType.Delete}/>
                        </span>
                    </span>;
        } else {
            buttons = <div className="button-card-span-no-hover"/>;
        }

        return(
            <div className="information-card" onMouseEnter={this.onHoverDisplayButtons} onMouseLeave={this.onHoverDisplayButtons}>
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

                {buttons}
            </div>
        );
    }
}