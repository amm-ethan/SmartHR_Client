import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Bell, Check} from "lucide-react";
import {useState} from "react";

interface Notification {
    id: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
}

export default function NotificationBox() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            message: 'New user "admin@example.com" created',
            timestamp: new Date(),
            isRead: false
        },
        {
            id: '2',
            message: 'User "manager@example.com" role updated',
            timestamp: new Date(Date.now() - 3600000),
            isRead: false
        },
        {
            id: '3',
            message: 'User "hr@example.com" deleted',
            timestamp: new Date(Date.now() - 7200000),
            isRead: false
        }
    ]);

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({...notification, isRead: true}))
        );
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'Just now';
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5"/>
                    {unreadCount > 0 && (
                        <span
                            className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                                            {unreadCount}
                                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[300px] md:w-[380px]"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs"
                            onClick={handleMarkAllAsRead}
                        >
                            <Check className="h-4 w-4 mr-1"/>
                            Mark all as read
                        </Button>
                    )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 border-b last:border-0 ${
                                    !notification.isRead ? 'bg-muted/50' : ''
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm">{notification.message}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatTimestamp(notification.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                            No notifications
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}