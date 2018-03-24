import * as React from 'react';

interface MightHaveChildrenProps {
    children?: any;
}

export function divWithClass(className: string) {
    return (props: MightHaveChildrenProps) => <div className={className}>{ props.children }</div>;
}
