import './bookmarks.css';
import * as React from 'react';
import {render} from 'react-dom';
import 'bootstrap-grid/dist/grid.css';
import {observer} from 'mobx-react';
import {ThemesList} from "./themesList/themesList";
import { Greeting } from './greeting/greeting';
import BookmarksInformationCardContainer from "./bookmarksInformationCardContainer/bookmarksInformationCardContainer";
import B from "../"

@observer
class Bookmarks extends React.Component {

    private greeting: Greeting = new Greeting("Test");
    private bookmarksInformationCardContainer: BookmarksInformationCardContainer = new BookmarksInformationCardContainer();

    constructor(props) {
        super(props);
        this.bookmarksInformationCardContainer.filterContentBookmarks('Json',);
    }

    render() {
        return (
            <div id={"bookmark-base"}>
                <div id={"bookmark-header"}>{this.greeting.render()}</div>
                <div id={"bookmark-container"}>
                    <div className="row">
                        <div className="col-md-4">
                            <ThemesList themes={['tammo', 'eric', 'gavri', 'tony']}/>
                        </div>
                        <div className="col-md-8">
                            {this.bookmarksInformationCardContainer.render()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

render(<Bookmarks/>, document.getElementById("react-base"));
