import './bookmarks.css';
import * as React from 'react';
import {render} from 'react-dom';
import {ThemesList} from '../inject/components/themesList/themesList';
import {InformationCard} from '../inject/components/informationCard/informationCard';
import { Greeting } from './greeting/greeting';
import 'bootstrap-grid/dist/grid.css';
import {observer} from 'mobx-react';


interface UserModel {
    firstName: string;
    bookmarks: InformationCard[];
    bookmarkedThemes: string[];
}

@observer()
class Bookmarks extends React.Component<UserModel, {}> {

    private themesList : ThemesList = new ThemesList(this.props.bookmarkedThemes);

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
                        { this.props.bookmarks.map((index: number, bookmark: InformationCard) =>
                            <div className="col-md-6">
                                <span key={index}>
                                    {bookmark}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

render(<Bookmarks/>, document.getElementById("react-base"));
