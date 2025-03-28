import {createFileRoute} from '@tanstack/react-router'
import type {Department, Employee} from "@/types/employee.ts";
import {useState} from "react";
import {dummyEmployees} from "@/data/dummy-employees.ts";
import {Briefcase, Building2, Calendar, FileText, Mail, Pencil, Phone, FileUp, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import MainLayout from "@/components/main-layout.tsx";

export const Route = createFileRoute('/_auth/employee-mgmt/employees')({
    component: RouteComponent,
})

const DEPARTMENTS: Department[] = ['Engineering', 'HR', 'Marketing', 'Sales', 'Finance', 'Operations'];

function RouteComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState<Department | 'all'>('all');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const filteredEmployees = dummyEmployees.filter(employee => {
        const matchesSearch = `${employee.firstName} ${employee.lastName} ${employee.employeeId}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

    const handleEditSave = () => {
        if (!editingEmployee) return;
        // In a real app, this would make an API call to update the employee
        // @ts-ignore
        const updatedEmployees = dummyEmployees.map(emp =>
            emp.id === editingEmployee.id ? editingEmployee : emp
        );
        setSelectedEmployee(editingEmployee);
        setIsEditDialogOpen(false);
    };

    return (
        <MainLayout
            title="Employee Management"
            headerChildren={
                <>
                    <div className="relative w-full lg:w-1/4">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            placeholder="Search employees..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full lg:w-1/4">
                        <Select
                            value={selectedDepartment}
                            onValueChange={(value) => setSelectedDepartment(value as Department | 'all')}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Department"/>
                            </SelectTrigger>
                            <SelectContent className="min-w-0">
                                <SelectItem value="all">All Departments</SelectItem>
                                {DEPARTMENTS.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Employee List */}
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[calc(100vh-300px)]">
                            <div className="space-y-2">
                                {filteredEmployees.map((employee) => (
                                    <div
                                        key={employee.id}
                                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                            selectedEmployee?.id === employee.id
                                                ? 'bg-primary/10'
                                                : 'hover:bg-muted'
                                        }`}
                                        onClick={() => setSelectedEmployee(employee)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={employee.profileImage}/>
                                                <AvatarFallback>
                                                    {employee.firstName[0]}
                                                    {employee.lastName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate">
                                                    {employee.firstName} {employee.lastName}
                                                </div>
                                                <div className="text-sm text-muted-foreground truncate">
                                                    {employee.jobTitle}
                                                </div>
                                            </div>
                                            <Badge variant="outline">{employee.employeeId}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Employee Details */}
                <Card className="lg:col-span-8">
                    <CardContent className="p-6">
                        {selectedEmployee ? (
                            <div className="flex flex-col justify-center gap-4">
                                <div className="flex items-center justify-center ">
                                    <Avatar className="w-20 h-20">
                                        <AvatarImage src={selectedEmployee.profileImage}/>
                                        <AvatarFallback className="text-xl">
                                            {selectedEmployee.firstName[0]}
                                            {selectedEmployee.lastName[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-bold">
                                            {selectedEmployee.firstName} {selectedEmployee.lastName}
                                        </h2>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Briefcase className="h-4 w-4"/>
                                            {selectedEmployee.jobTitle}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="min-w-1/2"
                                        onClick={() => {
                                            setEditingEmployee(selectedEmployee);
                                            setIsEditDialogOpen(true);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4 mr-2"/>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="min-w-1/2"
                                        onClick={() => {
                                            setEditingEmployee(selectedEmployee);
                                            setIsEditDialogOpen(true);
                                        }}
                                    >
                                        <FileUp className="h-4 w-4 mr-2"/>
                                        Upload Documents
                                    </Button>
                                </div>
                                <Tabs defaultValue="details" className="space-y-4 w-full">
                                    <TabsList className="w-full">
                                        <TabsTrigger value="details">Details</TabsTrigger>
                                        <TabsTrigger value="work-history">Work History</TabsTrigger>
                                        <TabsTrigger value="documents">Documents</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="details" className="space-y-4">
                                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Contact Information</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-muted-foreground"/>
                                                        {selectedEmployee.email}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4 text-muted-foreground"/>
                                                        {selectedEmployee.phone}
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Employment Details</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="h-4 w-4 text-muted-foreground"/>
                                                        {selectedEmployee.department}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground"/>
                                                        Started {new Date(selectedEmployee.startDate).toLocaleDateString()}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="work-history" className="space-y-4">
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                            {selectedEmployee.workHistory.map((history) => (
                                                <Card key={history.id}>
                                                    <CardHeader>
                                                        <CardTitle>{history.position}</CardTitle>
                                                        <CardDescription>{history.company}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-sm text-muted-foreground">
                                                            {new Date(history.startDate).toLocaleDateString()} -{' '}
                                                            {history.endDate
                                                                ? new Date(history.endDate).toLocaleDateString()
                                                                : 'Present'}
                                                        </div>
                                                        <p className="mt-2">{history.description}</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="documents" className="space-y-4">
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                            {selectedEmployee.documents.map((document) => (
                                                <Card key={document.id}>
                                                    <CardHeader
                                                        className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                        <div className="space-y-1">
                                                            <CardTitle>{document.name}</CardTitle>
                                                            <CardDescription>
                                                                Uploaded
                                                                on {new Date(document.uploadDate).toLocaleDateString()}
                                                            </CardDescription>
                                                        </div>
                                                        <Button variant="outline" size="sm">
                                                            <FileText className="h-4 w-4 mr-2"/>
                                                            View
                                                        </Button>
                                                    </CardHeader>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>

                            </div>
                        ) : (
                            <div
                                className="h-[calc(100vh-300px)] flex items-center justify-center text-muted-foreground">
                                Select an employee to view details
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Edit Employee Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Employee</DialogTitle>
                        <DialogDescription>
                            Make changes to the employee information below.
                        </DialogDescription>
                    </DialogHeader>
                    {editingEmployee && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={editingEmployee.firstName}
                                        onChange={(e) =>
                                            setEditingEmployee({
                                                ...editingEmployee,
                                                firstName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={editingEmployee.lastName}
                                        onChange={(e) =>
                                            setEditingEmployee({
                                                ...editingEmployee,
                                                lastName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={editingEmployee.email}
                                    onChange={(e) =>
                                        setEditingEmployee({
                                            ...editingEmployee,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Select
                                    value={editingEmployee.department}
                                    onValueChange={(value) =>
                                        setEditingEmployee({
                                            ...editingEmployee,
                                            department: value as Department,
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select department"/>
                                    </SelectTrigger>
                                    <SelectContent className="min-w-0">
                                        {DEPARTMENTS.map((dept) => (
                                            <SelectItem key={dept} value={dept}>
                                                {dept}
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
                        <Button onClick={handleEditSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </MainLayout>

    )
        ;
}