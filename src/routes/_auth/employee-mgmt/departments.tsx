import {createFileRoute} from '@tanstack/react-router'
import type {Department, DepartmentData} from "@/types/employee.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Plus, Trash, Users, UserCircle, Mail} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {dummyEmployees} from "@/data/dummy-employees";

export const Route = createFileRoute('/_auth/employee-mgmt/departments')({
    component: RouteComponent,
})

// In a real app, this would come from an API
const initialDepartments: DepartmentData[] = [
    {
        id: '1',
        name: 'Engineering' as Department,
        description: 'Software development and technical operations',
        employeeCount: 15,
        manager: {
            id: '1',
            name: 'Mike Brown',
            title: 'Engineering Manager',
            email: 'mike.brown@company.com',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
        }
    },
    {
        id: '2',
        name: 'HR' as Department,
        description: 'Human resources and employee relations',
        employeeCount: 8,
        manager: {
            id: '2',
            name: 'David Miller',
            title: 'HR Manager',
            email: 'david.miller@company.com',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
        }
    },
    {
        id: '3',
        name: 'Marketing' as Department,
        description: 'Marketing and brand management',
        employeeCount: 12,
        manager: {
            id: '3',
            name: 'Sarah Connor',
            title: 'Marketing Director',
            email: 'sarah.connor@company.com',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
        }
    },
    {
        id: '4',
        name: 'Sales' as Department,
        description: 'Sales and business development',
        employeeCount: 20,
        manager: {
            id: '4',
            name: 'Tom Harris',
            title: 'Sales Director',
            email: 'tom.harris@company.com',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom'
        }
    },
    {
        id: '5',
        name: 'Finance' as Department,
        description: 'Financial operations and accounting',
        employeeCount: 10,
        manager: {
            id: '5',
            name: 'Lisa Chen',
            title: 'Finance Manager',
            email: 'lisa.chen@company.com',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
        }
    },
    {
        id: '6',
        name: 'Operations' as Department,
        description: 'Business operations and management',
        employeeCount: 18,
        manager: {
            id: '6',
            name: 'James Wilson',
            title: 'Operations Director',
            email: 'james.wilson@company.com',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
        }
    },
];

function RouteComponent() {
    const [departments, setDepartments] = useState<DepartmentData[]>(initialDepartments);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<DepartmentData | null>(null);
    const [newDepartment, setNewDepartment] = useState<Partial<DepartmentData>>({
        employeeCount: 0
    });

    // Get all employees for manager selection
    const availableManagers = dummyEmployees.filter(emp =>
        emp.jobTitle.toLowerCase().includes('manager') ||
        emp.jobTitle.toLowerCase().includes('director')
    );

    const handleAddDepartment = () => {
        if (!newDepartment.name || !newDepartment.description) return;

        const department: DepartmentData = {
            id: Date.now().toString(),
            name: newDepartment.name as Department,
            description: newDepartment.description,
            employeeCount: 0,
            manager: newDepartment.manager
        };

        setDepartments([...departments, department]);
        setNewDepartment({employeeCount: 0});
        setIsAddDialogOpen(false);
    };

    const handleEditDepartment = () => {
        if (!editingDepartment) return;

        const updatedDepartments = departments.map(dept =>
            dept.id === editingDepartment.id ? editingDepartment : dept
        );

        setDepartments(updatedDepartments);
        setEditingDepartment(null);
        setIsEditDialogOpen(false);
    };

    const handleDeleteDepartment = (id: string) => {
        setDepartments(departments.filter(dept => dept.id !== id));
    };

    return (
        <div className="container mx-auto p-4 space-y-4">
            <div className="flex justify-between items-center flex-col md:flex-row">
                <h1 className="text-2xl font-bold">Department Management</h1>
                <Button onClick={() => setIsAddDialogOpen(true)} className="w-full md:w-1/6">
                    <Plus className="h-4 w-4 mr-2"/>
                    Add Department
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((department) => (
                    <Card key={department.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>{department.name}</CardTitle>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setEditingDepartment(department);
                                            setIsEditDialogOpen(true);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4"/>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteDepartment(department.id)}
                                    >
                                        <Trash className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                            <CardDescription className="flex items-center gap-2">
                                <Users className="h-4 w-4"/>
                                {department.employeeCount} employees
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col gap-4">
                            <p className="text-sm text-muted-foreground">{department.description}</p>

                            {department.manager && (
                                <div className="mt-4 p-4 bg-muted rounded-lg">
                                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                                        <UserCircle className="h-4 w-4"/>
                                        Department Manager
                                    </h3>
                                    <div className="flex items-start gap-3">
                                        <Avatar>
                                            <AvatarImage src={department.manager.profileImage}/>
                                            <AvatarFallback>
                                                {department.manager.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium">{department.manager.name}</p>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                                <Mail className="h-3 w-3"/>
                                                <span className="truncate">{department.manager.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Add Department Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Department</DialogTitle>
                        <DialogDescription>
                            Create a new department in the organization.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Department Name</Label>
                            <Input
                                id="name"
                                value={newDepartment.name || ''}
                                onChange={(e) =>
                                    setNewDepartment({...newDepartment, name: e.target.value as Department})
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={newDepartment.description || ''}
                                onChange={(e) =>
                                    setNewDepartment({...newDepartment, description: e.target.value})
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="manager">Department Manager</Label>
                            <Select
                                value={newDepartment.manager?.id}
                                onValueChange={(value) => {
                                    const selectedManager = availableManagers.find(m => m.id === value);
                                    if (selectedManager) {
                                        setNewDepartment({
                                            ...newDepartment,
                                            manager: {
                                                id: selectedManager.id,
                                                name: `${selectedManager.firstName} ${selectedManager.lastName}`,
                                                title: selectedManager.jobTitle,
                                                email: selectedManager.email,
                                                profileImage: selectedManager.profileImage
                                            }
                                        });
                                    }
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a manager"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {availableManagers.map((manager) => (
                                        <SelectItem key={manager.id} value={manager.id}>
                                            {manager.firstName} {manager.lastName} - {manager.jobTitle}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddDepartment}>Add Department</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Department Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Department</DialogTitle>
                        <DialogDescription>
                            Make changes to the department information.
                        </DialogDescription>
                    </DialogHeader>
                    {editingDepartment && (
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Department Name</Label>
                                <Input
                                    id="edit-name"
                                    value={editingDepartment.name}
                                    onChange={(e) =>
                                        setEditingDepartment({
                                            ...editingDepartment,
                                            name: e.target.value as Department,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Input
                                    id="edit-description"
                                    value={editingDepartment.description}
                                    onChange={(e) =>
                                        setEditingDepartment({
                                            ...editingDepartment,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-manager">Department Manager</Label>
                                <Select
                                    value={editingDepartment.manager?.id}
                                    onValueChange={(value) => {
                                        const selectedManager = availableManagers.find(m => m.id === value);
                                        if (selectedManager) {
                                            setEditingDepartment({
                                                ...editingDepartment,
                                                manager: {
                                                    id: selectedManager.id,
                                                    name: `${selectedManager.firstName} ${selectedManager.lastName}`,
                                                    title: selectedManager.jobTitle,
                                                    email: selectedManager.email,
                                                    profileImage: selectedManager.profileImage
                                                }
                                            });
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a manager"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableManagers.map((manager) => (
                                            <SelectItem key={manager.id} value={manager.id}>
                                                {manager.firstName} {manager.lastName} - {manager.jobTitle}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditDepartment}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}