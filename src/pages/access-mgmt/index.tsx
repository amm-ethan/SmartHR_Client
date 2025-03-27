import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {PlusIcon, Pencil, Trash, UserPlus, Mail, Lock, Shield} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";


interface User {
    id: string;
    email: string;
    roles: string[];
}

const ROLES = ["Admin", "HR", "Manager", "Employee"];

const RoleIcon = {
    "Admin": Shield,
    "HR": UserPlus,
    "Manager": Shield,
    "Employee": UserPlus
};

export default function AccessMgmtPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // @ts-ignore
    const [isEditMode, setIsEditMode] = useState(false);

    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        roles: [] as string[]
    });

    const handleCreateUser = () => {
        const user: User = {
            id: Date.now().toString(),
            email: newUser.email,
            roles: newUser.roles
        };
        setUsers([...users, user]);
        setNewUser({email: "", password: "", roles: []});
    };

    const handleUpdateUser = () => {
        if (!selectedUser) return;
        const updatedUsers = users.map(user =>
            user.id === selectedUser.id ? selectedUser : user
        );
        setUsers(updatedUsers);

        setSelectedUser(null);
        setIsEditMode(false);
    };

    const handleDeleteUser = (id: string) => {
        const userToDelete = users.find(user => user.id === id);
        if (userToDelete) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    return (
        <div className="p-4 md:p-6 w-full max-w-[1400px] mx-auto">
            <Card className="w-full">
                <CardHeader
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
                    <div>
                        <CardTitle className="text-xl sm:text-2xl font-bold">User Access Management</CardTitle>
                        <CardDescription className="mt-1 sm:mt-2">Manage user access and roles for your
                            organization</CardDescription>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="default" className="w-full sm:w-auto shadow-sm">
                                    <PlusIcon className="h-4 w-4 mr-2"/>
                                    Add New User
                                </Button>
                            </DialogTrigger>
                            <DialogContent className={"w-md overflow-y-scroll max-h-screen"}>
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <UserPlus className="h-5 w-5"/>
                                        Create New User
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 sm:space-y-6 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail className="h-4 w-4"/>
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter user email"
                                            value={newUser.email}
                                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="flex items-center gap-2">
                                            <Lock className="h-4 w-4"/>
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter secure password"
                                            value={newUser.password}
                                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="flex items-center gap-2">
                                            <Shield className="h-4 w-4"/>
                                            Roles
                                        </Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {ROLES.map((role) => (
                                                <div key={role}
                                                     className="flex items-center space-x-3 rounded-lg border p-3 ">
                                                    <Checkbox
                                                        id={role}
                                                        checked={newUser.roles.includes(role)}
                                                        onCheckedChange={(checked: boolean) => {
                                                            if (checked) {
                                                                setNewUser({
                                                                    ...newUser,
                                                                    roles: [...newUser.roles, role]
                                                                });
                                                            } else {
                                                                setNewUser({
                                                                    ...newUser,
                                                                    roles: newUser.roles.filter((r) => r !== role),
                                                                });
                                                            }
                                                        }}
                                                    />
                                                    <Label htmlFor={role}
                                                           className="flex items-center gap-2 cursor-pointer">
                                                        {React.createElement(RoleIcon[role as keyof typeof RoleIcon], {className: "h-4 w-4"})}
                                                        {role}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Button className="w-full shadow-sm" onClick={handleCreateUser}>
                                        Create User
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="rounded-lg border overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                            <tr className="bg-muted/50 border-b">
                                <th className="text-left font-medium text-muted-foreground p-3 sm:p-4">Email</th>
                                <th className="text-left font-medium text-muted-foreground p-3 sm:p-4">Roles</th>
                                <th className="text-right font-medium text-muted-foreground p-3 sm:p-4">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y">
                            {users.map((user) => (
                                <tr key={user.id} className="bg-card hover:bg-muted/50 transition-colors">
                                    <td className="p-3 sm:p-4">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground"/>
                                            <span className="truncate">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 sm:p-4">
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {user.roles.map((role) => (
                                                <span
                                                    key={role}
                                                    className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md bg-primary/10 px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-primary"
                                                >
                                                    {React.createElement(RoleIcon[role as keyof typeof RoleIcon], {className: "h-3 w-3 sm:h-3.5 sm:w-3.5"})}
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-3 sm:p-4">
                                        <div className="flex justify-end gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setIsEditMode(true);
                                                        }}
                                                    >
                                                        <Pencil className="h-4 w-4"/>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className={"w-md overflow-y-scroll max-h-screen"}>
                                                    <DialogHeader>
                                                        <DialogTitle className="flex items-center gap-2">
                                                            <Pencil className="h-5 w-5"/>
                                                            Edit User
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    {selectedUser && (
                                                        <div className="space-y-4 sm:space-y-6 py-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit-email"
                                                                       className="flex items-center gap-2">
                                                                    <Mail className="h-4 w-4"/>
                                                                    Email
                                                                </Label>
                                                                <Input
                                                                    id="edit-email"
                                                                    type="email"
                                                                    value={selectedUser.email}
                                                                    onChange={(e) =>
                                                                        setSelectedUser({
                                                                            ...selectedUser,
                                                                            email: e.target.value,
                                                                        })
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-3">
                                                                <Label className="flex items-center gap-2">
                                                                    <Shield className="h-4 w-4"/>
                                                                    Roles
                                                                </Label>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                    {ROLES.map((role) => (
                                                                        <div key={role}
                                                                             className="flex items-center space-x-3 rounded-lg border p-3">
                                                                            <Checkbox
                                                                                id={`edit-${role}`}
                                                                                checked={selectedUser.roles.includes(role)}
                                                                                onCheckedChange={(checked: boolean) => {
                                                                                    if (checked) {
                                                                                        setSelectedUser({
                                                                                            ...selectedUser,
                                                                                            roles: [...selectedUser.roles, role],
                                                                                        });
                                                                                    } else {
                                                                                        setSelectedUser({
                                                                                            ...selectedUser,
                                                                                            roles: selectedUser.roles.filter(
                                                                                                (r) => r !== role
                                                                                            ),
                                                                                        });
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <Label htmlFor={`edit-${role}`}
                                                                                   className="flex items-center gap-2 cursor-pointer">
                                                                                {React.createElement(RoleIcon[role as keyof typeof RoleIcon], {className: "h-4 w-4"})}
                                                                                {role}
                                                                            </Label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <Button className="w-full shadow-sm"
                                                                    onClick={handleUpdateUser}>
                                                                Update User
                                                            </Button>
                                                        </div>
                                                    )}
                                                </DialogContent>
                                            </Dialog>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="shadow-sm"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                <Trash className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-4 text-center text-muted-foreground">
                                        No users found. Click "Add New User" to create one.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}