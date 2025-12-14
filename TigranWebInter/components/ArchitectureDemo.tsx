import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react';
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
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import Dagre from 'dagre';
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
  const nodeId = `product-node-${data.label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div
      className="product-node-container relative group flex flex-col items-center justify-center cursor-pointer"
      data-node-id={nodeId}
      data-node-type="product"
      data-node-label={data.label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon box container with dashed border - properly centered */}
      <motion.div
        className="product-node-icon-container w-16 h-16 rounded-sm flex items-center justify-center transition-all duration-300 relative"
        data-container-type="icon-box"
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
        {/* Handles positioned on the icon box - properly centered */}
        <Handle
          type="target"
          position={Position.Left}
          id="target-left"
          className="!opacity-0 !w-1 !h-1 !border-none"
          style={{ top: '50%', left: 0, transform: 'translateY(-50%)' }}
        />
        <Handle
          type="target"
          position={Position.Top}
          id="target-top"
          className="!opacity-0 !w-1 !h-1 !border-none"
          style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="source-right"
          className="!opacity-0 !w-1 !h-1 !border-none"
          style={{ top: '50%', right: 0, transform: 'translateY(-50%)' }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="source-bottom"
          className="!opacity-0 !w-1 !h-1 !border-none"
          style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
        />
        {/* Additional source handles for multiple connections from same node - spaced vertically */}
        <Handle
          type="source"
          position={Position.Right}
          id="source-right-top"
          className="!opacity-0 !w-1 !h-1 !border-none"
          style={{ top: '25%', right: 0, transform: 'translateY(-50%)' }}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="source-right-bottom"
          className="!opacity-0 !w-1 !h-1 !border-none"
          style={{ top: '75%', right: 0, transform: 'translateY(-50%)' }}
        />

        {/* Corner markers */}
        <div
          className="corner-marker corner-top-left absolute -top-[4px] -left-[4px] w-2 h-2 border-t-2 border-l-2 rounded-tl-[2px]"
          style={{ borderColor: color }}
          data-marker="top-left"
        />
        <div
          className="corner-marker corner-top-right absolute -top-[4px] -right-[4px] w-2 h-2 border-t-2 border-r-2 rounded-tr-[2px]"
          style={{ borderColor: color }}
          data-marker="top-right"
        />
        <div
          className="corner-marker corner-bottom-left absolute -bottom-[4px] -left-[4px] w-2 h-2 border-b-2 border-l-2 rounded-bl-[2px]"
          style={{ borderColor: color }}
          data-marker="bottom-left"
        />
        <div
          className="corner-marker corner-bottom-right absolute -bottom-[4px] -right-[4px] w-2 h-2 border-b-2 border-r-2 rounded-br-[2px]"
          style={{ borderColor: color }}
          data-marker="bottom-right"
        />

        {/* Pulse effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="pulse-effect absolute inset-0 rounded-sm"
              data-effect="pulse"
              style={{ border: `2px solid ${color}` }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.5, 0], scale: [1, 1.3] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </AnimatePresence>

        {/* Icon - perfectly centered using absolute positioning */}
        <div
          className="product-node-icon-wrapper absolute inset-0 flex items-center justify-center"
          data-icon-wrapper="true"
        >
          <motion.div
            className="product-node-icon"
            data-icon="true"
            style={{ color: color }}
            animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }}
            transition={{ duration: 0.3 }}
          >
            {React.cloneElement(data.icon as React.ReactElement, { size: 26, strokeWidth: 1.5 })}
          </motion.div>
        </div>

        {/* Label below the icon-container - centered relative to product-node-icon-container */}
        <div
          className="product-node-label-container absolute text-center pointer-events-none"
          data-container-type="label"
          style={{
            // Position below icon-container with sufficient spacing to avoid overlap
            top: 'calc(100% + 20px)', // Spacing below the dashed border
            left: '50%',
            transform: 'translateX(-50%)', // Center horizontally - icon-container is 64px wide, center at 32px
            width: 'max-content',
            minWidth: '64px', // Match icon-container width (w-16 = 64px) for perfect alignment
          }}
        >
          <div
            className="product-node-label text-[11px] font-mono font-medium uppercase tracking-wider whitespace-nowrap"
            style={{ color: color }}
            data-label="main"
          >
            {data.label}
          </div>
          {data.sublabel && (
            <div className="product-node-sublabel text-[9px] font-mono text-ink-400 mt-0.5 whitespace-nowrap" data-label="sub">
              {data.sublabel}
            </div>
          )}
        </div>
      </motion.div>
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
  const groupId = `group-node-${data.label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <motion.div
      className="group-node-container relative rounded-lg transition-all duration-500 pointer-events-none"
      data-node-id={groupId}
      data-node-type="group"
      data-node-label={data.label}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: data.width,
        height: data.height,
        border: `1.5px dashed ${color}50`,
        backgroundColor: `${color}05`,
        backdropFilter: 'blur(2px)',
        boxShadow: 'none',
        outline: 'none',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Handles for connections - positioned on the edges of the dashed frame */}
      {/* Target handles - positioned on left edge at different heights for multiple connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="group-target-left"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: '50%',
          left: 0,
          transform: 'translate(-50%, -50%)',
          position: 'absolute'
        }}
      />
      {/* Multiple target handles on left edge for different connection points */}
      <Handle
        type="target"
        position={Position.Left}
        id="group-target-left-top"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: '25%',
          left: 0,
          transform: 'translate(-50%, -50%)',
          position: 'absolute'
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="group-target-left-center"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: '50%',
          left: 0,
          transform: 'translate(-50%, -50%)',
          position: 'absolute'
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="group-target-left-bottom"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: '75%',
          left: 0,
          transform: 'translate(-50%, -50%)',
          position: 'absolute'
        }}
      />
      {/* Center target handle for connections that should touch center of frame */}
      <Handle
        type="target"
        position={Position.Left}
        id="group-target-center"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute'
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="group-target-top"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute'
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="group-target-right"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: '50%',
          right: 0,
          transform: 'translate(50%, -50%)',
          position: 'absolute'
        }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="group-target-bottom"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 50%)',
          position: 'absolute'
        }}
      />

      {/* Source handles - positioned on the right edge of the dashed frame for outgoing connections */}
      <Handle
        type="source"
        position={Position.Right}
        id="group-source-right"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: '50%',
          right: 0,
          transform: 'translate(50%, -50%)',
          position: 'absolute'
        }}
      />
      {/* Additional source handles for multiple connections - positioned on right edge at different heights */}
      <Handle
        type="source"
        position={Position.Right}
        id="group-source-right-top"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: '25%',
          right: 0,
          transform: 'translate(50%, -50%)',
          position: 'absolute'
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="group-source-right-middle"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: '50%',
          right: 0,
          transform: 'translate(50%, -50%)',
          position: 'absolute'
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="group-source-right-bottom"
        className="!opacity-0 !w-4 !h-4 !border-none !bg-transparent"
        style={{
          top: '75%',
          right: 0,
          transform: 'translate(50%, -50%)',
          position: 'absolute'
        }}
      />
      {/* Floating Label - positioned at top edge, aligned with container */}
      <div
        className="group-node-label absolute top-0 px-2 py-0.5 text-[10px] font-mono tracking-[0.15em] uppercase rounded-sm"
        data-label="group"
        style={{
          color: color,
          backgroundColor: COLORS.alabaster,
          border: `1px solid ${color}30`,
          left: '50%',
          transform: 'translate(-50%, -130%)',
          whiteSpace: 'nowrap',
        }}
      >
        {data.label}
      </div>

      {/* Corner dots */}
      <motion.div
        className="group-corner-dot corner-top-left absolute -top-1 -left-1 w-2 h-2 rounded-full border-2"
        data-corner="top-left"
        style={{ borderColor: color, backgroundColor: COLORS.alabaster }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="group-corner-dot corner-top-right absolute -top-1 -right-1 w-2 h-2 rounded-full border-2"
        data-corner="top-right"
        style={{ borderColor: color, backgroundColor: COLORS.alabaster }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="group-corner-dot corner-bottom-left absolute -bottom-1 -left-1 w-2 h-2 rounded-full border-2"
        data-corner="bottom-left"
        style={{ borderColor: color, backgroundColor: COLORS.alabaster }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="group-corner-dot corner-bottom-right absolute -bottom-1 -right-1 w-2 h-2 rounded-full border-2"
        data-corner="bottom-right"
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

// --- Layout Helper ---
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new Dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Direction: Left-to-Right, increased ranksep for wider layout
  dagreGraph.setGraph({ rankdir: 'LR', ranksep: 180, nodesep: 50 });

  // Filter for top-level nodes (groups or independent nodes) to layout
  const topLevelNodes = nodes.filter(node => !node.parentId);

  topLevelNodes.forEach((node) => {
    const width = node.width || 150;
    const height = node.height || 150;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    if (dagreGraph.hasNode(edge.source) && dagreGraph.hasNode(edge.target)) {
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });

  Dagre.layout(dagreGraph);

  // First pass: calculate positions and find bounding box
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  const tempPositions: Record<string, { x: number; y: number }> = {};

  topLevelNodes.forEach((node) => {
    if (dagreGraph.hasNode(node.id)) {
      const nodeWithPosition = dagreGraph.node(node.id);
      const w = node.width || 150;
      const h = node.height || 150;

      const x = nodeWithPosition.x - w / 2;
      const y = nodeWithPosition.y - h / 2;

      tempPositions[node.id] = { x, y };

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x + w > maxX) maxX = x + w;
      if (y + h > maxY) maxY = y + h;
    }
  });

  // Calculate center offset to move everything to be centered around (0,0)
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  // Second pass: apply centered positions
  const layoutedNodes = nodes.map((node) => {
    if (!node.parentId && tempPositions[node.id]) {
      return {
        ...node,
        position: {
          x: tempPositions[node.id].x - centerX,
          y: tempPositions[node.id].y - centerY,
        },
      };
    }
    return node;
  });

  return { nodes: layoutedNodes, edges };
};

// --- Enhanced Data for each tab ---
// Constants: icon=64px, label=35px, total_node_height=100px, spacing=120px
// Group padding: top=35px (for label), bottom=15px, sides=23px
// Group width = 64 + 23*2 = 110px
// Group height: 1 node = 150px, 2 nodes = 270px, 3 nodes = 390px

// 1. Orchestration - Workflow automation pipeline
// Horizontal spacing: 240px between columns for wider layout
// Base positions (will be centered dynamically in useEffect)
const nodesOrchestration: Node[] = [
  // Groups - Auto layout will position these
  {
    id: 'group-trigger',
    type: 'group',
    position: { x: 0, y: 0 }, // Initial
    width: 110, height: 150,
    data: { label: 'Trigger', width: 110, height: 150, color: COLORS.orange },
    zIndex: -1,
  },
  {
    id: 'group-workflow',
    type: 'group',
    position: { x: 0, y: 0 },
    width: 110, height: 150,
    data: { label: 'Workflow', width: 110, height: 150, color: COLORS.blue },
    zIndex: -1,
  },
  {
    id: 'group-integrations',
    type: 'group',
    position: { x: 0, y: 0 },
    width: 110, height: 390,
    data: { label: 'Integrations', width: 110, height: 390, color: COLORS.pink },
    zIndex: -1,
  },

  // Nodes - Relative to Parents
  {
    id: 'node-trigger',
    type: 'product',
    parentId: 'group-trigger',
    position: { x: 23, y: 35 }, // Centered in 110x150 group (roughly)
    extent: 'parent',
    width: 64, height: 64,
    data: { label: 'Trigger', sublabel: 'Webhook', icon: <Globe />, color: COLORS.orange },
  },
  {
    id: 'node-workflow',
    type: 'product',
    parentId: 'group-workflow',
    position: { x: 23, y: 35 },
    extent: 'parent',
    width: 64, height: 64,
    data: { label: 'Workflow', sublabel: 'Orchestrator', icon: <Layers />, color: COLORS.blue },
  },

  {
    id: 'node-crm',
    type: 'product',
    parentId: 'group-integrations',
    position: { x: 23, y: 35 }, // Top
    extent: 'parent',
    width: 64, height: 64,
    data: { label: 'CRM', sublabel: 'Salesforce', icon: <Database />, color: COLORS.pink },
  },
  {
    id: 'node-slack',
    type: 'product',
    parentId: 'group-integrations',
    position: { x: 23, y: 155 }, // Middle
    extent: 'parent',
    width: 64, height: 64,
    data: { label: 'Slack', sublabel: 'Alerts', icon: <MessageSquare />, color: COLORS.pink },
  },
  {
    id: 'node-email',
    type: 'product',
    parentId: 'group-integrations',
    position: { x: 23, y: 275 }, // Bottom
    extent: 'parent',
    width: 64, height: 64,
    data: { label: 'Email', sublabel: 'Resend', icon: <Zap />, color: COLORS.pink },
  },
];

const edgesOrchestration: Edge[] = [
  {
    id: 'edge-trigger-to-workflow',
    source: 'group-trigger',
    sourceHandle: 'group-source-right',
    target: 'group-workflow',
    targetHandle: 'group-target-left',
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.orange, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.orange, width: 15, height: 15 },
    data: { label: 'trigger-to-workflow', edgeType: 'primary' },
  },
  {
    id: 'edge-workflow-to-crm',
    source: 'group-workflow',
    sourceHandle: 'group-source-right-top',
    target: 'group-integrations',
    targetHandle: 'group-target-left-top',
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.blue, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.blue, width: 15, height: 15 },
    data: { label: 'workflow-to-crm', edgeType: 'integration' },
    labelStyle: { fill: COLORS.blue, fontWeight: 600 },
  },
  {
    id: 'edge-workflow-to-slack',
    source: 'group-workflow',
    sourceHandle: 'group-source-right-middle',
    target: 'group-integrations',
    targetHandle: 'group-target-left-center',
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.blue, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.blue, width: 15, height: 15 },
    data: { label: 'workflow-to-slack', edgeType: 'integration' },
    labelStyle: { fill: COLORS.blue, fontWeight: 600 },
  },
  {
    id: 'edge-workflow-to-email',
    source: 'group-workflow',
    sourceHandle: 'group-source-right-bottom',
    target: 'group-integrations',
    targetHandle: 'group-target-left-bottom',
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.blue, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.blue, width: 15, height: 15 },
    data: { label: 'workflow-to-email', edgeType: 'integration' },
    labelStyle: { fill: COLORS.blue, fontWeight: 600 },
  },
];

