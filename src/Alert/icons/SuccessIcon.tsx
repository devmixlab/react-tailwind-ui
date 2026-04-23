import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export const SuccessIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path
                d="M8.5 12.5l2.5 2.5 4.5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
