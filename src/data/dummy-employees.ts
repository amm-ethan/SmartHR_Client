import type { Employee } from '@/types/employee';

export const dummyEmployees: Employee[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        employeeId: 'EMP001',
        department: 'Engineering',
        jobTitle: 'Software Engineer',
        startDate: '2022-01-15',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        workHistory: [
            {
                id: 'wh1',
                company: 'Tech Corp',
                position: 'Junior Developer',
                startDate: '2020-03-01',
                endDate: '2021-12-31',
                description: 'Worked on various web development projects'
            }
        ],
        documents: [
            {
                id: 'doc1',
                name: 'Employment Contract',
                type: 'contract',
                uploadDate: '2022-01-15',
                url: '/documents/contract-john-doe.pdf'
            }
        ]
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@company.com',
        phone: '+1 (555) 987-6543',
        employeeId: 'EMP002',
        department: 'HR',
        jobTitle: 'HR Manager',
        startDate: '2021-06-01',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        workHistory: [
            {
                id: 'wh2',
                company: 'HR Solutions',
                position: 'HR Specialist',
                startDate: '2018-07-01',
                endDate: '2021-05-31',
                description: 'Managed employee relations and recruitment'
            }
        ],
        documents: [
            {
                id: 'doc2',
                name: 'HR Certification',
                type: 'certification',
                uploadDate: '2021-06-01',
                url: '/documents/certification-jane-smith.pdf'
            }
        ]
    },
    {
        id: '3',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@company.com',
        phone: '+1 (555) 456-7890',
        employeeId: 'EMP003',
        department: 'Marketing',
        jobTitle: 'Marketing Specialist',
        startDate: '2023-01-10',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        workHistory: [
            {
                id: 'wh3',
                company: 'Marketing Pro',
                position: 'Marketing Coordinator',
                startDate: '2021-02-01',
                endDate: '2022-12-31',
                description: 'Developed and executed marketing campaigns'
            }
        ],
        documents: [
            {
                id: 'doc3',
                name: 'Marketing Certificate',
                type: 'certification',
                uploadDate: '2023-01-10',
                url: '/documents/certification-michael-johnson.pdf'
            }
        ]
    }
]; 