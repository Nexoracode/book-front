import clsx from 'clsx';
import React from 'react';

export default function ContainerLayout(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    var { children, className } = props;
    return (
        <div className={clsx('w-[95%] max-w-screen-xl mx-auto',className)}>{children}</div>
    )
}
