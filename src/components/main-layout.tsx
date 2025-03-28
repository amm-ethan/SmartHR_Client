import React from "react";
import {clsx} from "clsx";

interface MainLayoutProps {
    title?: string;
    headerChildren?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export default function MainLayout(
    { title, headerChildren, children , className}: MainLayoutProps
) {
    return (
        <div className={clsx("mx-auto space-y-4 max-w-full", className)}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h1 className="text-2xl font-bold w-full md:w-1/2">{title}</h1>
                {headerChildren}
            </div>
            {children}
        </div>
    )
}