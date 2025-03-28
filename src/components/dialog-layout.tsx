import React from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";

interface DialogLayoutProps {
    title?: React.ReactNode;
    children?: React.ReactNode;
    footerChildren?: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DialogLayout(
    {title, children, footerChildren, open, onOpenChange}: DialogLayoutProps
) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={"w-md overflow-y-auto max-h-screen"}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 sm:space-y-6 py-4">
                    {children}
                </div>
                <DialogFooter>
                    {footerChildren}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}