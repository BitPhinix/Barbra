import './bookmarks.css';
import * as React from 'react';
import {render} from 'react-dom';
import 'bootstrap-grid/dist/grid.css';
import {observer} from 'mobx-react';
import {ThemesList} from "./themesList/themesList";
import { Greeting } from './greeting/greeting';
import BookmarksInformationCardContainer from "./bookmarksInformationCardContainer/bookmarksInformationCardContainer";
import * as BackDispatcher from '../inject/backDispatcher';
import { SidebarStore } from '../inject/stores/sidebar';
import { action } from 'mobx';
import {UserStore} from "../inject/stores/user";

@observer
class Bookmarks extends React.Component< {store: SidebarStore, user: UserStore}, {}> {

    private greeting: Greeting = new Greeting("Test");
    private bookmarksInformationCardContainer: BookmarksInformationCardContainer = new BookmarksInformationCardContainer(this.props.user.userBookmarks);

    constructor(props) {
        super(props);
        // BackDispatcher.addListener("return_bookmarks", message:  => );
    }

    @action('update onChange')
    onThemesListChangeUpdate = () => {
        if (this.props.store.isThemesListSelected) {
            this.greeting.setTheme(this.props.store.themesListSelectedTheme);
            this.bookmarksInformationCardContainer.filterContentBookmarks(this.props.store.themesListSelectedTheme, this.props.user.userBookmarks); //TODO
        }
    }

    render() {
        return (
            <div id={"bookmark-base"}>
                <div id={"bookmark-header"}>{this.greeting.render()}</div>
                <div id={"bookmark-container"}>
                    <div className="row">
                        <div className="col-md-4" onChange={this.onThemesListChangeUpdate}>
                            <ThemesList themes={this.props.user.userThemes} store={this.props.store}/>
                        </div>
                        <div className={"col-md-8" + this.props.store.isThemesListSelected ? '' : 'invisible'} >
                            {this.bookmarksInformationCardContainer.render()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let store: SidebarStore = new SidebarStore();
let userStore: UserStore = new UserStore();

render(<Bookmarks store={store} user={userStore}/>, document.getElementById("react-base"));
