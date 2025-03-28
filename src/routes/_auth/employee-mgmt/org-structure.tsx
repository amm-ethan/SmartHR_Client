import {createFileRoute} from '@tanstack/react-router'
import React, {useState, useCallback, useEffect} from "react";
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    ConnectionMode,
    Handle, Position,
} from '@xyflow/react';
import type {Node, Edge} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus,} from "lucide-react";
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

export const Route = createFileRoute('/_auth/employee-mgmt/org-structure')({
    component: RouteComponent,
})

interface OrgNode {
    id: string;
    name: string;
    title: string;
    children: OrgNode[];
}


interface EmployeeNodeData extends Record<string, unknown> {
    name: string;
    title: string;
    image?: string;
}


// Custom node component
function CustomNode({data}: { data: { name: string; title: string; image?: string } }) {
    return (
        <>
            <Handle type="target" position={Position.Top}/>
            <Card className="w-[160px] sm:w-[200px] border-2">
                <CardHeader className="p-2 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`}/>
                            <AvatarFallback>{data.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <CardTitle className="text-xs sm:text-sm font-medium truncate">{data.name}</CardTitle>
                            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{data.title}</p>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <Handle type="source" position={Position.Bottom} />
        </>
    );
}

// In a real app, this would come from an API
const initialOrgStructure: OrgNode = {
    id: '1',
    name: 'John Smith',
    title: 'CEO',
    children: [
        {
            id: '2',
            name: 'Sarah Johnson',
            title: 'CTO',
            children: [
                {
                    id: '5',
                    name: 'Mike Brown',
                    title: 'Engineering Manager',
                    children: []
                },
                {
                    id: '6',
                    name: 'Lisa Davis',
                    title: 'Product Manager',
                    children: []
                }
            ]
        },
        {
            id: '3',
            name: 'James Wilson',
            title: 'CFO',
            children: [
                {
                    id: '7',
                    name: 'Tom Harris',
                    title: 'Finance Manager',
                    children: []
                }
            ]
        },
        {
            id: '4',
            name: 'Emily White',
            title: 'HR Director',
            children: [
                {
                    id: '8',
                    name: 'David Miller',
                    title: 'HR Manager',
                    children: []
                }
            ]
        }
    ]
};

// Convert org structure to React Flow nodes and edges
function convertOrgStructureToFlow(orgStructure: OrgNode, parentX = 0, level = 0, nodes: Node[] = [], edges: Edge[] = []): {
    nodes: Node[];
    edges: Edge[]
} {
    // Responsive node dimensions and spacing
    const nodeWidth = typeof window !== 'undefined' && window.innerWidth < 640 ? 160 : 200;
    const nodeHeight = typeof window !== 'undefined' && window.innerWidth < 640 ? 70 : 90;
    const verticalSpacing = typeof window !== 'undefined' && window.innerWidth < 640 ? 60 : 100;
    const horizontalSpacing = typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 250;

    // Calculate x position based on siblings
    const getSiblingCount = (node: OrgNode) => {
        return node.children.length;
    };

    const siblingCount = getSiblingCount(orgStructure);
    const totalWidth = siblingCount * (nodeWidth + horizontalSpacing);
    const startX = parentX - totalWidth / 2 + nodeWidth / 2;

    // Create node
    nodes.push({
        id: orgStructure.id,
        position: {x: parentX, y: level * (nodeHeight + verticalSpacing)},
        data: {name: orgStructure.name, title: orgStructure.title},
        type: 'custom',
    });

    // Process children
    orgStructure.children.forEach((child, index) => {
        const childX = startX + index * (nodeWidth + horizontalSpacing);

        // Create edge from parent to child
        edges.push({
            id: `${orgStructure.id}-${child.id}`,
            source: orgStructure.id,
            target: child.id,
            type: 'smoothstep',
        });

        // Recursively process child nodes
        convertOrgStructureToFlow(child, childX, level + 1, nodes, edges);
    });
    return {nodes, edges};
}

function RouteComponent() {
    const [orgStructure, setOrgStructure] = useState<OrgNode>(initialOrgStructure);
    const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({name: '', title: ''});

    // React Flow states
    const [nodes, setNodes, onNodesChange] = useNodesState<Node<EmployeeNodeData>>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    // Update flow when org structure changes
    useEffect(() => {
        const flowData = convertOrgStructureToFlow(orgStructure);
        setNodes(flowData.nodes as Node<EmployeeNodeData>[]);
        setEdges(flowData.edges as Edge[]);
    }, [orgStructure, setNodes, setEdges]);

    const nodeTypes = {
        custom: CustomNode,
    };

    const updateNodeInTree = (tree: OrgNode, nodeId: string, updatedNode: OrgNode): OrgNode => {
        if (tree.id === nodeId) {
            return {...tree, ...updatedNode, children: tree.children};
        }

        return {
            ...tree,
            children: tree.children.map(child => updateNodeInTree(child, nodeId, updatedNode))
        };
    };

    const addNodeToParent = (tree: OrgNode, parentId: string, newNode: OrgNode): OrgNode => {
        if (tree.id === parentId) {
            return {
                ...tree,
                children: [...tree.children, newNode]
            };
        }

        return {
            ...tree,
            children: tree.children.map(child => addNodeToParent(child, parentId, newNode))
        };
    };

    const handleEditNode = () => {
        if (!selectedNode) return;

        const updatedTree = updateNodeInTree(orgStructure, selectedNode.id, selectedNode);
        setOrgStructure(updatedTree);
        setIsEditDialogOpen(false);
    };

    const handleAddNode = () => {
        if (!selectedNode || !newEmployee.name || !newEmployee.title) return;

        const newNode: OrgNode = {
            id: Date.now().toString(),
            name: newEmployee.name,
            title: newEmployee.title,
            children: []
        };

        const updatedTree = addNodeToParent(orgStructure, selectedNode.id, newNode);
        setOrgStructure(updatedTree);
        setNewEmployee({name: '', title: ''});
        setIsAddDialogOpen(false);
    };

    const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
        const findNode = (tree: OrgNode, id: string): OrgNode | null => {
            if (tree.id === id) return tree;
            for (const child of tree.children) {
                const found = findNode(child, id);
                if (found) return found;
            }
            return null;
        };

        const selectedOrgNode = findNode(orgStructure, node.id);
        if (selectedOrgNode) {
            setSelectedNode(selectedOrgNode);
            setIsEditDialogOpen(true);
        }
    }, [orgStructure]);

    return (
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 space-y-2 sm:space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                <h1 className="text-xl sm:text-2xl font-bold">Organization Structure</h1>
                <div className="w-full sm:w-auto flex justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            if (selectedNode) {
                                setIsAddDialogOpen(true);
                            }
                        }}
                        className="text-xs sm:text-sm"
                    >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"/>
                        Add Node
                    </Button>
                </div>
            </div>

            <div className="h-[calc(100vh-120px)] sm:h-[calc(100vh-200px)] border rounded-lg">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={onNodeClick}
                    nodeTypes={nodeTypes}
                    connectionMode={ConnectionMode.Loose}
                    fitView
                    minZoom={0.1}
                    maxZoom={1.5}
                    attributionPosition="bottom-left"
                >
                    <Background/>
                    <Controls
                        className="!left-2 !bottom-2 sm:!left-4 sm:!bottom-4"
                        showInteractive={false}
                    />
                </ReactFlow>
            </div>

            {/* Edit Node Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Position</DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
                            Update the employee information.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedNode && (
                        <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name" className="text-xs sm:text-sm">Name</Label>
                                <Input
                                    id="edit-name"
                                    value={selectedNode.name}
                                    onChange={(e) =>
                                        setSelectedNode({
                                            ...selectedNode,
                                            name: e.target.value,
                                        })
                                    }
                                    className="text-xs sm:text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-title" className="text-xs sm:text-sm">Title</Label>
                                <Input
                                    id="edit-title"
                                    value={selectedNode.title}
                                    onChange={(e) =>
                                        setSelectedNode({
                                            ...selectedNode,
                                            title: e.target.value,
                                        })
                                    }
                                    className="text-xs sm:text-sm"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                            className="text-xs sm:text-sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleEditNode}
                            className="text-xs sm:text-sm"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Node Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Direct Report</DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
                            Add a new employee under the selected position.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-name" className="text-xs sm:text-sm">Name</Label>
                            <Input
                                id="new-name"
                                value={newEmployee.name}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        name: e.target.value,
                                    })
                                }
                                className="text-xs sm:text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-title" className="text-xs sm:text-sm">Title</Label>
                            <Input
                                id="new-title"
                                value={newEmployee.title}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        title: e.target.value,
                                    })
                                }
                                className="text-xs sm:text-sm"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddDialogOpen(false)}
                            className="text-xs sm:text-sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddNode}
                            className="text-xs sm:text-sm"
                        >
                            Add Employee
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}