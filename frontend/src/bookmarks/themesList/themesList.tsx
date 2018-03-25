import * as React from 'react';
import { divWithClass } from '../../inject/helpers/divWithClass';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import './themesList.css';

const ThemesListHeader = divWithClass('themes-list-header');
const ThemesListContent = divWithClass('themes-list-content');

interface ThemesListProps {
    themes: string[];
}

@observer
export class ThemesList extends React.Component<ThemesListProps, any> {

    @observable activeIndex: number;
    @observable isSelected: boolean;
    @observable selectedTheme: string;

    constructor(props) {
        super(props);
    }

    @action('select item')
    selectItem = (index: number) => {
        this.activeIndex = index;
        this.selectedTheme = this.props.themes[index];
        this.isSelected = true;
    };


    render() {
        return (
            <div className="themes-list">
                <ThemesListHeader>
                    Your Themes
                </ThemesListHeader>

                <ThemesListContent>
                    <ul>
                        {this.props.themes.map((theme: string, index: number) =>
                            <span onClick={() => this.selectItem(index)}>
                                <ThemesListItem key={index} active={index === this.activeIndex}>
                                    {theme}
                                </ThemesListItem>
                            </span>
                        )}
                    </ul>
                </ThemesListContent>

            </div>
        );
    }
}

interface ThemesListItemProps {
    active: boolean;
    children?: any;
}

function ThemesListItem(props: ThemesListItemProps) {

    return (
        <li className={props.active ? 'selected' : null}>
            {props.children}
        </li>
    );
}
