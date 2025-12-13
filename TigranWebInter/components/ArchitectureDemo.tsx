import React, { useEffect, useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Handle,
  Position,
  ConnectionLineType,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Zap, 
  Bot, 
  Box, 
  Layers, 
  Globe, 
  MessageSquare, 
  Server, 
  Cpu, 
  HardDrive, 
  FileSpreadsheet,
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';

// --- Design System Colors (matching site palette) ---
const COLORS = {
  // Primary palette from the site
  blue: '#3b82f6',
  green: '#22c55e', 
  pink: '#ec4899',
  orange: '#f97316',
  purple: '#8b5cf6',
  red: '#ef4444',
  // Neutral from site
  ink950: '#0A0A0A',
  ink600: '#525252',
  ink400: '#a3a3a3',
  alabaster: '#F5F5F0',
};

// --- Animated Connection Dot Component ---
const AnimatedDot: React.FC<{ color: string; delay?: number }> = ({ color, delay = 0 }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ backgroundColor: color }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// --- Custom Node: Product Node with Labels and Hover Effects ---
interface ProductNodeData {
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  color?: string;
  isActive?: boolean;
}

const ProductNode = ({ data, selected }: { data: ProductNodeData; selected?: boolean }) => {
  const color = data.color || COLORS.blue;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon box container - handles are attached here for proper centering */}
      <motion.div 
        className="w-16 h-16 rounded-sm flex items-center justify-center transition-all duration-300 relative"
        style={{ 
          backgroundColor: `${color}10`,
          border: `1.5px dashed ${color}`,
          boxShadow: isHovered || selected ? `0 0 20px ${color}30` : 'none',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1.05 : 1, 
          opacity: 1,
          borderStyle: isHovered ? 'solid' : 'dashed',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Handles positioned on the icon box */}
        <Handle type="target" position={Position.Left} className="!opacity-0 !w-1 !h-1 !border-none !top-1/2 !-translate-y-1/2" />
        <Handle type="target" position={Position.Top} className="!opacity-0 !w-1 !h-1 !border-none !left-1/2 !-translate-x-1/2" />
        <Handle type="source" position={Position.Right} className="!opacity-0 !w-1 !h-1 !border-none !top-1/2 !-translate-y-1/2" />
        <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-1 !h-1 !border-none !left-1/2 !-translate-x-1/2" />

        {/* Corner markers */}
        <div className="absolute -top-[4px] -left-[4px] w-2 h-2 border-t-2 border-l-2 rounded-tl-[2px]" style={{ borderColor: color }} />
        <div className="absolute -top-[4px] -right-[4px] w-2 h-2 border-t-2 border-r-2 rounded-tr-[2px]" style={{ borderColor: color }} />
        <div className="absolute -bottom-[4px] -left-[4px] w-2 h-2 border-b-2 border-l-2 rounded-bl-[2px]" style={{ borderColor: color }} />
        <div className="absolute -bottom-[4px] -right-[4px] w-2 h-2 border-b-2 border-r-2 rounded-br-[2px]" style={{ borderColor: color }} />

        {/* Pulse effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-sm"
              style={{ border: `2px solid ${color}` }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.5, 0], scale: [1, 1.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div 
          style={{ color: color }}
          animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }}
          transition={{ duration: 0.3 }}
        >
          {React.cloneElement(data.icon as React.ReactElement, { size: 26, strokeWidth: 1.5 })}
        </motion.div>
      </motion.div>

      {/* Label below the node - outside the icon box */}
      <div className="mt-2.5 text-center pointer-events-none">
        <div 
          className="text-[11px] font-mono font-medium uppercase tracking-wider"
          style={{ color: color }}
        >
          {data.label}
        </div>
        {data.sublabel && (
          <div className="text-[9px] font-mono text-ink-400 mt-0.5">
            {data.sublabel}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Custom Node: Group Node with improved styling ---
interface GroupNodeData {
  label: string;
  width: number;
  height: number;
  color?: string;
}

const GroupNode = ({ data }: { data: GroupNodeData }) => {
  const color = data.color || COLORS.blue;

  return (
    <motion.div 
      className="relative rounded-lg transition-all duration-500 pointer-events-none"
      style={{ 
        width: data.width, 
        height: data.height,
        border: `1.5px dashed ${color}50`,
        backgroundColor: `${color}05`,
        backdropFilter: 'blur(2px)',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Floating Label - positioned above border */}
      <div 
        className="absolute -top-12 left-3 px-2 py-0.5 text-[10px] font-mono tracking-[0.15em] uppercase rounded-sm"
        style={{ 
          color: color,
          backgroundColor: `${color}10`,
          border: `1px solid ${color}30`
        }}
      >
        {data.label}
      </div>
      
      {/* Corner dots */}
      <motion.div 
        className="absolute -top-1 -left-1 w-2 h-2 rounded-full border-2"
        style={{ borderColor: color, backgroundColor: COLORS.alabaster }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full border-2"
        style={{ borderColor: color, backgroundColor: COLORS.alabaster }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div 
        className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full border-2"
        style={{ borderColor: color, backgroundColor: COLORS.alabaster }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full border-2"
        style={{ borderColor: color, backgroundColor: COLORS.alabaster }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </motion.div>
  );
};

const nodeTypes = {
  product: ProductNode,
  group: GroupNode,
};

// --- Enhanced Data for each tab ---
// Constants: icon=64px, label=35px, total_node_height=100px, spacing=120px
// Group padding: top=35px (for label), bottom=15px, sides=23px
// Group width = 64 + 23*2 = 110px
// Group height: 1 node = 150px, 2 nodes = 270px, 3 nodes = 390px

// 1. Orchestration - Workflow automation pipeline
// Horizontal spacing: 240px between columns for wider layout
const nodesOrchestration: Node[] = [
  // Groups - mathematically centered around nodes
  { id: 'g1', type: 'group', position: { x: -23, y: 85 }, data: { label: 'Trigger', width: 110, height: 150, color: COLORS.orange }, zIndex: -1 },
  { id: 'g2', type: 'group', position: { x: 217, y: 85 }, data: { label: 'Workflow', width: 110, height: 150, color: COLORS.blue }, zIndex: -1 },
  { id: 'g3', type: 'group', position: { x: 457, y: -35 }, data: { label: 'Integrations', width: 110, height: 390, color: COLORS.pink }, zIndex: -1 },

  // Nodes - 240px horizontal spacing
  { id: '1', type: 'product', position: { x: 0, y: 120 }, data: { label: 'Trigger', sublabel: 'Webhook', icon: <Globe />, color: COLORS.orange } },
  { id: '2', type: 'product', position: { x: 240, y: 120 }, data: { label: 'Workflow', sublabel: 'Orchestrator', icon: <Layers />, color: COLORS.blue } },
  
  { id: '3', type: 'product', position: { x: 480, y: 0 }, data: { label: 'CRM', sublabel: 'Salesforce', icon: <Database />, color: COLORS.pink } },
  { id: '4', type: 'product', position: { x: 480, y: 120 }, data: { label: 'Slack', sublabel: 'Alerts', icon: <MessageSquare />, color: COLORS.pink } },
  { id: '5', type: 'product', position: { x: 480, y: 240 }, data: { label: 'Email', sublabel: 'Resend', icon: <Zap />, color: COLORS.pink } },
];

const edgesOrchestration: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.orange, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.orange, width: 15, height: 15 },
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.blue, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.blue, width: 15, height: 15 },
  },
  { 
    id: 'e2-4', 
    source: '2', 
    target: '4', 
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.blue, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.blue, width: 15, height: 15 },
  },
  { 
    id: 'e2-5', 
    source: '2', 
    target: '5', 
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.blue, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.blue, width: 15, height: 15 },
  },
];

// 2. AI Agents - Intelligent processing pipeline  
// Wider spacing for better distribution
const nodesAgents: Node[] = [
  // Groups - 2x2 grid in center, single nodes on sides
  { id: 'g1', type: 'group', position: { x: -23, y: 25 }, data: { label: 'Input', width: 110, height: 150, color: COLORS.blue }, zIndex: -1 },
  { id: 'g2', type: 'group', position: { x: 187, y: -35 }, data: { label: 'Compute', width: 240, height: 270, color: COLORS.green }, zIndex: -1 },
  { id: 'g3', type: 'group', position: { x: 517, y: 25 }, data: { label: 'Action', width: 110, height: 150, color: COLORS.purple }, zIndex: -1 },

  // Nodes - wider horizontal spacing
  { id: '1', type: 'product', position: { x: 0, y: 60 }, data: { label: 'User', sublabel: 'Query', icon: <MessageSquare />, color: COLORS.blue } },
  
  { id: '2a', type: 'product', position: { x: 210, y: 0 }, data: { label: 'LLM', sublabel: 'GPT-4', icon: <Bot />, color: COLORS.green } },
  { id: '2b', type: 'product', position: { x: 330, y: 0 }, data: { label: 'RAG', sublabel: 'Vector DB', icon: <Database />, color: COLORS.green } },
  { id: '2c', type: 'product', position: { x: 210, y: 120 }, data: { label: 'Code', sublabel: 'Executor', icon: <Cpu />, color: COLORS.green } },
  { id: '2d', type: 'product', position: { x: 330, y: 120 }, data: { label: 'Memory', sublabel: 'Context', icon: <HardDrive />, color: COLORS.green } },

  { id: '3', type: 'product', position: { x: 540, y: 60 }, data: { label: 'Execute', sublabel: 'Actions', icon: <Sparkles />, color: COLORS.purple } },
];

const edgesAgents: Edge[] = [
  { id: 'e1-2a', source: '1', target: '2a', animated: true, type: 'smoothstep', style: { stroke: COLORS.blue, strokeWidth: 2, strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.blue, width: 15, height: 15 } },
  { id: 'e2a-3', source: '2a', target: '3', animated: true, type: 'smoothstep', style: { stroke: COLORS.green, strokeWidth: 2, strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.green, width: 15, height: 15 } },
  { id: 'e2a-2b', source: '2a', target: '2b', animated: true, type: 'smoothstep', style: { stroke: COLORS.green, strokeWidth: 1.5, opacity: 0.5 } },
  { id: 'e2a-2c', source: '2a', target: '2c', animated: true, type: 'smoothstep', style: { stroke: COLORS.green, strokeWidth: 1.5, opacity: 0.5 } },
  { id: 'e2c-2d', source: '2c', target: '2d', animated: true, type: 'smoothstep', style: { stroke: COLORS.green, strokeWidth: 1.5, opacity: 0.5 } },
  { id: 'e2b-2d', source: '2b', target: '2d', animated: true, type: 'smoothstep', style: { stroke: COLORS.green, strokeWidth: 1.5, opacity: 0.5 } },
];

// 3. Refactoring - Legacy to modern migration
// Wider spacing: 240px between columns
const nodesRefactoring: Node[] = [
  // Groups - 2-node columns on sides, single node in center
  { id: 'g1', type: 'group', position: { x: -23, y: -35 }, data: { label: 'Legacy', width: 110, height: 270, color: COLORS.red }, zIndex: -1 },
  { id: 'g2', type: 'group', position: { x: 217, y: 25 }, data: { label: 'Transform', width: 110, height: 150, color: COLORS.orange }, zIndex: -1 },
  { id: 'g3', type: 'group', position: { x: 457, y: -35 }, data: { label: 'Modern', width: 110, height: 270, color: COLORS.green }, zIndex: -1 },

  // Nodes - 240px horizontal spacing
  { id: '1', type: 'product', position: { x: 0, y: 0 }, data: { label: 'Sheets', sublabel: 'Excel', icon: <FileSpreadsheet />, color: COLORS.red } },
  { id: '2', type: 'product', position: { x: 0, y: 120 }, data: { label: 'Manual', sublabel: 'Entry', icon: <MessageSquare />, color: COLORS.red } },

  { id: 't1', type: 'product', position: { x: 240, y: 60 }, data: { label: 'ETL', sublabel: 'Pipeline', icon: <ArrowRightLeft />, color: COLORS.orange } },

  { id: '3', type: 'product', position: { x: 480, y: 0 }, data: { label: 'API', sublabel: 'REST', icon: <Box />, color: COLORS.green } },
  { id: '4', type: 'product', position: { x: 480, y: 120 }, data: { label: 'DB', sublabel: 'Supabase', icon: <Server />, color: COLORS.green } },
];

const edgesRefactoring: Edge[] = [
  { id: 'e1-t1', source: '1', target: 't1', animated: true, type: 'smoothstep', style: { stroke: COLORS.red, strokeWidth: 2, strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.red, width: 15, height: 15 } },
  { id: 'e2-t1', source: '2', target: 't1', animated: true, type: 'smoothstep', style: { stroke: COLORS.red, strokeWidth: 2, strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.red, width: 15, height: 15 } },
  { id: 'et1-3', source: 't1', target: '3', animated: true, type: 'smoothstep', style: { stroke: COLORS.orange, strokeWidth: 2, strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.orange, width: 15, height: 15 } },
  { id: 'et1-4', source: 't1', target: '4', animated: true, type: 'smoothstep', style: { stroke: COLORS.orange, strokeWidth: 2, strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.orange, width: 15, height: 15 } },
];

// --- Tab configurations ---
const tabConfigs: Record<string, { nodes: Node[]; edges: Edge[] }> = {
  '1': { nodes: nodesOrchestration, edges: edgesOrchestration },
  '2': { nodes: nodesAgents, edges: edgesAgents },
  '3': { nodes: nodesRefactoring, edges: edgesRefactoring },
};

interface ArchitectureDemoProps {
  activeTab: string;
}

const ArchitectureDemo: React.FC<ArchitectureDemoProps> = ({ activeTab }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const config = tabConfigs[activeTab] || tabConfigs['1'];
    setNodes(config.nodes);
    setEdges(config.edges);
  }, [activeTab, setNodes, setEdges]);

  // Memoize node types to prevent re-renders
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <motion.div 
      className="w-full h-[400px] md:h-[500px] bg-white border border-ink-950/5 relative shadow-sm overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Technical Corner Markers */}
      <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-ink-950 z-20 rounded-tl-lg" />
      <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-ink-950 z-20 rounded-tr-lg" />
      <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-ink-950 z-20 rounded-bl-lg" />
      <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-ink-950 z-20 rounded-br-lg" />

      {/* Header with live indicator */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
        <div className="text-[9px] font-mono text-ink-400 tracking-widest">
          /// SYSTEM_VIEW_V1
        </div>
        <motion.div 
          className="flex items-center gap-2 text-[9px] font-mono text-ink-400"
          animate={{ opacity: isLive ? 1 : 0.5 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          LIVE
        </motion.div>
      </div>

      {/* React Flow Canvas */}
      <div className="absolute inset-0 z-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={memoizedNodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          fitViewOptions={{ padding: 0.35, minZoom: 0.5, maxZoom: 1.2 }}
          attributionPosition="bottom-right"
          zoomOnScroll={false}
          panOnDrag={true}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
          minZoom={0.4}
          maxZoom={1.5}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1.5} 
            color="#e5e5e5" 
          />
        </ReactFlow>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-white/20 z-10" />
    </motion.div>
  );
};

export default ArchitectureDemo;





