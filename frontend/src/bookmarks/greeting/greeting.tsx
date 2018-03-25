import * as React from 'react';
import './greeting.css';

interface GreetingProps {
    firstName: string;
    isThemeSelected: boolean;
    selectedTheme: string;
}

export function Greeting(props: GreetingProps) {

    let greeting;

    if (props.isThemeSelected) {
        greeting = 'Your ' + props.selectedTheme + ' content.';
    } else {
        greeting = 'Hi' + props.firstName + ', Welcome to Barbra';
    }

    return (
        <div className="greeting">
           <h1>
               {greeting}
           </h1>
        </div>
    );
}