// 2. AI Agents - Intelligent processing pipeline  
// Wider spacing for better distribution
const nodesAgents: Node[] = [
  // Groups
  { id: 'g1', type: 'group', position: { x: 0, y: 0 }, width: 110, height: 150, data: { label: 'Input', width: 110, height: 150, color: COLORS.blue }, zIndex: -1 },
  { id: 'g2', type: 'group', position: { x: 0, y: 0 }, width: 240, height: 270, data: { label: 'Compute', width: 240, height: 270, color: COLORS.green }, zIndex: -1 },
  { id: 'g3', type: 'group', position: { x: 0, y: 0 }, width: 110, height: 150, data: { label: 'Action', width: 110, height: 150, color: COLORS.purple }, zIndex: -1 },

  // Nodes - Relative
  { id: '1', type: 'product', parentId: 'g1', position: { x: 23, y: 35 }, width: 64, height: 64, data: { label: 'User', sublabel: 'Query', icon: <MessageSquare />, color: COLORS.blue } },

  // Compute Group Grid (2x2)
  { id: '2a', type: 'product', parentId: 'g2', position: { x: 23, y: 35 }, width: 64, height: 64, data: { label: 'LLM', sublabel: 'GPT-4', icon: <Bot />, color: COLORS.green } },
  { id: '2b', type: 'product', parentId: 'g2', position: { x: 143, y: 35 }, width: 64, height: 64, data: { label: 'RAG', sublabel: 'Vector DB', icon: <Database />, color: COLORS.green } },
  { id: '2c', type: 'product', parentId: 'g2', position: { x: 23, y: 155 }, width: 64, height: 64, data: { label: 'Code', sublabel: 'Executor', icon: <Cpu />, color: COLORS.green } },
  { id: '2d', type: 'product', parentId: 'g2', position: { x: 143, y: 155 }, width: 64, height: 64, data: { label: 'Memory', sublabel: 'Context', icon: <HardDrive />, color: COLORS.green } },

  { id: '3', type: 'product', parentId: 'g3', position: { x: 23, y: 35 }, width: 64, height: 64, data: { label: 'Execute', sublabel: 'Actions', icon: <Sparkles />, color: COLORS.purple } },
];

