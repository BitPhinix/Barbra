import './bookmarks.css';
import * as React from 'react';
import {render} from 'react-dom';
import {ThemesList} from '../inject/components/themesList/themesList';
import { InformationCard } from '../inject/components/informationCard/informationCard';
import { Greeting } from './greeting/greeting';
import 'bootstrap-grid/dist/grid.css';
import {observer} from 'mobx-react';
import {action} from "mobx";

interface UserModel {
    firstName: string;
    bookmarks: InformationCard[];
    bookmarkedThemes: string[];
}

const fakearray = [ {
    theme: "React",
    source: "Medium",
    title: "Awesome",
    description: "Hi there"
},
    {
        theme: "React",
        source: "Medium",
        title: "Awesome",
        description: "Hi there"
    },
    {
        theme: "React",
        source: "Medium",
        title: "Awesome",
        description: "Hi there"
    }
];

@observer
class Bookmarks extends React.Component<UserModel, any> {

    private themesList : ThemesList = new ThemesList(this.props.bookmarkedThemes);

    @action('display bookmarks on selected team')
    onClickDisplayFilteredBookmarks = (theme) => {
        const matches = this.props.bookmarks.theme == theme;
        const filteredBookmarks = this.props.bookmarks.filter(matches);
        const displayFilteredBookmarks = filteredBookmarks.map((value: InformationCard, index: number) => {
        )}
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-12">
                    <div className="row">
                        <Greeting firstName={this.props.firstName}
                                  isThemeSelected={this.themesList.isSelected}
                                  selectedTheme={this.themesList.selectedTheme}/>
                    </div>
                </div>

                <div className="col-md-4">
                    {this.themesList.render()}
                </div>

                <div className="col-md-8">
                    <div className="row">
                        {/* this.props.bookmarks.map((value: InformationCard, index: number) =>
                            <div className="col-md-6">
                                <span key={index}>
                                    {value}
                                </span>
                            </div>
                        )*/}
                    </div>
                </div>
            </div>
        );
    }
}

render(<Bookmarks firstName={"Gabriel"} bookmarkedThemes={['React', 'Gabriel Studies']} bookmarks={fakearray}/>, document.getElementById("react-base"));
