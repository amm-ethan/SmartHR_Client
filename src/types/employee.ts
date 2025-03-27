export type Department = 'Engineering' | 'HR' | 'Marketing' | 'Sales' | 'Finance' | 'Operations';

export type JobTitle = 'Software Engineer' | 'HR Manager' | 'Marketing Specialist' | 'Sales Representative' | 'Financial Analyst' | 'Operations Manager';

export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    employeeId: string;
    department: Department;
    jobTitle: JobTitle;
    startDate: string;
    workHistory: WorkHistory[];
    documents: Document[];
    profileImage?: string;
}

export interface DepartmentData {
    id: string;
    name: Department;
    description: string;
    manager?: {
        id: string;
        name: string;
        title: string;
        email: string;
        profileImage?: string;
    };
    employeeCount: number;
}

export interface WorkHistory {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
}

export interface Document {
    id: string;
    name: string;
    type: 'contract' | 'certification' | 'immigration' | 'other';
    uploadDate: string;
    url: string;
} 