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
                <div className='information-card-header-img'>
                    <img src={props.source} className="information-card-header-img-img"/>
                </div>
            </div>
        </div>
    );
}