const edgesAgents: Edge[] = [
  // Input (Group) -> Compute (Group)
  {
    id: 'e1-2a',
    source: 'g1',
    sourceHandle: 'group-source-right',
    target: 'g2',
    targetHandle: 'group-target-left',
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.blue, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.blue, width: 15, height: 15 }
  },
  // Compute (Group) -> Action (Group)
  {
    id: 'e2a-3',
    source: 'g2',
    sourceHandle: 'group-source-right',
    target: 'g3',
    targetHandle: 'group-target-left',
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.green, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.green, width: 15, height: 15 }
  },
];

// 3. Refactoring - Legacy to modern migration
// Wider spacing: 240px between columns
const nodesRefactoring: Node[] = [
  // Groups
  { id: 'g1', type: 'group', position: { x: 0, y: 0 }, width: 110, height: 270, data: { label: 'Legacy', width: 110, height: 270, color: COLORS.red }, zIndex: -1 },
  { id: 'g2', type: 'group', position: { x: 0, y: 0 }, width: 110, height: 150, data: { label: 'Transform', width: 110, height: 150, color: COLORS.orange }, zIndex: -1 },
  { id: 'g3', type: 'group', position: { x: 0, y: 0 }, width: 110, height: 270, data: { label: 'Modern', width: 110, height: 270, color: COLORS.green }, zIndex: -1 },

  // Nodes - Relative
  { id: '1', type: 'product', parentId: 'g1', position: { x: 23, y: 35 }, width: 64, height: 64, data: { label: 'Sheets', sublabel: 'Excel', icon: <FileSpreadsheet />, color: COLORS.red } },
  { id: '2', type: 'product', parentId: 'g1', position: { x: 23, y: 155 }, width: 64, height: 64, data: { label: 'Manual', sublabel: 'Entry', icon: <MessageSquare />, color: COLORS.red } },

  { id: 't1', type: 'product', parentId: 'g2', position: { x: 23, y: 35 }, width: 64, height: 64, data: { label: 'ETL', sublabel: 'Pipeline', icon: <ArrowRightLeft />, color: COLORS.orange } },

  { id: '3', type: 'product', parentId: 'g3', position: { x: 23, y: 35 }, width: 64, height: 64, data: { label: 'API', sublabel: 'REST', icon: <Box />, color: COLORS.green } },
  { id: '4', type: 'product', parentId: 'g3', position: { x: 23, y: 155 }, width: 64, height: 64, data: { label: 'DB', sublabel: 'Supabase', icon: <Server />, color: COLORS.green } },
];

