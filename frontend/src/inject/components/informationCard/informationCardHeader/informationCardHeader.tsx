import * as React from 'react';
import './informationCardHeader.css';

interface InformationCardHeaderProps {
    theme: string;
    source: string;
}

export function InformationCardHeader(props: InformationCardHeaderProps) {

    return (
        <div className='information-card-header'>
            <div className="text-12">
                {props.theme}
                <div className='information-card-header-img'>
                    <img src={'../../../static/sourceIcons/' + props.source + '.png'} className="information-card-header-img-img"/>
                </div>
            </div>
        </div>
    );
}
