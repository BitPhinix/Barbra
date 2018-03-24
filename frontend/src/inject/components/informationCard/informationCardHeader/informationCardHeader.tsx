import * as React from 'react';
import './informationCardHeader.css';

interface InformationCardHeaderProps {
    topic: string;
    source: string;
}

export function InformationCardHeader(props: InformationCardHeaderProps) {

    return (
        <div className='information-card-header'>
            <div className="text-12">
                {props.topic}
            </div>
            <div className="information-card-header-image-div">
                <img src={props.source}/>
            </div>
        </div>
    );
}
