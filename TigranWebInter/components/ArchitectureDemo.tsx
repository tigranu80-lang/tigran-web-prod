import React, { useEffect } from 'react';
import ReactFlow, {
  Background,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Database, Zap, Bot, Box, Layers, Globe, MessageSquare, Server, Cpu, HardDrive, FileSpreadsheet } from 'lucide-react';

// --- Custom Node Component ---

const CustomNode = ({ data }: { data: { label: string; icon: React.ReactNode; subLabel?: string; color?: string } }) => {
  const color = data.color || '#3b82f6'; // Default blue
  
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div 
        className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-md"
        style={{ backgroundColor: `${color}20` }}
      ></div>
      
      <div 
        className="px-4 py-3 rounded-lg bg-white border-2 min-w-[140px] flex flex-col items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md"
        style={{ 
          borderColor: `${color}40`, // 40 = 25% opacity
          color: '#1e293b'
        }}
      >
        <Handle type="target" position={Position.Left} className="!bg-neutral-300 !w-2 !h-2" />
        
        <div 
          className="p-2.5 rounded-md mb-1"
          style={{ 
            backgroundColor: `${color}10`, // 10 = ~6% opacity
            color: color 
          }}
        >
          {data.icon}
        </div>
        
        <div className="text-center">
          <div 
            className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
            style={{ color: color }}
          >
            {data.label}
          </div>
          {data.subLabel && (
            <div className="text-[9px] text-neutral-400 font-mono">
              {data.subLabel}
            </div>
          )}
        </div>

        <Handle type="source" position={Position.Right} className="!bg-neutral-300 !w-2 !h-2" />
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// --- Colors from Cloudflare style ---
const COLORS = {
  blue: '#3b82f6',   // Compute / Workflow
  green: '#22c55e',  // AI / Workers
  pink: '#ec4899',   // Storage
  orange: '#f97316', // Input / Trigger
  purple: '#a855f7', // Database
};

// --- Data for each tab ---

// 1. Orchestration (Blue & Orange theme)
const nodesOrchestration: Node[] = [
  { id: '1', type: 'custom', position: { x: 0, y: 100 }, data: { label: 'Trigger', subLabel: 'Webhook', icon: <Globe size={18} />, color: COLORS.orange } },
  { id: '2', type: 'custom', position: { x: 250, y: 100 }, data: { label: 'Workflow', subLabel: 'Orchestrator', icon: <Layers size={18} />, color: COLORS.blue } },
  { id: '3', type: 'custom', position: { x: 550, y: 0 }, data: { label: 'CRM', subLabel: 'Salesforce', icon: <Database size={18} />, color: COLORS.purple } },
  { id: '4', type: 'custom', position: { x: 550, y: 100 }, data: { label: 'Slack', subLabel: 'Alerts', icon: <MessageSquare size={18} />, color: COLORS.green } },
  { id: '5', type: 'custom', position: { x: 550, y: 200 }, data: { label: 'Email', subLabel: 'Resend', icon: <Zap size={18} />, color: COLORS.pink } },
];

const edgesOrchestration: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: COLORS.orange, strokeDasharray: '5,5', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: COLORS.blue, strokeDasharray: '5,5', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: COLORS.blue, strokeDasharray: '5,5', strokeWidth: 2 } },
  { id: 'e2-5', source: '2', target: '5', animated: true, style: { stroke: COLORS.blue, strokeDasharray: '5,5', strokeWidth: 2 } },
];

// 2. AI Agents (Green & Blue theme)
const nodesAgents: Node[] = [
  { id: '1', type: 'custom', position: { x: 0, y: 100 }, data: { label: 'Input', subLabel: 'Prompt', icon: <MessageSquare size={18} />, color: COLORS.orange } },
  { id: '2', type: 'custom', position: { x: 250, y: 100 }, data: { label: 'AI Core', subLabel: 'Inference', icon: <Bot size={18} />, color: COLORS.green } },
  { id: '3', type: 'custom', position: { x: 250, y: 250 }, data: { label: 'Memory', subLabel: 'Vector DB', icon: <HardDrive size={18} />, color: COLORS.pink } },
  { id: '4', type: 'custom', position: { x: 550, y: 100 }, data: { label: 'Action', subLabel: 'Execution', icon: <Cpu size={18} />, color: COLORS.blue } },
];

const edgesAgents: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: COLORS.orange, strokeDasharray: '5,5', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: COLORS.green, strokeDasharray: '5,5', strokeWidth: 2 } },
  { id: 'e3-2', source: '3', target: '2', animated: true, style: { stroke: COLORS.pink, strokeDasharray: '5,5', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: COLORS.green, strokeDasharray: '5,5', strokeWidth: 2 } },
];

// 3. Refactoring (Red to Green transition)
const nodesRefactoring: Node[] = [
  { id: '1', type: 'custom', position: { x: 0, y: 50 }, data: { label: 'Legacy', subLabel: 'Excel', icon: <FileSpreadsheet size={18} />, color: '#ef4444' } }, // Red
  { id: '2', type: 'custom', position: { x: 0, y: 150 }, data: { label: 'Manual', subLabel: 'Email', icon: <MessageSquare size={18} />, color: '#ef4444' } }, // Red
  { id: '3', type: 'custom', position: { x: 280, y: 100 }, data: { label: 'System', subLabel: 'AutoMate', icon: <Box size={18} />, color: COLORS.blue } },
  { id: '4', type: 'custom', position: { x: 550, y: 100 }, data: { label: 'Database', subLabel: 'PostgreSQL', icon: <Server size={18} />, color: COLORS.purple } },
];

const edgesRefactoring: Edge[] = [
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#ef4444', strokeDasharray: '5,5', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#ef4444', strokeDasharray: '5,5', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: COLORS.blue, strokeDasharray: '5,5', strokeWidth: 2 } },
];


interface ArchitectureDemoProps {
  activeTab: string;
}

const ArchitectureDemo: React.FC<ArchitectureDemoProps> = ({ activeTab }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    switch (activeTab) {
      case '1': // Orchestration
        setNodes(nodesOrchestration);
        setEdges(edgesOrchestration);
        break;
      case '2': // AI Agents
        setNodes(nodesAgents);
        setEdges(edgesAgents);
        break;
      case '3': // Refactoring
        setNodes(nodesRefactoring);
        setEdges(edgesRefactoring);
        break;
      default:
        setNodes(nodesOrchestration);
        setEdges(edgesOrchestration);
    }
  }, [activeTab, setNodes, setEdges]);

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-[#fffbf7] rounded-xl border border-neutral-200 overflow-hidden relative shadow-inner">
      <div className="absolute inset-0 z-0">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.4 }} // Add more padding to center nicely
            attributionPosition="bottom-right"
            zoomOnScroll={false}
            panOnDrag={true} // Allow panning for better UX
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
            minZoom={0.5}
            maxZoom={1.5}
          >
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={24} 
              size={1.5} 
              color="#e5e5e5" // Subtle engineering dots
            />
          </ReactFlow>
      </div>
      
      {/* Decorative technical markers */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-neutral-400 tracking-widest pointer-events-none">
        /// SYSTEM_VIEW_V1
      </div>
      <div className="absolute top-4 right-4 flex gap-1 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-[10px] font-mono text-neutral-400 tracking-widest">LIVE</span>
      </div>
    </div>
  );
};

export default ArchitectureDemo;
