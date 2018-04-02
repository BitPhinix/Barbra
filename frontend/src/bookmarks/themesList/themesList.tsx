import * as React from 'react';
import { divWithClass } from '../../inject/helpers/divWithClass';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import './themesList.css';
import { SidebarStore } from '../../inject/stores/sidebar';

const ThemesListHeader = divWithClass('themes-list-header');
const ThemesListContent = divWithClass('themes-list-content');

@observer
export class ThemesList extends React.Component<{
    themes: string[],
    store: SidebarStore
}, {}> {

    @observable activeIndex: number;

    constructor(props) {
        super(props);
    }

    @action('select item')
    selectItem = (index: number) => {
        this.activeIndex = index;
        this.props.store.themesListSelectedTheme = this.props.themes[index];
        this.props.store.isThemesListSelected = true;
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
