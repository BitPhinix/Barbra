import * as React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import './buttonCard.css';

export enum ButtonCardType {
    Delete = 'btn btn-card-right',
    Bookmark = ' btn-card-left',
}

interface ButtonCardProps {
    buttonType: ButtonCardType;
}

@observer
export class ButtonCard extends React.Component<ButtonCardProps, any> {

    @observable isSelected: boolean;

    constructor(props:any) {
        super(props);
        this.isSelected = false;
    }

    @action('handle Click')
    handleClick = () => {
        this.isSelected = !this.isSelected;
    };

    render() {

        let label;
        let selected = '';

        if (this.props.buttonType === ButtonCardType.Bookmark && this.isSelected) {
            label = 'Bookmarked';
            selected = 'selected';
        } else {
            label = 'Bookmark'
        }

        if (this.props.buttonType === ButtonCardType.Delete) {
            label = 'Delete';
        }

    return (
        <div className={ this.props.buttonType + ' ' + selected} onClick={this.handleClick}>
            { label }
        </div>
    );
    }
}
