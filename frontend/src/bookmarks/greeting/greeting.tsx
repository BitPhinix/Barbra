import * as React from 'react';
import './greeting.css';

interface GreetingProps {
    surname: string;
}

export class Greeting extends React.Component<GreetingProps, any> {

    private greeting: string;

    constructor(props){
        super(props);
        this.greeting = "Hi " + this.props.surname + ", Welcome to Barbra."
    }

    public setTheme(selectedTheme: string): (selectedTheme: string) => void{
        this.greeting = 'Your ' + selectedTheme + ' content';
        return null;
    }

    render(){
        return(
            <div id={"greeting"}>
                {this.greeting}
            </div>
        );
    }
}