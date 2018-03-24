import "./sidebar.css";
import * as React from "react";
import {observer} from "mobx-react";
import {SidebarStore} from "../stores/sidebar";
import { InformationCard } from './informationCard/informationCard';

@observer
export default class Sidebar extends React.Component<{
    store: SidebarStore
}, {}> {

    public reference: HTMLElement;

    constructor(props){
        super(props)
        this.props = props;

        //If clicked outside the sidebar close it
        window.addEventListener("click", (event) => {
            if (!this.reference.contains(event.target as Node)) {
                this.props.store.visible = false;
            }
        });
    }

    render() {
        return(
            <div ref={(node) => this.reference = node}id={"injected-sidebar"} className={this.props.store.visible ? "opened" : "closed"}>
                {this.props.store.state}

                <InformationCard source={'http://logok.org/wp-content/uploads/2015/10/Medium-logo-2015-640x480.png'} description={'Much of what we do at work and at school today is not learning itself, but rather searching for what we need to learn. Barbra will automate that process. We want to make learning more approachable so people can learn faster and each can enjoy its pleasure without the stress and barriers of not knowing where to go next.\n' +
                '\n' +
                'Named after a great teacher I had in high school, Barbra should have a role similar to that of a teacher: instruct, guide and inspire.\n' +
                '\n' +
                '## What it does\n' +
                '\n' +
                'Barbra makes suggestions of what you need to learn next based on what you\'re currently reading or writing; it filters keywords using sophisticated NLP techniques out of your conversations and web content and makes smart recommendations of how you could acquire deeper knowledge on extracted topics.\n' +
                '\n' +
                'Concretely, Barbra is a chrome extension. It is a sidebar available throughout your browser which releases information in form of cards as you read a page or write into a chat platform like Slack. With Barbra knowledge comes to you and you do not even need to do anything.\n' +
                '\n' +
                '## How we built it\n' +
                '\n' +
                'Barbra is powered by a stark natural language algorithm designed in-house by Tornike, the computational linguist in the team. The algorithm calculates significance scores of phrases in a text and chooses important keyphrases accordingly. The algorithm was written in Python using the NLTK library. We also built the chrome extension in React.js using Typescript and Mobx. Our backend is powered by Go.\n' +
                '\n' +
                '## Challenges we ran into\n' +
                '\n' +
                'The algorithm is non-trivial'} title={'How to make an awesome learning app'} topic={'React'}/>
            </div>
        );
    }
}