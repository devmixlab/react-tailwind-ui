import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

export const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 10.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="7.5" r="1" fill="currentColor" />
        </svg>
    );
};
