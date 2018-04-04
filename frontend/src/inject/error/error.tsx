import * as React from 'react';
import './buttonCard.css';

export enum ErrorType {
    error_500 = 'We are sorry, an unexpected error has occurred. Please try again',
    account_already_in_use = 'Sorry, this e-mail is already in use. Would you like to log in?',
}

interface ErrorProps {
    errorType: ErrorType;
}

export function Error(props: ErrorProps) {

    const label = props.errorType;

    return (
        <div id="error">
            <h5>
                { label }
            </h5>
        </div>
    );
}
