import {createFileRoute} from '@tanstack/react-router'
import {Lock, Mail, Pencil, PlusIcon, Shield, Trash, UserPlus} from "lucide-react";
import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import MainLayout from "@/components/main-layout.tsx";
import DialogLayout from "@/components/dialog-layout.tsx";

export const Route = createFileRoute('/_auth/access-mgmt')({
    component: RouteComponent,
})


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

function RouteComponent() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
        setIsCreateDialogOpen(false);
    };

    const handleUpdateUser = () => {
        if (!selectedUser) return;
        const updatedUsers = users.map(user =>
            user.id === selectedUser.id ? selectedUser : user
        );
        setUsers(updatedUsers);

        setSelectedUser(null);
        setIsEditDialogOpen(false);
    };

    const handleDeleteUser = (id: string) => {
        const userToDelete = users.find(user => user.id === id);
        if (userToDelete) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    return (
        <MainLayout title="User Access Management" className="lg:max-w-5xl" headerChildren={
            <Button size="default" className="w-full sm:w-auto shadow-sm"
                    onClick={() => {
                        setIsCreateDialogOpen(true);
                    }}
            >
                <PlusIcon className="h-4 w-4 mr-2"/>
                Add New User
            </Button>
        }>
            <div className="grid grid-cols gap-4">
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
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsEditDialogOpen(true);
                                            }}
                                        >
                                            <Pencil className="h-4 w-4"/>
                                        </Button>
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
            </div>

            {/* Edit Employee Dialog */}
            <DialogLayout
                open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}
                title={
                    <>
                        <UserPlus className="h-5 w-5"/>
                        Create New User
                    </>
                }
                footerChildren={
                    <>
                        <Button className="w-full shadow-sm" onClick={handleCreateUser}>
                            Create User
                        </Button>
                    </>
                }
            >
                <>
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
                </>
            </DialogLayout>

            {/* Update Employee Dialog */}
            <DialogLayout
                open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}
                title={
                    <>
                        <Pencil className="h-5 w-5"/>
                        Edit User
                    </>
                }
                footerChildren={
                    <>
                        <Button className="w-full shadow-sm"
                                onClick={handleUpdateUser}>
                            Update User
                        </Button>
                    </>
                }
            >
                <>
                    {selectedUser && (
                        <>
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
                        </>
                    )}
                </>
            </DialogLayout>
        </MainLayout>
    )
        ;
}