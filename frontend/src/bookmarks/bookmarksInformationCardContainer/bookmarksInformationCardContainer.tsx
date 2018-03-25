import * as React from 'react';
import {InformationCard} from "../../inject/components/informationCard/informationCard";

export default class BookmarksInformationCardContainer extends React.Component<{}, {
    contentCards: JSX.Element[]
}> {

    constructor(props){
        super(props);
        this.state = {
            contentCards: []
        };
    }

    public filterContentBookmarks(theme:string, allCards: InformationCard[]){

        let renderedCards: JSX.Element[] = [];
        for(let i: number = 0; i < allCards.length; i++){
            if(allCards[i].props.theme == theme)
                renderedCards[i] =
                    <div className="col-md-6">
                        {allCards[i].render()}
                    </div>;
        }

        this.setState({
            contentCards: renderedCards
        });
    }

    render(){
        return(
            <div id={"bookmarksInformationCardContainer"}>
                <div className="col-md-6">
                    {this.state.contentCards}
                </div>
            </div>
        );
    }
}