const edgesRefactoring: Edge[] = [
  // Legacy (Group) -> Transform (Group)
  {
    id: 'e1-t1',
    source: 'g1',
    sourceHandle: 'group-source-right-top',
    target: 'g2',
    targetHandle: 'group-target-left',
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.red, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.red, width: 15, height: 15 }
  },
  {
    id: 'e2-t1',
    source: 'g1',
    sourceHandle: 'group-source-right-bottom',
    target: 'g2',
    targetHandle: 'group-target-left',
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.red, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.red, width: 15, height: 15 }
  },
  // Transform (Group) -> Modern (Group)
  {
    id: 'et1-3',
    source: 'g2',
    sourceHandle: 'group-source-right-top',
    target: 'g3',
    targetHandle: 'group-target-left-top',
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.orange, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.orange, width: 15, height: 15 }
  },
  {
    id: 'et1-4',
    source: 'g2',
    sourceHandle: 'group-source-right-bottom',
    target: 'g3',
    targetHandle: 'group-target-left-bottom',
    animated: true,
    type: 'smoothstep',
    style: { stroke: COLORS.orange, strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.orange, width: 15, height: 15 }
  },
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
  const [rfInstance, setRfInstance] = useState<any>(null);

  // Load nodes/edges for the tab and trigger centering
  useEffect(() => {
    const config = tabConfigs[activeTab] || tabConfigs['1'];

    // Calculate layout
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      config.nodes,
      config.edges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    // Trigger fitView after state update - use requestAnimationFrame for reliable timing
    if (rfInstance) {
      // Wait for React to flush state updates, then wait for browser paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          rfInstance.fitView({ padding: 0.25, maxZoom: 0.80, duration: 500 });
        });
      });
    }
  }, [activeTab, setNodes, setEdges, rfInstance]);

  // Handle window resize to keep centered
  useEffect(() => {
    const handleResize = () => {
      if (rfInstance) {
        rfInstance.fitView({ padding: 0.25, maxZoom: 0.80, duration: 400 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [rfInstance]);

  // Memoize node types to prevent re-renders
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <motion.div
      className="architecture-demo-container w-full h-full min-h-[500px] bg-white border border-ink-950/5 relative shadow-sm overflow-hidden rounded-lg"
      data-component="architecture-demo"
      data-tab={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Technical Corner Markers */}
      <div className="corner-marker-container corner-top-left absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-ink-950 z-20 rounded-tl-lg" data-corner="container-top-left" />
      <div className="corner-marker-container corner-top-right absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-ink-950 z-20 rounded-tr-lg" data-corner="container-top-right" />
      <div className="corner-marker-container corner-bottom-left absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-ink-950 z-20 rounded-bl-lg" data-corner="container-bottom-left" />
      <div className="corner-marker-container corner-bottom-right absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-ink-950 z-20 rounded-br-lg" data-corner="container-bottom-right" />

      {/* Header with live indicator */}
      <div className="architecture-demo-header absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none" data-header="demo-header">
        <div className="header-label text-[9px] font-mono text-ink-400 tracking-widest" data-label="system-view">
          /// SYSTEM_VIEW_V1
        </div>
        <motion.div
          className="header-status flex items-center gap-2 text-[9px] font-mono text-ink-400"
          data-status="live-indicator"
          animate={{ opacity: isLive ? 1 : 0.5 }}
        >
          <motion.div
            className="status-dot w-1.5 h-1.5 rounded-full bg-green-500"
            data-dot="live"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          LIVE
        </motion.div>
      </div>

      {/* React Flow Canvas */}
      <div
        className="react-flow-container absolute inset-0 z-0"
        data-container="react-flow-wrapper"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={memoizedNodeTypes}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView={true}
            fitViewOptions={{
              padding: 0.25,
              minZoom: 0.3,
              maxZoom: 0.80,
            }}
            attributionPosition="bottom-right"
            zoomOnScroll={false}
            panOnDrag={true}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
            minZoom={0.5}
            maxZoom={1.5}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={true}
            defaultViewport={undefined} // Let fitView handle it
            onInit={(instance) => {
              setRfInstance(instance);
              // Initial fit done in useEffect
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1.5}
              color="#e5e5e5"
              className="flow-background"
            />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="gradient-overlay absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-white/20 z-10" data-overlay="gradient" />
    </motion.div>
  );
};

export default ArchitectureDemo;





