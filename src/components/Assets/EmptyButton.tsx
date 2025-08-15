import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
export default function (props: Props) {
    const { children, className, ...allProps } = props;
    return (
        <button
            className={twMerge(`bg-none border-none outline-0 hover:bg-none hover:border-none hover:outline-0`,className)}
            {...allProps}
        >
            {children}
        </button>
    )
}
