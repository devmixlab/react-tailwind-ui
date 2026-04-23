import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export const WarningIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M12 3l9 16H3l9-16z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="miter"
            />
            <path d="M12 9.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="16.8" r="1" fill="currentColor" />
        </svg>
    );
};
