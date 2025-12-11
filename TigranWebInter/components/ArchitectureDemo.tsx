import React, { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  Position,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Database, Zap, Bot, Box, Layers, ArrowRight, FileSpreadsheet, Server, Globe, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Custom Node Components ---

const CustomNode = ({ data }: { data: { label: string; icon: React.ReactNode; subLabel?: string } }) => {
  return (
    <div className="px-4 py-3 shadow-lg rounded-lg bg-white border border-neutral-200 min-w-[150px] flex items-center gap-3">
      <div className="p-2 bg-neutral-100 rounded-md text-neutral-900">
        {data.icon}
      </div>
      <div>
        <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">{data.label}</div>
        {data.subLabel && <div className="text-[10px] text-neutral-500 font-mono">{data.subLabel}</div>}
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// --- Data for each tab ---

const initialNodesOrchestration: Node[] = [
  { id: '1', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'Input Source', subLabel: 'Webhook / Form', icon: <Globe size={16} /> } },
  { id: '2', type: 'custom', position: { x: 300, y: 100 }, data: { label: 'Orchestrator', subLabel: 'n8n / Make', icon: <Layers size={16} /> } },
  { id: '3', type: 'custom', position: { x: 550, y: 20 }, data: { label: 'CRM', subLabel: 'Salesforce', icon: <Database size={16} /> } },
  { id: '4', type: 'custom', position: { x: 550, y: 100 }, data: { label: 'Slack', subLabel: 'Notifications', icon: <MessageSquare size={16} /> } },
  { id: '5', type: 'custom', position: { x: 550, y: 180 }, data: { label: 'Email', subLabel: 'Outreach', icon: <Zap size={16} /> } },
];

const initialEdgesOrchestration: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#0A0A0A' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#0A0A0A' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#0A0A0A' } },
  { id: 'e2-5', source: '2', target: '5', animated: true, style: { stroke: '#0A0A0A' } },
];

const initialNodesAgents: Node[] = [
  { id: '1', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'User Query', subLabel: 'Natural Language', icon: <MessageSquare size={16} /> } },
  { id: '2', type: 'custom', position: { x: 300, y: 100 }, data: { label: 'AI Agent', subLabel: 'Reasoning Engine', icon: <Bot size={16} /> } },
  { id: '3', type: 'custom', position: { x: 300, y: 250 }, data: { label: 'Knowledge Base', subLabel: 'Vector DB', icon: <Database size={16} /> } },
  { id: '4', type: 'custom', position: { x: 550, y: 100 }, data: { label: 'Action', subLabel: 'API Execution', icon: <Zap size={16} /> } },
];

const initialEdgesAgents: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#0A0A0A' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#0A0A0A' } },
  { id: 'e3-2', source: '3', target: '2', animated: true, style: { stroke: '#0A0A0A', strokeDasharray: 5 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#0A0A0A' } },
];

const initialNodesRefactoring: Node[] = [
  { id: '1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Legacy Excel', subLabel: 'Manual Data', icon: <FileSpreadsheet size={16} /> } },
  { id: '2', type: 'custom', position: { x: 50, y: 150 }, data: { label: 'Manual Email', subLabel: 'Copy-Paste', icon: <MessageSquare size={16} /> } },
  { id: '3', type: 'custom', position: { x: 300, y: 100 }, data: { label: 'AutoMate System', subLabel: 'Unified Logic', icon: <Box size={16} /> } },
  { id: '4', type: 'custom', position: { x: 550, y: 100 }, data: { label: 'Scalable DB', subLabel: 'PostgreSQL', icon: <Server size={16} /> } },
];

const initialEdgesRefactoring: Edge[] = [
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#ef4444' }, label: 'Chaos' }, // Red for legacy
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#ef4444' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#0A0A0A' }, label: 'Order' },
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
        setNodes(initialNodesOrchestration);
        setEdges(initialEdgesOrchestration);
        break;
      case '2': // AI Agents
        setNodes(initialNodesAgents);
        setEdges(initialEdgesAgents);
        break;
      case '3': // Refactoring
        setNodes(initialNodesRefactoring);
        setEdges(initialEdgesRefactoring);
        break;
      default:
        setNodes(initialNodesOrchestration);
        setEdges(initialEdgesOrchestration);
    }
  }, [activeTab, setNodes, setEdges]);

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-neutral-50/50 rounded-xl border border-neutral-200 overflow-hidden relative">
      <div className="absolute inset-0 z-0">
          {/* Grid Background is handled by ReactFlow Background component */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-right"
            zoomOnScroll={false}
            panOnDrag={false}
            preventScrolling={false} // Allow page scroll
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#0A0A0A" gap={20} size={1} style={{ opacity: 0.05 }} />
            {/* Controls are optional, maybe too cluttered for a demo */}
            {/* <Controls /> */}
          </ReactFlow>
      </div>
      
      {/* Overlay Badge */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-neutral-200 text-[10px] font-mono uppercase tracking-widest text-neutral-500 pointer-events-none">
        Live Architecture Preview
      </div>
    </div>
  );
};

export default ArchitectureDemo;
