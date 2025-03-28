import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";

interface DialogLayoutProps {
    title?: React.ReactNode;
    dialogTrigger?: React.ReactNode;
    children?: React.ReactNode;

}

export default function DialogLayout(
    {title, dialogTrigger, children,}: DialogLayoutProps
) {
    return (
        <Dialog>
            {dialogTrigger}
            <DialogContent className={"w-md overflow-y-auto max-h-screen"}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 sm:space-y-6 py-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}